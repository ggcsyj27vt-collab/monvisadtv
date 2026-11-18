-- =============================================================================
-- MyVisaDTV : comptes clients, automatisations et règles d'accès (RLS)
-- À exécuter UNE FOIS dans Supabase → SQL Editor → New query → Run.
-- Avant de lancer : remplacez VOTRE_EMAIL_ADMIN (ligne « Admin ») par l'e-mail
-- avec lequel vous vous connectez à /admin.
-- =============================================================================

-- 1. Nouvelles colonnes des dossiers ------------------------------------------
alter table public.cases add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.cases add column if not exists email text;
alter table public.cases add column if not exists lang text not null default 'fr';
alter table public.cases add column if not exists product text check (product in ('verification', 'complete'));
alter table public.cases add column if not exists stripe_session_id text unique;
alter table public.cases add column if not exists status_changed_at timestamptz not null default now();
alter table public.cases add column if not exists reminder_sent_at timestamptz;
alter table public.cases add column if not exists review_requested_at timestamptz;
alter table public.cases add column if not exists documents_purged_at timestamptz;
create index if not exists cases_user_id_idx on public.cases(user_id);

-- Date du dernier changement de statut (sert au rappel 48 h, aux avis et à la purge RGPD)
create or replace function public.touch_status_changed_at() returns trigger
language plpgsql as $$
begin
  if new.status is distinct from old.status then
    new.status_changed_at := now();
    new.reminder_sent_at := null;
  end if;
  return new;
end $$;
drop trigger if exists cases_status_changed on public.cases;
create trigger cases_status_changed before update on public.cases
  for each row execute function public.touch_status_changed_at();

-- 2. Administrateurs --------------------------------------------------------------
create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;

-- Admin : remplacez l'e-mail ci-dessous (sinon /admin n'affichera plus aucun dossier).
insert into public.admins (user_id)
select id from auth.users where email = 'VOTRE_EMAIL_ADMIN'
on conflict do nothing;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Le dossier appartient-il au client connecté ?
create or replace function public.owns_case(p_case_id uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.cases where id = p_case_id and user_id = auth.uid());
$$;

-- Lien à jeton (anciens dossiers créés à la main) encore valide ?
create or replace function public.token_is_valid(p_token text) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.cases where access_token::text = p_token);
$$;

-- 3. Règles d'accès des tables ----------------------------------------------------
-- On repart de zéro : toutes les anciennes règles de ces 3 tables sont supprimées.
-- (Une règle du type « tout utilisateur connecté voit tout » deviendrait dangereuse
-- dès que les clients ont un compte.)
do $$
declare p record;
begin
  for p in select policyname, tablename from pg_policies
           where schemaname = 'public' and tablename in ('cases', 'documents', 'messages')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

alter table public.cases enable row level security;
alter table public.documents enable row level security;
alter table public.messages enable row level security;

-- Admin : tout
create policy admin_all_cases on public.cases for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_all_documents on public.documents for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy admin_all_messages on public.messages for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Client connecté : uniquement ses dossiers, en lecture
create policy client_read_cases on public.cases for select to authenticated using (user_id = auth.uid());
create policy client_read_documents on public.documents for select to authenticated using (public.owns_case(case_id));
create policy client_add_documents on public.documents for insert to authenticated with check (public.owns_case(case_id));
create policy client_read_messages on public.messages for select to authenticated using (public.owns_case(case_id));
create policy client_add_messages on public.messages for insert to authenticated
  with check (public.owns_case(case_id) and author = 'client');

-- Les visiteurs anonymes (anciens liens à jeton) passent uniquement par les fonctions
-- get_case_by_token, get_documents_by_token, get_messages_by_token, add_document_record
-- et add_client_message, déjà en place : aucune règle de table pour eux.

-- 4. Règles d'accès des fichiers (bucket « documents ») -------------------------------
update storage.buckets set public = false where id = 'documents';

do $$
declare p record;
begin
  for p in select policyname from pg_policies
           where schemaname = 'storage' and tablename = 'objects'
             and (coalesce(qual, '') || coalesce(with_check, '')) like '%documents%'
  loop
    execute format('drop policy %I on storage.objects', p.policyname);
  end loop;
end $$;

-- Admin : lire, déposer, supprimer
create policy docs_admin_all on storage.objects for all to authenticated
  using (bucket_id = 'documents' and public.is_admin())
  with check (bucket_id = 'documents' and public.is_admin());

-- Client connecté : déposer dans le dossier <id du dossier>/ qui lui appartient
create policy docs_client_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'documents' and public.owns_case(((storage.foldername(name))[1])::uuid));

-- Ancien lien à jeton : déposer seulement dans <jeton valide>/ (jamais lister ni lire)
create policy docs_token_upload on storage.objects for insert to anon
  with check (bucket_id = 'documents' and public.token_is_valid((storage.foldername(name))[1]));
