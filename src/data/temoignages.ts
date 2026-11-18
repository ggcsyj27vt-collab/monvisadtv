// Témoignages affichés sur l'accueil (section « Confiance »).
// UNIQUEMENT de vrais clients, avec leur accord écrit. Jamais d'avis inventé
// (pratique commerciale trompeuse, art. L121-4 du Code de la consommation).
// Tant que la liste est vide, le bloc ne s'affiche pas.
//
// Exemple de format :
// {
//   prenom: 'Julie',
//   categorie: { fr: 'Workcation (freelance)', en: 'Workcation (freelance)', de: 'Workcation (Freelance)' },
//   texte: { fr: '…', en: '…', de: '…' }, // texte original + traductions (signaler si traduit)
//   date: '2026-10', // mois d'obtention du visa
// },

import type { Locale } from '../i18n/ui';

export interface Temoignage {
  prenom: string;
  categorie: Record<Locale, string>;
  texte: Record<Locale, string>;
  date: string;
}

export const temoignages: Temoignage[] = [];
