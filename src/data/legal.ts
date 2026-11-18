// Textes légaux (mentions légales, confidentialité, CGV) en FR/EN/DE.
// La version française fait foi. Les informations d'entreprise viennent de ./entreprise.ts.
// À faire relire par un professionnel du droit avant toute vente facturée.

import { entreprise as e, manquant } from './entreprise';
import { localePath, type Locale } from '../i18n/ui';

type Sections = [string, string[]][];

const mail = `<a href="mailto:${e.email}" class="underline hover:text-indigo">${e.email}</a>`;
const a = (href: string, label: string) => `<a href="${href}" class="underline hover:text-indigo" rel="noopener">${label}</a>`;
const siret = (l: Locale) => e.siret ?? manquant[l];
const adresse = (l: Locale) => e.adresse ?? manquant[l];
const mediateur = (l: Locale) => (e.mediateur ? a(e.mediateur.site, e.mediateur.nom) : manquant[l]);
const cnil = a('https://www.cnil.fr/fr/plaintes', 'CNIL');

// ---------------------------------------------------------------------------
// Mentions légales
// ---------------------------------------------------------------------------
export function mentions(l: Locale): Sections {
  const priv = localePath(l, '/confidentialite/');
  const cgv = localePath(l, '/cgv/');
  if (l === 'en')
    return [
      ['Site publisher', [`${e.nom}, ${e.statut.en}, trading as ${e.nomCommercial}.`, `SIRET: ${siret(l)} — Address: ${adresse(l)} — Email: ${mail}`, 'VAT not applicable, article 293 B of the French General Tax Code (CGI).']],
      ['Publication director', [e.nom]],
      ['Hosting', ['Netlify, Inc. — 101 2nd Street, San Francisco, CA 94105, United States — www.netlify.com']],
      ['Nature of the service', [`${e.nomCommercial} is an independent consultancy that helps people prepare Destination Thailand Visa (DTV) applications. ${e.nomCommercial} is not a Thai government body, embassy or consulate and does not guarantee that a visa will be granted. The decision rests solely with the Thai authorities.`]],
      ['Intellectual property', [`All content on this site (text, visuals, logo, structure) belongs to ${e.nom} unless stated otherwise. Any reproduction without prior written permission is prohibited.`]],
      ['Terms of sale and mediation', [`Our services are governed by our ${a(cgv, 'terms and conditions of sale')}. In the event of a dispute, consumers may refer the matter free of charge to the consumer mediator: ${mediateur(l)}.`]],
      ['Personal data', [`See our ${a(priv, 'privacy policy')}. Questions: ${mail}.`]],
    ];
  if (l === 'de')
    return [
      ['Anbieter', [`${e.nom}, ${e.statut.de}, Handelsname ${e.nomCommercial}.`, `SIRET: ${siret(l)} — Anschrift: ${adresse(l)} — E-Mail: ${mail}`, 'Keine Umsatzsteuer gemäß Art. 293 B des französischen Steuergesetzbuchs (CGI).']],
      ['Verantwortlich für den Inhalt', [e.nom]],
      ['Hosting', ['Netlify, Inc. — 101 2nd Street, San Francisco, CA 94105, USA — www.netlify.com']],
      ['Art der Dienstleistung', [`${e.nomCommercial} ist eine unabhängige Beratung zur Vorbereitung von Anträgen auf das Destination Thailand Visa (DTV). ${e.nomCommercial} ist weder eine thailändische Behörde noch eine Botschaft oder ein Konsulat und garantiert keine Visumerteilung. Die Entscheidung liegt allein bei den thailändischen Behörden.`]],
      ['Urheberrecht', [`Alle Inhalte dieser Website (Texte, Grafiken, Logo, Aufbau) gehören ${e.nom}, sofern nicht anders angegeben. Jede Vervielfältigung ohne vorherige schriftliche Zustimmung ist untersagt.`]],
      ['AGB und Schlichtung', [`Für unsere Leistungen gelten unsere ${a(cgv, 'Allgemeinen Geschäftsbedingungen')}. Bei Streitigkeiten können Verbraucher kostenlos die Verbraucherschlichtungsstelle anrufen: ${mediateur(l)}.`]],
      ['Personenbezogene Daten', [`Siehe unsere ${a(priv, 'Datenschutzerklärung')}. Fragen: ${mail}.`]],
    ];
  return [
    ['Éditeur du site', [`${e.nom}, ${e.statut.fr}, exerçant sous le nom commercial ${e.nomCommercial}.`, `SIRET : ${siret(l)} — Adresse : ${adresse(l)} — E-mail : ${mail}`, 'TVA non applicable, article 293 B du Code général des impôts.']],
    ['Directeur de la publication', [e.nom]],
    ['Hébergement', ['Netlify, Inc. — 101 2nd Street, San Francisco, CA 94105, États-Unis — www.netlify.com']],
    ['Nature du service', [`${e.nomCommercial} est un service de conseil indépendant, spécialisé dans l'accompagnement administratif des demandes de Destination Thailand Visa (DTV). ${e.nomCommercial} n'est ni une administration thaïlandaise, ni une ambassade, ni un consulat, et ne garantit pas l'obtention du visa : la décision appartient exclusivement aux autorités thaïlandaises.`]],
    ['Propriété intellectuelle', [`L'ensemble des contenus de ce site (textes, visuels, logo, structure) est la propriété de ${e.nom}, sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite.`]],
    ['Conditions de vente et médiation', [`Nos prestations sont régies par nos ${a(cgv, 'conditions générales de vente')}. En cas de litige, le consommateur peut recourir gratuitement au médiateur de la consommation : ${mediateur(l)}.`]],
    ['Données personnelles', [`Voir notre ${a(priv, 'politique de confidentialité')}. Pour toute question : ${mail}.`]],
  ];
}

