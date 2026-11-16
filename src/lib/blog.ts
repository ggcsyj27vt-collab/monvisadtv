import type { CollectionEntry } from 'astro:content';

export type BlogLang = 'fr' | 'en' | 'de';

/** Langue d'un article, déduite de son dossier (en/, de/) ou du champ lang. */
export function postLang(post: CollectionEntry<'blog'>): BlogLang {
  if (post.slug.startsWith('en/')) return 'en';
  if (post.slug.startsWith('de/')) return 'de';
  return post.data.lang ?? 'fr';
}

/** Slug sans le préfixe de langue. */
export function postSlug(post: CollectionEntry<'blog'>): string {
  return post.slug.replace(/^(en|de)\//, '');
}

/** URL publique d'un article. */
export function postUrl(post: CollectionEntry<'blog'>): string {
  const l = postLang(post);
  return `${l === 'fr' ? '' : '/' + l}/blog/${postSlug(post)}/`;
}

export const BLOG_TXT = {
  fr: {
    locale: 'fr-FR',
    indexTitle: 'Blog',
    indexDesc: "Conseils, comparatifs et points de repère pour préparer votre installation en Thaïlande et votre demande de visa DTV.",
    eyebrow: 'Le blog',
    h1: 'Conseils et repères pour votre installation en Thaïlande',
    intro: "Des articles pour comprendre le DTV, comparer vos options et préparer votre projet d'installation — au-delà du seul dossier de visa.",
    read: "Lire l'article →",
    empty: 'Les premiers articles arrivent bientôt.',
    verifEyebrow: 'Vous préparez votre dossier vous-même ?',
    verifTitle: 'Faites-le vérifier avant de le déposer, pour 99 €',
    verifText: "Nous contrôlons toutes vos pièces : documents manquants, conformité aux exigences officielles et cohérence entre vos documents. Rapport écrit sous 48 h ouvrées, et les 99 € sont déduits si vous nous confiez ensuite la demande complète.",
    verifCta: 'Découvrir la vérification à 99 €',
    qTitle: 'Une question sur votre situation ?',
    qText: 'Commencez par une fiche de renseignement de cinq minutes. Nous revenons vers vous avec un premier avis sur votre éligibilité, sans engagement.',
    qCta: 'Remplir la fiche de renseignement',
    author: 'Par Alexandre, fondateur de MyVisaDTV, titulaire du DTV et installé à Koh Samui',
  },
  en: {
    locale: 'en-GB',
    indexTitle: 'Blog',
    indexDesc: 'Advice, comparisons and practical guidance to prepare your move to Thailand and your DTV visa application.',
    eyebrow: 'The blog',
    h1: 'Guidance for your move to Thailand',
    intro: 'Articles to understand the DTV, compare your options and prepare your move — beyond the visa file itself.',
    read: 'Read the article →',
    empty: 'The first articles are coming soon.',
    verifEyebrow: 'Preparing your file yourself?',
    verifTitle: 'Have it checked before you submit it, for €99',
    verifText: 'We review all your documents: missing items, compliance with official requirements and consistency between documents. Written report within 48 business hours, and the €99 is deducted if you then entrust us with the full application.',
    verifCta: 'Discover the €99 document check',
    qTitle: 'A question about your situation?',
    qText: 'Start with a five-minute information form. We get back to you with a first opinion on your eligibility, with no commitment.',
    qCta: 'Fill in the information form',
    author: 'By Alexandre, founder of MyVisaDTV, DTV holder living in Koh Samui',
  },
  de: {
    locale: 'de-DE',
    indexTitle: 'Blog',
    indexDesc: 'Tipps, Vergleiche und Orientierung für Ihren Umzug nach Thailand und Ihren DTV-Visumantrag.',
    eyebrow: 'Der Blog',
    h1: 'Orientierung für Ihren Umzug nach Thailand',
    intro: 'Artikel, um das DTV zu verstehen, Ihre Optionen zu vergleichen und Ihren Umzug vorzubereiten — über den Visumantrag hinaus.',
    read: 'Artikel lesen →',
    empty: 'Die ersten Artikel erscheinen in Kürze.',
    verifEyebrow: 'Sie stellen Ihre Unterlagen selbst zusammen?',
    verifTitle: 'Lassen Sie sie vor dem Einreichen prüfen, für 99 €',
    verifText: 'Wir prüfen alle Unterlagen: fehlende Dokumente, Übereinstimmung mit den offiziellen Anforderungen und Stimmigkeit der Dokumente. Schriftlicher Bericht innerhalb von 48 Arbeitsstunden; die 99 € werden angerechnet, wenn Sie uns danach den gesamten Antrag anvertrauen.',
    verifCta: 'Zur Unterlagenprüfung für 99 €',
    qTitle: 'Eine Frage zu Ihrer Situation?',
    qText: 'Beginnen Sie mit einem fünfminütigen Fragebogen. Wir melden uns mit einer ersten Einschätzung Ihrer Eignung, unverbindlich.',
    qCta: 'Fragebogen ausfüllen',
    author: 'Von Alexandre, Gründer von MyVisaDTV, DTV-Inhaber mit Wohnsitz auf Koh Samui',
  },
} as const;

// Articles plutôt « culture générale » sur lesquels on n'affiche pas l'encadré 99 €.
export const NO_VERIF = ['cout-installation-thailande', 'visa-dtv-vs-visa-retraite-thailande', 'visa-dtv-conjoint-ressortissant-thailandais'];
