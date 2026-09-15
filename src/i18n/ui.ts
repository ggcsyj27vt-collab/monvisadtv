export const locales = ['fr', 'en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

// Préfixe d'URL pour chaque langue (le français reste à la racine, sans préfixe).
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) return clean;
  return `/${locale}${clean}`;
}

interface UiStrings {
  nav: {
    home: string;
    offer: string;
    understand: string;
    blog: string;
    about: string;
    startCta: string;
    startCtaShort: string;
  };
  footer: {
    tagline: string;
    serviceHeading: string;
    infoHeading: string;
    legal: string;
    privacy: string;
    disclaimer: string;
    rights: string;
  };
  langSwitcher: {
    label: string;
  };
}

export const ui: Record<Locale, UiStrings> = {
  fr: {
    nav: {
      home: 'Accueil',
      offer: 'La formule à 700 €',
      understand: 'Comprendre le DTV',
      blog: 'Blog',
      about: 'À propos',
      startCta: 'Démarrer ma demande',
      startCtaShort: 'Démarrer',
    },
    footer: {
      tagline:
        "MyVisaDTV accompagne les francophones dans la préparation de leur dossier de Destination Thailand Visa (DTV). Cabinet de conseil privé, indépendant de l'administration thaïlandaise.",
      serviceHeading: 'Le service',
      infoHeading: 'Informations',
      legal: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      disclaimer:
        "MyVisaDTV est un cabinet de conseil privé. Nous ne sommes ni une administration thaïlandaise, ni un consulat, et ne garantissons pas l'obtention du visa : la décision finale appartient exclusivement aux autorités thaïlandaises compétentes.",
      rights: 'Tous droits réservés.',
    },
    langSwitcher: { label: 'Langue' },
  },
  en: {
    nav: {
      home: 'Home',
      offer: 'The €700 package',
      understand: 'Understanding the DTV',
      blog: 'Blog',
      about: 'About',
      startCta: 'Start my application',
      startCtaShort: 'Start',
    },
    footer: {
      tagline:
        'MyVisaDTV helps applicants prepare their Destination Thailand Visa (DTV) file. A private, independent consulting practice, not affiliated with the Thai administration.',
      serviceHeading: 'The service',
      infoHeading: 'Information',
      legal: 'Legal notice',
      privacy: 'Privacy policy',
      disclaimer:
        'MyVisaDTV is a private consulting practice. We are neither a Thai administration nor a consulate, and we do not guarantee visa approval: the final decision rests exclusively with the competent Thai authorities.',
      rights: 'All rights reserved.',
    },
    langSwitcher: { label: 'Language' },
  },
  de: {
    nav: {
      home: 'Startseite',
      offer: 'Das 700-€-Paket',
      understand: 'Das DTV verstehen',
      blog: 'Blog',
      about: 'Über uns',
      startCta: 'Antrag jetzt starten',
      startCtaShort: 'Starten',
    },
    footer: {
      tagline:
        'MyVisaDTV unterstützt Antragsteller bei der Vorbereitung ihres Destination Thailand Visa (DTV). Eine private, unabhängige Beratungsstelle, nicht Teil der thailändischen Verwaltung.',
      serviceHeading: 'Der Service',
      infoHeading: 'Informationen',
      legal: 'Impressum',
      privacy: 'Datenschutzerklärung',
      disclaimer:
        'MyVisaDTV ist eine private Beratungsstelle. Wir sind weder eine thailändische Behörde noch ein Konsulat und garantieren die Visumerteilung nicht: Die endgültige Entscheidung liegt ausschließlich bei den zuständigen thailändischen Behörden.',
      rights: 'Alle Rechte vorbehalten.',
    },
    langSwitcher: { label: 'Sprache' },
  },
};
