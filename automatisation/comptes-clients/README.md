# Comptes clients et suivi automatique des dossiers (Stripe + Supabase + n8n)

Ce dossier automatise tout ce qui se passe **après le paiement** :

| Fichier | Ce qu'il fait |
|---|---|
| `1-paiement-stripe.json` | Paiement Stripe validé → **compte client créé** (identifiant = e-mail du paiement), **dossier créé** dans Supabase, **e-mail de bienvenue** (FR/EN/DE) avec l'identifiant et un bouton pour choisir son mot de passe, alerte Telegram, fiche Notion passée en « Payé » (ce qui arrête aussi les relances du tunnel 99 €). Un paiement reçu deux fois par Stripe ne crée pas de doublon. |
| `2-notifications-espace-client.json` | Le client dépose un document ou vous écrit → alerte Telegram. Vous lui répondez dans `/admin` ou changez le statut → il reçoit un e-mail. |
| `3-rappels-avis-purge.json` | Toutes les heures : rappel Telegram si un dossier est en « Vérification » depuis plus de 36 h (délai de 48 h affiché sur le site). Chaque jour à 9 h : demande d'avis aux clients dont le visa est accordé, et suppression des pièces 6 mois après la décision (promis dans la politique de confidentialité). |
| `4-alerte-erreurs.json` | Message Telegram dès qu'un workflow plante. |

Pourquoi un lien plutôt qu'un mot de passe dans l'e-mail : un mot de passe envoyé en clair reste lisible dans la boîte mail du client pour toujours, alors que son espace contient passeport, relevés bancaires et casier judiciaire. Le client reçoit donc son **identifiant** et choisit lui-même son **mot de passe** en un clic.

Comptez environ 45 minutes, dans cet ordre.

## 1. Supabase

1. **Sauvegarde des règles actuelles (30 secondes).** Dans **SQL Editor → New query**, lancez la requête ci-dessous, puis cliquez sur **Export → CSV** et gardez le fichier. Il permet de remettre les anciennes règles si besoin.
   ```sql
   select schemaname, tablename, policyname, cmd, roles, qual, with_check
   from pg_policies
   where (schemaname = 'public' and tablename in ('cases', 'documents', 'messages'))
      or (schemaname = 'storage' and tablename = 'objects');
   ```
2. **Migration.** Nouvelle requête : collez `supabase/migrations/20261118_comptes_clients.sql`, remplacez `VOTRE_EMAIL_ADMIN` par l'e-mail exact de votre compte `/admin` (visible dans **Authentication → Users**), puis **Run**.
   - La migration remplace toutes les règles d'accès des tables `cases`, `documents`, `messages` et du stockage `documents` : seul l'admin voit tout, chaque client ne voit que son dossier, les anciens liens `?token=` continuent de fonctionner.
   - Elle est en **tout ou rien** : si l'e-mail admin n'est pas reconnu, elle s'arrête avec le message « Aucun admin trouvé » et **rien n'est modifié**. Corrigez l'e-mail et relancez.
3. **Contrôle juste après** (nouvelle requête). Les trois lignes doivent afficher `ok` :
   ```sql
   select 'admin enregistré' as test, case when count(*) > 0 then 'ok' else 'PROBLÈME' end as resultat from public.admins
   union all
   select 'RLS activée sur les 3 tables', case when bool_and(relrowsecurity) then 'ok' else 'PROBLÈME' end
     from pg_class where oid in ('public.cases'::regclass, 'public.documents'::regclass, 'public.messages'::regclass)
   union all
   select 'bucket documents privé', case when not public then 'ok' else 'PROBLÈME' end from storage.buckets where id = 'documents';
   ```
4. **Contrôle dans le site** :
   - Connectez-vous à `https://myvisadtv.com/admin/` : vos dossiers doivent s'afficher, et un document doit s'ouvrir quand vous cliquez dessus.
   - Ouvrez un ancien lien client `…/dossier/?token=…` dans une fenêtre de navigation privée : le dossier doit s'afficher et le dépôt d'un fichier doit fonctionner.
   - Si `/admin` est vide : relancez la requête du point 3. « admin enregistré : PROBLÈME » signifie que l'e-mail ne correspondait pas. Ajoutez-le avec `insert into public.admins select id from auth.users where email = 'votre@email';`
