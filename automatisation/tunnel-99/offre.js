// ===== Tunnel de vente : vérification du dossier à 99 € =====
// Bloc commun aux deux workflows (envoi de l'offre + relances).
const LIEN_STRIPE = 'https://buy.stripe.com/7sY5kE2oogXg4r1fQc14403';
const LIEN_PAGE = { fr: 'https://myvisadtv.com/visa-dtv/verification-dossier/', en: 'https://myvisadtv.com/en/visa-dtv/verification-dossier/' };
const LIEN_699 = { fr: 'https://myvisadtv.com/visa-dtv/demande-accompagnee/', en: 'https://myvisadtv.com/en/visa-dtv/demande-accompagnee/' };
const LIEN_APPEL = 'https://cal.com/myvisadtv/appel-decouverte-dtv';
const WHATSAPP = '+66 63 174 7492';
const CAT = {
  fr: { 'Workcation': 'Workcation (télétravail ou freelance)', 'Soft Power': 'Soft Power', 'Dépendant': 'membre de la famille', 'Médical': 'médical' },
  en: { 'Workcation': 'Workcation (remote work or freelance)', 'Soft Power': 'Soft Power', 'Dépendant': 'family member', 'Médical': 'medical' },
};
const lienPaiement = (email, lang) => `${LIEN_STRIPE}?locale=${lang}${email ? '&prefilled_email=' + encodeURIComponent(email) : ''}`;

const MAILS = {
  fr: [
    {
      objet: (p) => `${p.prenom ? p.prenom + ', v' : 'V'}otre dossier de visa DTV : la prochaine étape`,
      corps: (p) => `Bonjour${p.prenom ? ' ' + p.prenom : ''},

Merci d'avoir fait notre test d'éligibilité. D'après vos réponses, vous semblez éligible au visa DTV${p.categorie ? ' dans la catégorie ' + p.categorie : ''}. C'est un résultat indicatif : c'est votre dossier qui fera la différence.

La première cause de refus, c'est un dossier incomplet ou incohérent : une pièce manquante, un relevé bancaire sur la mauvaise période, un nom écrit différemment d'un document à l'autre.

Pour 99 €, nous vérifions votre dossier avant que vous ne le déposiez :
- la liste exacte des pièces exigées pour votre profil, comparée à ce que vous avez ;
- la conformité de chaque pièce (passeport, relevés bancaires et solde de 500 000 THB, justificatif d'activité…) ;
- la cohérence entre tous vos documents ;
- un rapport écrit sous 48 h ouvrées, avec ce qu'il faut corriger.

Et si vous préférez ensuite nous confier toute la demande, les 99 € sont déduits de la formule complète.

Vous pouvez répondre directement à cet e-mail si vous avez une question.`,
      bouton: 'Commander la vérification (99 €)',
    },
    {
      objet: () => `Avez-vous pu regarder la vérification de votre dossier DTV ?`,
      corps: (p) => `Bonjour${p.prenom ? ' ' + p.prenom : ''},

Je reviens vers vous au sujet de votre demande de visa DTV. Avant de déposer votre dossier, un contrôle complet de vos pièces vous évite le refus le plus fréquent : celui d'un dossier incomplet ou incohérent.

La vérification coûte 99 €, vous recevez un rapport écrit sous 48 h ouvrées, et ce montant est déduit si vous passez ensuite à la formule complète.

Une question avant de vous décider ? Répondez simplement à cet e-mail, ou écrivez-moi sur WhatsApp au ${WHATSAPP}.`,
      bouton: 'Faire vérifier mon dossier (99 €)',
    },
    {
      objet: () => `Dernier message au sujet de votre visa DTV`,
      corps: (p) => `Bonjour${p.prenom ? ' ' + p.prenom : ''},

Je ne veux pas encombrer votre boîte, ce sera donc mon dernier message.

Deux options si vous souhaitez être accompagné :
- la vérification de votre dossier à 99 €, si vous déposez vous-même : ${LIEN_PAGE.fr}
- la formule complète à 699 €, si vous préférez que nous nous occupions de tout : ${LIEN_699.fr}

Vous hésitez entre les deux ? Réservez un appel gratuit de 10 minutes : ${LIEN_APPEL}

Je vous souhaite une très belle installation en Thaïlande.`,
      bouton: 'Commander la vérification (99 €)',
    },
  ],
  en: [
    {
      objet: (p) => `${p.prenom ? p.prenom + ', y' : 'Y'}our DTV visa application: the next step`,
      corps: (p) => `Hello${p.prenom ? ' ' + p.prenom : ''},

Thank you for taking our eligibility test. Based on your answers, you appear to be eligible for the DTV visa${p.categorie ? ' under the ' + p.categorie + ' category' : ''}. This is an indicative result: your application file is what makes the difference.

The most common reason for refusal is an incomplete or inconsistent file: a missing document, a bank statement covering the wrong period, a name spelled differently from one document to another.

For €99, we check your file before you submit it:
- the exact list of documents required for your profile, compared with what you have;
- the compliance of each document (passport, bank statements and the 500,000 THB balance, proof of activity…);
- the consistency between all your documents;
- a written report within 2 business days, with what needs to be fixed.

And if you then prefer us to handle the whole application, the €99 is deducted from the full service.

Feel free to reply to this email if you have any question.`,
      bouton: 'Order the document check (€99)',
    },
    {
      objet: () => `Have you had a chance to look at the DTV document check?`,
      corps: (p) => `Hello${p.prenom ? ' ' + p.prenom : ''},

Just following up on your DTV visa application. Before you submit, a full check of your documents helps you avoid the most common refusal: an incomplete or inconsistent file.

The check costs €99, you receive a written report within 2 business days, and the amount is deducted if you then switch to the full service.

Any question before deciding? Simply reply to this email, or message me on WhatsApp at ${WHATSAPP}.`,
      bouton: 'Get my documents checked (€99)',
    },
    {
      objet: () => `Last note about your DTV visa`,
      corps: (p) => `Hello${p.prenom ? ' ' + p.prenom : ''},

I don't want to clutter your inbox, so this will be my last message.

Two options if you would like support:
- the €99 document check, if you submit the application yourself: ${LIEN_PAGE.en}
- the €699 full service, if you would rather we handle everything: ${LIEN_699.en}

Not sure which one fits? Book a free 10-minute call: ${LIEN_APPEL}

Wishing you a great move to Thailand.`,
      bouton: 'Order the document check (€99)',
    },
  ],
};
const NOTE = {
  fr: "Résultat indicatif, établi à partir de vos réponses au test. MyVisaDTV est une agence privée d'accompagnement : la décision appartient aux autorités thaïlandaises et nous ne garantissons pas l'obtention du visa.",
  en: 'Indicative result based on your answers to the test. MyVisaDTV is a private support agency: the decision belongs to the Thai authorities and we cannot guarantee that a visa will be granted.',
};
const SIGNE = `Alexandre · MyVisaDTV\nmyvisadtv.com · WhatsApp ${WHATSAPP}`;
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const lienHtml = (t) => t.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#2F6F62;">$1</a>');