// ---------------------------------------------------------------------------
// Politique de confidentialité
// ---------------------------------------------------------------------------
export function confidentialite(l: Locale): Sections {
  if (l === 'en')
    return [
      ['Data controller', [`${e.nom} (${e.nomCommercial}), ${adresse(l)} — ${mail}.`]],
      ['Data we collect', [
        'Eligibility test, information form and contact requests: identity, contact details, professional situation, savings level and details of your plans in Thailand.',
        'Your application file, uploaded through our secure space: passport, photo, bank statements, proof of activity or registration, proof of residence, criminal record certificate and any other document required for your DTV category.',
        'Payment: handled by Stripe. We never see or store your card number.',
        'Messages and appointments: emails, WhatsApp or Telegram messages you send us, and calls booked through Cal.com.',
        'Audience measurement: anonymous visit statistics (Umami, no cookies, no personal profile).',
      ]],
      ['Purposes and legal bases', [
        '<strong>Assessing your eligibility and answering your requests</strong>: steps taken at your request before a contract (GDPR art. 6.1.b).',
        '<strong>Preparing, filing and following up your application</strong>: performance of the contract (art. 6.1.b).',
        '<strong>Invoicing and accounting</strong>: legal obligation (art. 6.1.c).',
        '<strong>Follow-up messages to prospects, business partner outreach and visit statistics</strong>: our legitimate interest (art. 6.1.f). You can object at any time.',
        '<strong>Criminal record certificate</strong>: provided by you for your own application, used only to file it on the official Thai e-Visa portal, never for any other purpose.',
      ]],
      ['Recipients and service providers', [
        'Your data is only accessible to your advisor and to the following providers, strictly for the purposes above: Netlify (site hosting), Formspree (forms), Stripe (payment), Supabase (secure document storage), Cal.com (appointments), Notion (application tracking), n8n (email automation), OpenAI (AI assistant that helps your advisor sort and find emails; your data is not used to train its models), Google Fonts (display fonts), WhatsApp and Telegram (only if you contact us that way) and Umami (anonymous statistics).',
        'The Thai authorities receive your application through the official e-Visa portal: this is the very purpose of the service.',
        'We never sell or rent your data.',
      ]],
      ['Transfers outside the European Union', [
        'Some providers are based in the United States. Transfers rely on the EU-US Data Privacy Framework or on the European Commission’s standard contractual clauses.',
        'Your advisor works from Thailand, and your application is sent to the Thai authorities. These transfers are necessary to perform the contract you request (GDPR art. 49.1.b).',
      ]],
      ['Retention periods', [
        'Prospects who did not become clients: 3 years after the last contact.',
        'Client file (exchanges, tracking): 5 years after the end of the service, the limitation period for legal claims.',
        'Identity documents, supporting documents and criminal record certificate: deleted 6 months after the authorities’ decision.',
        'Invoices: 10 years (legal accounting obligation).',
      ]],
      ['Security', ['Documents go through an access-controlled space, never as email attachments. Access is limited to your advisor.']],
      ['Cookies', ['This site uses no advertising or tracking cookies, so no consent banner is needed. Umami measures visits without cookies. Stripe and Cal.com may set strictly necessary cookies on their own pages.']],
      ['Your rights', [`You have the right to access, rectify, erase, restrict and port your data, to object to its processing and to set instructions for its use after your death. To exercise them: ${mail}. We reply within one month.`, `If you believe your rights are not respected, you can lodge a complaint with the ${cnil} (French data protection authority) or the authority of your country.`]],
    ];
  if (l === 'de')
    return [
      ['Verantwortlicher', [`${e.nom} (${e.nomCommercial}), ${adresse(l)} — ${mail}.`]],
      ['Welche Daten wir erheben', [
        'Eignungstest, Informationsformular und Kontaktanfragen: Identität, Kontaktdaten, berufliche Situation, Höhe der Ersparnisse und Angaben zu Ihrem Vorhaben in Thailand.',
        'Ihre Antragsunterlagen, hochgeladen über unseren gesicherten Bereich: Reisepass, Foto, Kontoauszüge, Tätigkeits- oder Anmeldenachweise, Wohnsitznachweis, Führungszeugnis und alle weiteren für Ihre DTV-Kategorie nötigen Dokumente.',
        'Zahlung: über Stripe. Wir sehen und speichern Ihre Kartennummer nie.',
        'Nachrichten und Termine: E-Mails, WhatsApp- oder Telegram-Nachrichten an uns und über Cal.com gebuchte Gespräche.',
        'Reichweitenmessung: anonyme Besuchsstatistik (Umami, ohne Cookies, ohne Personenprofil).',
      ]],
      ['Zwecke und Rechtsgrundlagen', [
        '<strong>Prüfung Ihrer Eignung und Beantwortung Ihrer Anfragen</strong>: vorvertragliche Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO).',
        '<strong>Vorbereitung, Einreichung und Begleitung Ihres Antrags</strong>: Vertragserfüllung (Art. 6 Abs. 1 lit. b).',
        '<strong>Rechnungsstellung und Buchhaltung</strong>: rechtliche Verpflichtung (Art. 6 Abs. 1 lit. c).',
        '<strong>Nachfassen bei Interessenten, Ansprache von Geschäftspartnern und Besuchsstatistik</strong>: berechtigtes Interesse (Art. 6 Abs. 1 lit. f). Sie können jederzeit widersprechen.',
        '<strong>Führungszeugnis</strong>: von Ihnen für Ihren eigenen Antrag bereitgestellt, ausschließlich für die Einreichung über das offizielle thailändische e-Visa-Portal verwendet.',
      ]],
      ['Empfänger und Dienstleister', [
        'Zugriff haben nur Ihr Berater und folgende Dienstleister, ausschließlich für die genannten Zwecke: Netlify (Hosting), Formspree (Formulare), Stripe (Zahlung), Supabase (gesicherte Dokumentenablage), Cal.com (Termine), Notion (Antragsverfolgung), n8n (E-Mail-Automatisierung), OpenAI (KI-Assistent, der Ihrem Berater beim Sortieren und Finden von E-Mails hilft; Ihre Daten werden nicht zum Training der Modelle verwendet), Google Fonts (Schriften), WhatsApp und Telegram (nur wenn Sie uns darüber kontaktieren) und Umami (anonyme Statistik).',
        'Die thailändischen Behörden erhalten Ihren Antrag über das offizielle e-Visa-Portal: Das ist der Zweck der Dienstleistung.',
        'Wir verkaufen oder vermieten Ihre Daten niemals.',
      ]],
      ['Übermittlung außerhalb der EU', [
        'Einige Dienstleister sitzen in den USA. Die Übermittlung beruht auf dem EU-US Data Privacy Framework oder den Standardvertragsklauseln der Europäischen Kommission.',
        'Ihr Berater arbeitet von Thailand aus, und Ihr Antrag geht an die thailändischen Behörden. Diese Übermittlungen sind für die Erfüllung des von Ihnen gewünschten Vertrags erforderlich (Art. 49 Abs. 1 lit. b DSGVO).',
      ]],
      ['Speicherdauer', [
        'Interessenten ohne Auftrag: 3 Jahre nach dem letzten Kontakt.',
        'Kundenakte (Korrespondenz, Verfolgung): 5 Jahre nach Ende der Leistung (Verjährungsfrist).',
        'Ausweis- und Nachweisdokumente sowie Führungszeugnis: Löschung 6 Monate nach der Entscheidung der Behörden.',
        'Rechnungen: 10 Jahre (gesetzliche Aufbewahrungspflicht).',
      ]],
      ['Sicherheit', ['Dokumente laufen über einen zugangsgeschützten Bereich, nie als E-Mail-Anhang. Zugriff hat nur Ihr Berater.']],
      ['Cookies', ['Diese Website verwendet keine Werbe- oder Tracking-Cookies, daher ist kein Cookie-Banner nötig. Umami misst Besuche ohne Cookies. Stripe und Cal.com können auf ihren eigenen Seiten technisch notwendige Cookies setzen.']],
      ['Ihre Rechte', [`Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch sowie das Recht, Verfügungen für die Zeit nach Ihrem Tod festzulegen. Kontakt: ${mail}. Wir antworten innerhalb eines Monats.`, `Sie können sich bei der ${cnil} (französische Datenschutzbehörde) oder der Aufsichtsbehörde Ihres Landes beschweren.`]],
    ];
  return [
    ['Responsable du traitement', [`${e.nom} (${e.nomCommercial}), ${adresse(l)} — ${mail}.`]],
    ['Données collectées', [
      "Test d'éligibilité, fiche de renseignement et demandes de contact : identité, coordonnées, situation professionnelle, niveau d'épargne et éléments relatifs à votre projet en Thaïlande.",
      "Votre dossier, transmis via notre espace sécurisé : passeport, photo, relevés bancaires, justificatifs d'activité ou d'inscription, justificatif de résidence, extrait de casier judiciaire et toute autre pièce exigée pour votre catégorie de DTV.",
      'Paiement : géré par Stripe. Nous ne voyons ni ne conservons jamais votre numéro de carte.',
      'Échanges et rendez-vous : e-mails, messages WhatsApp ou Telegram que vous nous envoyez, appels réservés via Cal.com.',
      "Mesure d'audience : statistiques de visite anonymes (Umami, sans cookie ni profil individuel).",
    ]],
    ['Finalités et bases légales', [
      "<strong>Évaluer votre éligibilité et répondre à vos demandes</strong> : mesures précontractuelles prises à votre demande (RGPD, art. 6.1.b).",
      '<strong>Préparer, déposer et suivre votre demande de visa</strong> : exécution du contrat (art. 6.1.b).',
      '<strong>Facturation et comptabilité</strong> : obligation légale (art. 6.1.c).',
      "<strong>Relances des prospects, prospection de partenaires professionnels et statistiques de visite</strong> : intérêt légitime (art. 6.1.f). Vous pouvez vous y opposer à tout moment.",
      "<strong>Extrait de casier judiciaire</strong> : fourni par vous pour votre propre demande, utilisé uniquement pour son dépôt sur le portail officiel e-Visa de la Thaïlande, jamais à d'autres fins.",
    ]],
    ['Destinataires et sous-traitants', [
      "Vos données ne sont accessibles qu'à votre conseiller et aux prestataires suivants, strictement pour les finalités ci-dessus : Netlify (hébergement du site), Formspree (formulaires), Stripe (paiement), Supabase (stockage sécurisé des documents), Cal.com (rendez-vous), Notion (suivi des dossiers), n8n (automatisation des e-mails), OpenAI (assistant IA qui aide votre conseiller à trier et retrouver les e-mails ; vos données ne servent pas à entraîner ses modèles), Google Fonts (polices d'affichage), WhatsApp et Telegram (uniquement si vous nous contactez par ce biais) et Umami (statistiques anonymes).",
      "Les autorités thaïlandaises reçoivent votre demande via le portail officiel e-Visa : c'est l'objet même de la prestation.",
      'Nous ne vendons ni ne louons jamais vos données.',
    ]],
    ["Transferts hors de l'Union européenne", [
      "Certains prestataires sont établis aux États-Unis. Les transferts reposent sur le Data Privacy Framework UE–États-Unis ou sur les clauses contractuelles types de la Commission européenne.",
      "Votre conseiller travaille depuis la Thaïlande et votre demande est transmise aux autorités thaïlandaises. Ces transferts sont nécessaires à l'exécution du contrat que vous demandez (RGPD, art. 49.1.b).",
    ]],
    ['Durées de conservation', [
      'Prospects non devenus clients : 3 ans après le dernier contact.',
      "Dossier client (échanges, suivi) : 5 ans après la fin de la prestation, durée de prescription des actions en justice.",
      "Pièces d'identité, justificatifs et extrait de casier judiciaire : supprimés 6 mois après la décision des autorités.",
      'Factures : 10 ans (obligation comptable).',
    ]],
    ['Sécurité', ["Les documents transitent par un espace à accès contrôlé, jamais en pièce jointe d'e-mail. Seul votre conseiller y a accès."]],
    ['Cookies', ["Ce site n'utilise aucun cookie publicitaire ni de suivi : aucun bandeau de consentement n'est donc nécessaire. Umami mesure l'audience sans cookie. Stripe et Cal.com peuvent déposer des cookies strictement nécessaires sur leurs propres pages."]],
    ['Vos droits', [`Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition, ainsi que du droit de définir des directives sur le sort de vos données après votre décès. Pour les exercer : ${mail}. Nous répondons sous un mois.`, `Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la ${cnil}.`]],
  ];
}