5. **Authentication → Sign In / Providers** : désactivez **Allow new users to sign up** (seuls les clients qui ont payé reçoivent un compte).
6. **Authentication → URL Configuration** : Site URL `https://myvisadtv.com`, et ajoutez dans **Redirect URLs** les trois espaces client : `https://myvisadtv.com/dossier/`, `https://myvisadtv.com/en/dossier/` et `https://myvisadtv.com/de/dossier/`.
7. **Authentication → Providers → Email** : **Email OTP Expiration** = `86400` (lien valable 24 h, comme annoncé dans l'e-mail) et **Minimum password length** = `10`.
8. **Authentication → Emails → SMTP Settings** : activez le SMTP personnalisé avec la boîte `contact@myvisadtv.com` (sinon Supabase n'envoie presque aucun e-mail). Dans **Templates → Reset password**, remplacez le message par un texte court en français puis en anglais (c'est l'e-mail du bouton « Recevoir un lien » / « Get a link » / « Link erhalten », et Supabase n'a qu'un modèle pour toutes les langues). Gardez le lien `{{ .ConfirmationURL }}` : il renvoie le client vers l'espace dans sa langue.
9. **Project Settings → API Keys** : copiez la clé **secret / service_role** (pour n8n uniquement, jamais dans le site).

## 2. n8n : identifiants

Dans **Credentials → New** :
- **Supabase API** : Host `https://ujrtyrnnhwsfqnftoawt.supabase.co`, Service Role Secret = la clé copiée ci-dessus. Nommez-le « Supabase MyVisaDTV (service_role) ».
- **Stripe API** : votre clé secrète Stripe (commencez par la clé de **test** `sk_test_…`).
- **Header Auth** : Name `x-webhook-secret`, Value = une longue phrase aléatoire. Nommez-le « Secret webhook Supabase ».

## 3. n8n : importer les workflows

Pour chacun des 4 fichiers : **Workflows → Import from File**, puis ouvrez chaque nœud marqué d'un triangle rouge et sélectionnez l'identifiant (Supabase, Stripe, Header Auth ; SMTP, Telegram et Notion sont déjà les vôtres).

- Dans `3-rappels-avis-purge`, nœud **« Préparer la demande d'avis »** : remplacez `COLLER_LE_LIEN_AVIS_ICI` par votre lien Google ou Trustpilot « Laisser un avis ». Tant que ce n'est pas fait, aucune demande d'avis ne part.
- Activez les 4 workflows.
- Dans **chaque** workflow (y compris les anciens : tunnel, prospection, assistant), **Settings → Error workflow** = « Alerte : workflow en erreur ».

## 4. Supabase : webhooks vers n8n

Ouvrez le workflow `2-notifications-espace-client`, nœud **Événement Supabase**, et copiez la **Production URL**. Puis dans Supabase **Database → Webhooks → Create a new hook**, trois fois :

| Nom | Table | Événement |
|---|---|---|
| `n8n-documents` | `documents` | Insert |
| `n8n-messages` | `messages` | Insert |
| `n8n-statut` | `cases` | Update |

Pour chacun : type **HTTP Request**, méthode **POST**, URL = la Production URL, et un **HTTP Header** `x-webhook-secret` avec la même valeur que dans n8n.

## 5. Stripe (dans le tableau de bord, sans code)

- **Paramètres → Reçus clients** : activez l'envoi automatique des reçus.
- **Paramètres → Factures** : dans le pied de page, ajoutez « TVA non applicable, art. 293 B du CGI » et votre SIRET.
- **Paramètres → Informations publiques** : URL des conditions d'utilisation = `https://myvisadtv.com/cgv/`.
- Sur **chaque Payment Link** (99 € et 699 €) :
  - activez **Exiger l'acceptation des conditions d'utilisation**, avec ce texte personnalisé : « J'accepte les CGV et je demande que la prestation commence avant la fin du délai de rétractation de 14 jours. »
  - **Après le paiement → Afficher une page de confirmation** : « Merci ! Vérifiez votre boîte mail : votre accès à l'espace client arrive dans quelques minutes. »

## 6. Tester avant d'ouvrir

1. Stripe en **mode test**, Payment Link de test, carte `4242 4242 4242 4242`, avec **votre** adresse e-mail.
2. Vous devez recevoir : l'e-mail de bienvenue, l'alerte Telegram, et voir le dossier dans `/admin`.
3. Cliquez sur le bouton de l'e-mail, choisissez un mot de passe, déposez un fichier → alerte Telegram.
4. Dans `/admin`, répondez et passez le statut en « Vérification » → vous recevez les e-mails client.
5. Repassez sur la clé Stripe **live** dans le credential Stripe.

## Utilisation au quotidien (`/admin`)

| Statut | Quand le choisir | Ce qui part automatiquement |
|---|---|---|
| Réunion des documents | Posé tout seul au paiement | — |
| Vérification du dossier | Toutes les pièces sont là | E-mail au client ; rappel Telegram au bout de 36 h |
| Rapport de vérification envoyé | Rapport déposé dans les messages | E-mail au client |
| Dossier déposé / En attente de décision | Formule complète | E-mail au client |
| Visa obtenu | Décision positive | E-mail au client, puis demande d'avis le lendemain matin ; pièces supprimées 6 mois plus tard |
| Dossier refusé / Dossier clos | — | E-mail (refus) ; pièces supprimées 6 mois plus tard |

Non automatisé ici : les workflows « test d'éligibilité » et « agent IA de la fiche » tournent sur n8n mais ne sont pas sauvegardés dans ce dépôt. Exportez-les (**⋯ → Download**) dans `automatisation/` pour les garder.
