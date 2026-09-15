# Charte graphique — MyVisaDTV

## 1. Positionnement de marque

**MyVisaDTV** accompagne des francophones dans une démarche à la fois administrative et personnelle : obtenir le Destination Thailand Visa. La marque doit inspirer trois choses à la fois :

- **Confiance** — un dossier administratif sérieux, suivi par un expert
- **Clarté** — une procédure complexe rendue simple et lisible
- **Désir** — le projet de vie en Thaïlande qui se profile derrière la paperasse

Trois adjectifs de marque : **rassurante, précise, chaleureuse.**

## 2. Le signe de marque

Le symbole représente un **portail associé à une validation** : une arche (le passage, la destination) traversée par une coche (l'approbation du dossier). La pointe supérieure de la coche dépasse légèrement l'arche, en écho discret aux toits pointus des temples thaïlandais (chofa), sans tomber dans l'imagerie touristique.

Ce signe doit rester lisible en petit format (favicon 32px) : ne jamais l'associer à des détails supplémentaires.

Fichiers fournis :
- `logo-icone.svg` — icône seule, couleur (favicon, réseaux sociaux, avatar)
- `logo-horizontal.svg` — lockup complet icône + nom pour l'en-tête du site, documents, signature email
- `logo-monochrome.svg` — version une couleur (`currentColor`) pour fonds sombres, tampon, impression noir & blanc, filigrane PDF

### Zone de protection et tailles
- Laisser autour du logo un espace vide au moins égal à la hauteur du "D" de "DTV"
- Taille minimale d'utilisation du lockup horizontal : 120px de large
- Taille minimale de l'icône seule : 24px (au-delà, la coche devient illisible — utiliser un pictogramme simplifié si besoin de descendre plus bas)

### À ne pas faire
- Ne pas recolorer l'arche et la coche dans la même couleur dans la version couleur (perte du contraste conceptuel « structure / validation »)
- Ne pas appliquer d'ombre portée, de dégradé ou de contour supplémentaire
- Ne pas incliner ni déformer le symbole
- Ne pas placer le logo couleur sur un fond qui casse le contraste (fonds dorés, fonds bleu foncé proches de l'indigo)

## 3. Palette de couleurs

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Primaire | Indigo Nuit | `#16233F` | Textes, header, footer, fonds sombres, structure |
| Signature | Or Wat | `#C9A24C` | Accent unique : CTA principal, prix, coche du logo, éléments à mettre en avant |
| Secondaire | Jade Chao Phraya | `#2F6F62` | Badges de statut, succès, éléments pédagogiques, liens secondaires |
| Fond clair | Papier | `#F7F3EA` | Fond de page principal (remplace le blanc pur) |
| Texte | Encre | `#1F2430` | Corps de texte sur fond clair |
| Neutre | Sable | `#9C9284` | Texte secondaire, légendes, séparateurs |
| Bordure | Sable clair | `#DCD5C4` | Bordures, lignes de séparation discrètes |

**Règle d'usage** : l'or (`#C9A24C`) est la couleur signature — elle doit rester rare pour garder sa force (bouton principal, prix, coche). Le jade est la couleur de réassurance/pédagogie (encadrés "à savoir", FAQ, étapes validées). Ne jamais utiliser plus de 3 couleurs fortes sur un même écran.

Contraste : le texte encre (`#1F2430`) sur papier (`#F7F3EA`) et le texte papier sur indigo (`#16233F`) sont conformes AA. Éviter le texte or sur papier clair (contraste insuffisant) — réserver l'or au texte sur fond indigo, ou aux éléments graphiques non textuels.

## 4. Typographie

| Rôle | Police | Usage |
|---|---|---|
| Titres / display | **Fraunces** (Google Fonts) | H1, H2, accroches, citations de témoignages |
| Corps de texte | **Inter** (Google Fonts) | Paragraphes, formulaires, navigation, boutons |
| Utilitaire / données | **IBM Plex Mono** (Google Fonts) | Numéros de dossier, dates, montants, tableaux de pièces justificatives — renforce le sérieux "administratif" |

- Titres en casse normale (jamais tout en majuscules, sauf micro-labels courts comme des badges)
- Line-height généreux sur le corps de texte (1.6–1.7) : public parfois non technophile, priorité à la lisibilité
- Un seul poids gras par niveau hiérarchique ; éviter d'empiler gras + majuscules + couleur sur un même élément

## 5. Ton éditorial

- Vouvoiement, ton d'expert accessible — jamais infantilisant
- Phrases actives et concrètes : « Nous préparons votre dossier », pas « Votre dossier sera préparé »
- Toujours dater les informations réglementaires précises (montants, durées, pièces) via un composant type `<DerniereMiseAJour />`
- Rassurer sans promettre : ne jamais garantir l'obtention du visa (décision qui appartient à l'administration thaïlandaise)

## 6. Application rapide (design tokens CSS)

```css
:root {
  --color-primary: #16233F;   /* Indigo Nuit */
  --color-accent: #C9A24C;    /* Or Wat — signature, à utiliser avec parcimonie */
  --color-secondary: #2F6F62; /* Jade Chao Phraya */
  --color-bg: #F7F3EA;        /* Papier */
  --color-text: #1F2430;      /* Encre */
  --color-muted: #9C9284;     /* Sable */
  --color-border: #DCD5C4;    /* Sable clair */

  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```
