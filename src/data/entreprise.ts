// Informations légales de l'entreprise, utilisées par les mentions légales,
// la politique de confidentialité et les CGV (FR/EN/DE).
// Remplacer chaque `null` par la vraie valeur : l'encadré « à compléter » disparaît
// automatiquement des pages quand plus rien ne manque.

export const entreprise = {
  nom: 'Alexandre Delesalle',
  nomCommercial: 'MyVisaDTV',
  statut: { fr: 'Entrepreneur individuel (micro-entreprise)', en: 'Sole trader (French micro-entreprise)', de: 'Einzelunternehmer (französische Micro-Entreprise)' },
  // 14 chiffres. Le numéro fourni le 18/11/2026 (123 364 293 00012) ne passe pas la clé de contrôle : à vérifier.
  siret: null as string | null,
  adresse: null as string | null,
  email: 'contact@myvisadtv.com',
  site: 'https://myvisadtv.com',
  // Médiateur de la consommation (obligatoire en B2C) : nom + site web.
  mediateur: null as { nom: string; site: string } | null,
  // Date de dernière mise à jour des textes légaux.
  majLegales: '2026-11-18',
};

export const manquant = { fr: '[à compléter]', en: '[to be added]', de: '[folgt]' } as const;

export const champsManquants = (): string[] =>
  [!entreprise.siret && 'SIRET', !entreprise.adresse && 'adresse', !entreprise.mediateur && 'médiateur'].filter(Boolean) as string[];
