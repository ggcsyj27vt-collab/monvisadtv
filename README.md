# MyVisaDTV

Site Astro pour l'agence MyVisaDTV (accompagnement de demandes de visa DTV Thaïlande).

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

## À faire avant mise en ligne

- Remplacer `action="https://formspree.io/f/VOTRE_ID_FORMSPREE"` dans
  `src/pages/fiche-renseignement.astro` par un vrai point de collecte (Formspree,
  fonction serverless, CRM...).
- Faire valider les pages `mentions-legales.astro` et `confidentialite.astro` par un
  professionnel du droit et compléter les champs entre crochets.
- Remplacer les témoignages/chiffres d'exemple par du contenu réel avant publication.
- Vérifier les informations réglementaires sur le DTV (montants, durées, catégories)
  auprès des sources officielles thaïlandaises avant publication, et mettre à jour la
  date dans les composants `<DerniereMiseAJour />`.

Voir `CLAUDE.md` pour le contexte complet du projet et `charte-graphique.md` pour
l'identité visuelle.