// ---------------------------------------------------------------------------
// Conditions générales de vente
// ---------------------------------------------------------------------------
export function cgv(l: Locale): Sections {
  const priv = localePath(l, '/confidentialite/');
  if (l === 'en')
    return [
      ['1. Scope', [`These terms govern the services sold by ${e.nom}, ${e.statut.en}, trading as ${e.nomCommercial} (SIRET ${siret(l)}, ${adresse(l)}, ${mail}), to any client ordering through ${e.site}. Ordering means accepting these terms.`]],
      ['2. Services', [
        '<strong>Document check — 99€.</strong> Review of all your documents for your DTV category, consistency checks (names, dates, amounts) and a written report. You file the application yourself.',
        '<strong>Full package — 699€.</strong> Complete file preparation, filing of your application by us on the official Thai e-Visa portal, follow-up until the decision and a dedicated advisor. The price includes the official visa fee of 10,000 THB for one application.',
        'Not included: sworn translations, legalisations, bank charges, travel and any document to be obtained from third parties.',
        'If you move from the document check to the full package, the 99€ already paid is deducted.',
      ]],
      ['3. Nature of our commitment', [`${e.nomCommercial} has an obligation of means, not of result. The decision to grant or refuse the visa belongs solely to the Thai authorities. You are responsible for the accuracy and authenticity of the information and documents you provide.`]],
      ['4. Prices and payment', ['Prices are in euros. VAT not applicable, article 293 B of the French General Tax Code. Payment is made in one go by card via Stripe, before any work begins. An invoice is sent to you.']],
      ['5. Turnaround times', ['The document check report is delivered within 48 business hours of receiving your complete file. For the full package, the filing date is agreed with you in writing. Processing times of the Thai authorities are beyond our control.']],
      ['6. Right of withdrawal', [
        'As a consumer, you have 14 days from payment to withdraw, without giving a reason, by writing to ' + mail + '.',
        'If you ask us to start work before this period ends, you will pay for the part already performed. Once the service has been fully performed with your prior express consent, the right of withdrawal no longer applies (French Consumer Code, art. L221-28). The official visa fee cannot be refunded once the application has been filed.',
        'Refunds are made within 14 days by the same payment method.',
      ]],
      ['7. Our commitment if your application is refused', [
        'If the refusal is due to a document we approved, we prepare and file your second application with no service fee (full package), or re-check your new file for free (document check). Only the official fee for the new application is payable by you.',
        'For any other reason (eligibility, information withheld or inaccurate, change in rules, discretionary decision), we go through the decision with you and send you the next steps in writing.',
      ]],
      ['8. Liability', ['Our liability is limited to the amount paid for the service concerned. We cannot be held liable for a decision by the Thai authorities, a change in regulations or delays on their part.']],
      ['9. Personal data', [`See our ${a(priv, 'privacy policy')}.`]],
      ['10. Mediation and disputes', [`In the event of a dispute, please first contact us at ${mail}. If no amicable solution is found, you may refer the matter free of charge to the consumer mediator: ${mediateur(l)}.`, 'These terms are governed by French law. As a consumer, you may bring proceedings before the court of your place of residence.']],
    ];
  if (l === 'de')
    return [
      ['1. Geltungsbereich', [`Diese AGB gelten für alle Leistungen von ${e.nom}, ${e.statut.de}, Handelsname ${e.nomCommercial} (SIRET ${siret(l)}, ${adresse(l)}, ${mail}), die über ${e.site} bestellt werden. Mit der Bestellung akzeptieren Sie diese AGB.`]],
      ['2. Leistungen', [
        '<strong>Prüfung der Unterlagen — 99 €.</strong> Prüfung aller Dokumente für Ihre DTV-Kategorie, Abgleich der Angaben (Namen, Daten, Beträge) und schriftlicher Bericht. Sie reichen den Antrag selbst ein.',
        '<strong>Komplettpaket — 699 €.</strong> Vollständige Vorbereitung, Einreichung Ihres Antrags durch uns über das offizielle thailändische e-Visa-Portal, Begleitung bis zur Entscheidung und ein fester Ansprechpartner. Der Preis enthält die offizielle Visagebühr von 10.000 THB für einen Antrag.',
        'Nicht enthalten: beglaubigte Übersetzungen, Legalisierungen, Bankgebühren, Reisen und bei Dritten zu beschaffende Dokumente.',
        'Wechseln Sie von der Prüfung zum Komplettpaket, werden die bereits gezahlten 99 € angerechnet.',
      ]],
      ['3. Art der Verpflichtung', [`${e.nomCommercial} schuldet ein sorgfältiges Tätigwerden, keinen Erfolg. Über die Erteilung entscheiden allein die thailändischen Behörden. Sie sind für die Richtigkeit und Echtheit Ihrer Angaben und Dokumente verantwortlich.`]],
      ['4. Preise und Zahlung', ['Preise in Euro. Keine Umsatzsteuer gemäß Art. 293 B CGI. Zahlung in einem Betrag per Karte über Stripe, vor Beginn der Arbeiten. Sie erhalten eine Rechnung.']],
      ['5. Fristen', ['Der Prüfbericht wird innerhalb von 48 Werktagsstunden nach Eingang Ihrer vollständigen Unterlagen geliefert. Beim Komplettpaket wird der Einreichungstermin schriftlich mit Ihnen vereinbart. Die Bearbeitungszeiten der thailändischen Behörden liegen außerhalb unseres Einflusses.']],
      ['6. Widerrufsrecht', [
        'Als Verbraucher können Sie innerhalb von 14 Tagen ab Zahlung ohne Angabe von Gründen widerrufen, per E-Mail an ' + mail + '.',
        'Wünschen Sie den Beginn der Arbeiten vor Ablauf dieser Frist, zahlen Sie den bereits erbrachten Teil. Nach vollständiger Erbringung mit Ihrer ausdrücklichen vorherigen Zustimmung erlischt das Widerrufsrecht (Art. L221-28 frz. Verbrauchergesetzbuch). Die offizielle Visagebühr ist nach Einreichung nicht erstattungsfähig.',
        'Erstattungen erfolgen innerhalb von 14 Tagen über dasselbe Zahlungsmittel.',
      ]],
      ['7. Unsere Zusage bei Ablehnung', [
        'Geht die Ablehnung auf ein von uns geprüftes Dokument zurück, bereiten wir Ihren zweiten Antrag ohne Honorar vor und reichen ihn ein (Komplettpaket) bzw. prüfen Ihre neuen Unterlagen kostenlos (Prüfung). Sie tragen nur die offizielle Gebühr für den neuen Antrag.',
        'Bei anderen Gründen (Eignung, verschwiegene oder unrichtige Angaben, Regeländerung, Ermessensentscheidung) besprechen wir die Entscheidung mit Ihnen und schicken Ihnen die nächsten Schritte schriftlich.',
      ]],
      ['8. Haftung', ['Unsere Haftung ist auf den für die betreffende Leistung gezahlten Betrag begrenzt. Für Entscheidungen der thailändischen Behörden, Regeländerungen oder deren Verzögerungen haften wir nicht.']],
      ['9. Personenbezogene Daten', [`Siehe unsere ${a(priv, 'Datenschutzerklärung')}.`]],
      ['10. Schlichtung und Streitigkeiten', [`Bei Streitigkeiten wenden Sie sich bitte zuerst an ${mail}. Kommt keine gütliche Einigung zustande, können Sie kostenlos die Verbraucherschlichtungsstelle anrufen: ${mediateur(l)}.`, 'Es gilt französisches Recht. Als Verbraucher können Sie das Gericht an Ihrem Wohnsitz anrufen.']],
    ];
  return [
    ['1. Objet et champ d’application', [`Les présentes conditions générales de vente (CGV) régissent les prestations vendues par ${e.nom}, ${e.statut.fr}, exerçant sous le nom commercial ${e.nomCommercial} (SIRET ${siret(l)}, ${adresse(l)}, ${mail}), à tout client qui commande via ${e.site}. Toute commande vaut acceptation des CGV.`]],
    ['2. Prestations', [
      "<strong>Vérification du dossier — 99 €.</strong> Contrôle de toutes vos pièces selon votre catégorie de DTV, vérification de leur cohérence (noms, dates, montants) et rapport écrit. Vous déposez vous-même la demande.",
      "<strong>Formule complète — 699 €.</strong> Préparation complète du dossier, dépôt de la demande par nos soins sur le portail officiel e-Visa de la Thaïlande, suivi jusqu'à la décision et conseiller dédié. Le prix inclut les frais officiels du visa de 10 000 THB pour un dépôt.",
      'Ne sont pas inclus : traductions assermentées, légalisations, frais bancaires, déplacements et toute pièce à obtenir auprès de tiers.',
      'En cas de passage de la vérification à la formule complète, les 99 € déjà réglés sont déduits.',
    ]],
    ['3. Nature de notre engagement', [`${e.nomCommercial} est tenu à une obligation de moyens, et non de résultat. La décision d'accorder ou de refuser le visa appartient exclusivement aux autorités thaïlandaises. Vous êtes responsable de l'exactitude et de l'authenticité des informations et documents fournis.`]],
    ['4. Prix et paiement', ['Les prix sont indiqués en euros. TVA non applicable, article 293 B du Code général des impôts. Le paiement s’effectue en une fois, par carte via Stripe, avant le début de la prestation. Une facture vous est adressée.']],
    ['5. Délais', ["Le rapport de vérification est remis sous 48 h ouvrées à compter de la réception de votre dossier complet. Pour la formule complète, la date de dépôt est convenue avec vous par écrit. Les délais de traitement des autorités thaïlandaises ne dépendent pas de nous."]],
    ['6. Droit de rétractation', [
      `En tant que consommateur, vous disposez de 14 jours à compter du paiement pour vous rétracter, sans avoir à vous justifier, en écrivant à ${mail}.`,
      "Si vous demandez que la prestation commence avant la fin de ce délai, vous réglez la part déjà exécutée. Une fois la prestation pleinement exécutée avec votre accord préalable exprès, le droit de rétractation ne s'applique plus (art. L221-28 du Code de la consommation). Les frais officiels du visa ne sont plus remboursables une fois la demande déposée.",
      'Le remboursement intervient sous 14 jours, par le même moyen de paiement.',
    ]],
    ['7. Notre engagement en cas de refus', [
      "Si le refus vient d'une pièce que nous avons validée, nous préparons et déposons votre 2e demande sans honoraires (formule complète), ou revérifions gratuitement votre nouveau dossier (vérification). Seuls les frais officiels du nouveau dépôt restent à votre charge.",
      "Pour tout autre motif (inéligibilité, information omise ou inexacte, changement de réglementation, décision discrétionnaire), nous analysons la décision avec vous et vous proposons la suite par écrit.",
    ]],
    ['8. Responsabilité', ["Notre responsabilité est limitée au montant payé pour la prestation concernée. Elle ne peut être engagée du fait d'une décision des autorités thaïlandaises, d'une évolution de la réglementation ou de leurs délais."]],
    ['9. Données personnelles', [`Voir notre ${a(priv, 'politique de confidentialité')}.`]],
    ['10. Médiation et litiges', [`En cas de litige, contactez-nous d'abord à ${mail}. À défaut de solution amiable, vous pouvez recourir gratuitement au médiateur de la consommation : ${mediateur(l)}.`, 'Les présentes CGV sont soumises au droit français. En tant que consommateur, vous pouvez saisir la juridiction de votre lieu de domicile.']],
  ];
}
