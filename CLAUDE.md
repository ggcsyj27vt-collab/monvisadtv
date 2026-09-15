# CLAUDE.md

Ce fichier fournit à Claude Code (claude.ai/code) le contexte nécessaire pour travailler sur ce dépôt.

## Vue d'ensemble du projet

**MyVisaDTV** est le site web d'une agence spécialisée dans l'accompagnement des demandes de **visa DTV (Destination Thailand Visa)** pour la Thaïlande.

Objectifs principaux du site :
- Présenter les services de l'agence (accompagnement, dossier, conseils) pour l'obtention du visa DTV
- Expliquer les conditions d'éligibilité et le processus de demande du visa DTV
- Générer des prospects (formulaire de contact / prise de rendez-vous / devis)
- Rassurer et convertir (témoignages, FAQ, garanties, tarifs)
- Être bien référencé sur des requêtes comme « visa DTV Thaïlande », « visa digital nomad Thaïlande », etc.

Public cible : francophones souhaitant s'installer temporairement en Thaïlande (télétravailleurs, digital nomads, retraités, conjoints de Thaïlandais, etc.) via le visa DTV.

## Stack technique

- **Framework** : [Astro](https://docs.astro.build/) (site principalement statique / SSG)
- **Styling** : à préciser (ex. Tailwind CSS recommandé pour la rapidité de mise en page)
- **Déploiement** : à préciser (ex. Vercel, Netlify, Cloudflare Pages)
- **Contenu** : à préciser (Markdown/MDX local via Content Collections, ou CMS headless)
- **Formulaires** : à préciser (ex. service tiers type Formspree, ou fonction serverless)

> Cette section doit être tenue à jour au fur et à mesure des choix techniques réels du projet.

## Commandes courantes

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement (http://localhost:4321)
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview

# Vérification des types / diagnostics Astro
npm run astro check
```

## Structure du projet (Astro)

```
/
├── public/                 # Assets statiques (favicon, images non transformées, robots.txt, sitemap...)
├── src/
│   ├── assets/             # Images/SVG optimisés via l'import Astro
│   ├── components/         # Composants réutilisables (.astro, éventuellement .tsx/.jsx)
│   ├── content/             # Content Collections (ex. articles de blog, FAQ, témoignages)
│   ├── layouts/            # Layouts partagés (BaseLayout, PageLayout...)
│   ├── pages/               # Routes du site (chaque fichier = une page)
│   │   ├── index.astro
│   │   ├── visa-dtv/        # Pages dédiées au visa DTV (éligibilité, procédure, tarifs...)
│   │   ├── blog/
│   │   └── contact.astro
│   └── styles/              # CSS global / variables
├── astro.config.mjs
└── package.json
```

## Conventions de code

- Utiliser des composants `.astro` pour tout ce qui est statique ; réserver React/Vue/Svelte (si utilisé) aux éléments réellement interactifs (ex. formulaire multi-étapes, simulateur d'éligibilité)
- Nommer les fichiers de composants en PascalCase (`Header.astro`, `PricingCard.astro`)
- Nommer les routes/pages en kebab-case, en français, aligné sur les mots-clés SEO ciblés (ex. `/visa-dtv/conditions-eligibilite/`)
- Centraliser les textes juridiques/procéduraux sensibles (conditions du visa) dans le content collections plutôt qu'en dur dans les composants, pour faciliter les mises à jour
- Toujours renseigner les balises `<title>`, `meta description`, Open Graph et données structurées (schema.org `Service` / `FAQPage`) pour chaque page importante
- Optimiser les images via `astro:assets` (format WebP/AVIF, dimensions explicites)
- Garder l'accessibilité en tête (contrastes, alt text, formulaires labellisés) — public parfois non technophile

## Points d'attention spécifiques au métier

- Le visa DTV étant un dispositif administratif évolutif, **ne jamais coder en dur des données réglementaires précises sans les dater** (montants, durées, pièces justificatives) ; prévoir un composant type `<DerniereMiseAJour date="..." />` sur les pages informatives
- Prévoir une page/FAQ claire sur ce que l'agence fait vs. ne fait pas (l'agence n'est pas l'administration thaïlandaise, ne garantit pas l'obtention du visa)
- Le formulaire de contact/devis est un point de conversion critique : le garder simple, avec validation claire, et si possible confirmation par email
- Prévoir une politique de confidentialité (RGPD, données d'identité potentiellement sensibles transmises par les prospects)

## Notes pour Claude Code

- Avant de créer une nouvelle page, vérifier si une Content Collection existe déjà pour ce type de contenu (FAQ, articles, témoignages)
- Avant d'ajouter une dépendance, vérifier qu'elle est compatible avec le rendu statique/SSG d'Astro
- Préférer des solutions simples et légères : ce site n'a pas besoin d'un framework front lourd pour l'essentiel de ses pages