// etape : 0 = offre, 1 = relance 1, 2 = dernière relance
function construireMail(etape, lang, client) {
  const L = lang === 'en' ? 'en' : 'fr';
  const p = { prenom: (client.prenom || '').trim(), categorie: CAT[L][client.categorie] || '' };
  const m = MAILS[L][etape];
  const lien = lienPaiement(client.email, L);
  const corps = m.corps(p);
  const text = `${corps}\n\n${m.bouton} : ${lien}\n\n${SIGNE}\n\n${NOTE[L]}`;
  const paragraphes = esc(corps).split(/\n{2,}/).map((b) => {
    const lignes = b.split('\n');
    if (lignes.length > 1 && lignes.slice(1).every((l) => l.startsWith('- '))) {
      return `<p style="margin:0 0 6px;">${lienHtml(lignes[0])}</p><ul style="margin:0 0 14px;padding-left:20px;">${lignes.slice(1).map((l) => `<li style="margin:0 0 4px;">${lienHtml(l.slice(2))}</li>`).join('')}</ul>`;
    }
    return `<p style="margin:0 0 14px;">${lienHtml(lignes.join('<br>'))}</p>`;
  }).join('');
  const bouton = `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="margin:6px 0 20px;"><tr><td style="background:#C9A24C;border-radius:8px;"><a href="${lien}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#16233F;text-decoration:none;">${esc(m.bouton)}</a></td></tr></table>`;
  const html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#1F2430;max-width:600px;">'
    + paragraphes + bouton
    + '<div style="margin-top:8px;">' + SIG_HTML[L] + '</div>'
    + `<p style="margin:16px 0 0;font-size:11px;line-height:1.4;color:#9C9284;">${esc(NOTE[L])}</p></div>`;
  return { objet: m.objet(p), text, html };
}
