// ===== RÉGLAGES : à modifier avant d'activer le workflow =====
const CONFIG = {
  commissionFr: '10 % du prix TTC payé par le client',
  commissionEn: '10% of the price the client pays (incl. VAT)',
  prenom: 'Alexandre',
  site: 'myvisadtv.com',
  whatsapp: '+66 63 174 7492',
  lienPartenaires: 'https://myvisadtv.com/partenaires/',
  lienPartenairesEn: 'https://myvisadtv.com/en/partenaires/',
  langue: 'en',                   // 'en' : tous les e-mails en anglais ; 'auto' : selon la colonne « Langue » de Notion
  maxParJour: 20,                 // nombre maximum d'e-mails envoyés par jour
  joursAvantRelance1: 5,          // relance 1 à J+5 après le premier e-mail
  joursAvantRelance2: 7,          // relance 2 sept jours après la relance 1 (J+12)
  joursAvantCloture: 7,           // « Sans réponse » sept jours après la relance 2
};
// =============================================================

if (/\[X/.test(CONFIG.commissionFr + CONFIG.commissionEn)) {
  throw new Error('Indiquez la commission (commissionFr et commissionEn) dans les RÉGLAGES avant d\'envoyer des e-mails.');
}

const PUBLIC = {
  fr: { 'Coworking / coliving': 'membres', 'Camp de Muay Thai': 'élèves', 'École': 'élèves', 'Relocation / immobilier': 'clients', 'Comptable / avocat / assurance': 'clients', 'Communauté / créateur': 'abonnés', 'Agence de voyage': 'clients' },
  en: { 'Coworking / coliving': 'members', 'Camp de Muay Thai': 'students', 'École': 'students', 'Relocation / immobilier': 'clients', 'Comptable / avocat / assurance': 'clients', 'Communauté / créateur': 'followers', 'Agence de voyage': 'clients' },
};

const SIGN = {
  fr: `${CONFIG.prenom} · MyVisaDTV\n${CONFIG.site} · WhatsApp ${CONFIG.whatsapp}`,
  en: `${CONFIG.prenom} · MyVisaDTV\n${CONFIG.site} · WhatsApp ${CONFIG.whatsapp}`,
};
const STOP = {
  fr: `\n\nSi vous ne souhaitez plus recevoir de message de ma part, répondez simplement « stop ».`,
  en: `\n\nIf you'd rather not hear from me again, just reply "stop".`,
};


// Signature HTML (même que la signature e-mail de contact@)
const SIG_HTML = {
  fr: "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#1F2430;\"><tr><td valign=\"middle\" style=\"padding:0 18px 0 0;\"><a href=\"https://myvisadtv.com/\" style=\"text-decoration:none;\"><img src=\"https://myvisadtv.com/images/logo-dtv-thailand.png\" width=\"132\" height=\"88\" alt=\"MyVisaDTV, DTV Thailand Visa Services\" style=\"display:block;border:0;width:132px;height:88px;\"></a></td><td valign=\"middle\" style=\"border-left:2px solid #C9A24C;padding:2px 0 2px 18px;\"><div style=\"font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:bold;color:#16233F;line-height:1.2;\">Alexandre</div><div style=\"font-size:13px;color:#2F6F62;font-weight:bold;line-height:1.5;padding-top:2px;\">Fondateur · MyVisaDTV</div><div style=\"font-size:12px;color:#6F675B;line-height:1.5;\">Accompagnement visa DTV pour la Thaïlande</div><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;margin-top:8px;font-size:12.5px;line-height:1.7;\"><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">WhatsApp</td><td><a href=\"https://wa.me/66631747492\" style=\"color:#1F2430;text-decoration:none;\">+66 63 174 7492</a></td></tr><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">E-mail</td><td><a href=\"mailto:contact@myvisadtv.com\" style=\"color:#1F2430;text-decoration:none;\">contact@myvisadtv.com</a></td></tr><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">Site</td><td><a href=\"https://myvisadtv.com/\" style=\"color:#1F2430;text-decoration:none;\">myvisadtv.com</a></td></tr></table><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;margin-top:10px;\"><tr><td style=\"background:#16233F;border-radius:6px;\"><a href=\"https://cal.com/myvisadtv/appel-decouverte-dtv\" style=\"display:inline-block;padding:7px 14px;font-size:12px;font-weight:bold;color:#FFFFFF;text-decoration:none;\">Réserver un appel gratuit de 10 min</a></td></tr></table></td></tr><tr><td colspan=\"2\" style=\"padding-top:12px;font-size:10.5px;line-height:1.4;color:#9C9284;\"> MyVisaDTV est une agence privée d'accompagnement. Nous ne sommes pas l'administration thaïlandaise et ne garantissons pas l'obtention du visa. </td></tr></table>",
  en: "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;color:#1F2430;\"><tr><td valign=\"middle\" style=\"padding:0 18px 0 0;\"><a href=\"https://myvisadtv.com/en/\" style=\"text-decoration:none;\"><img src=\"https://myvisadtv.com/images/logo-dtv-thailand.png\" width=\"132\" height=\"88\" alt=\"MyVisaDTV, DTV Thailand Visa Services\" style=\"display:block;border:0;width:132px;height:88px;\"></a></td><td valign=\"middle\" style=\"border-left:2px solid #C9A24C;padding:2px 0 2px 18px;\"><div style=\"font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:bold;color:#16233F;line-height:1.2;\">Alexandre</div><div style=\"font-size:13px;color:#2F6F62;font-weight:bold;line-height:1.5;padding-top:2px;\">Founder · MyVisaDTV</div><div style=\"font-size:12px;color:#6F675B;line-height:1.5;\">DTV visa support for Thailand</div><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;margin-top:8px;font-size:12.5px;line-height:1.7;\"><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">WhatsApp</td><td><a href=\"https://wa.me/66631747492\" style=\"color:#1F2430;text-decoration:none;\">+66 63 174 7492</a></td></tr><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">Email</td><td><a href=\"mailto:contact@myvisadtv.com\" style=\"color:#1F2430;text-decoration:none;\">contact@myvisadtv.com</a></td></tr><tr><td style=\"color:#C9A24C;font-weight:bold;padding-right:6px;\">Web</td><td><a href=\"https://myvisadtv.com/en/\" style=\"color:#1F2430;text-decoration:none;\">myvisadtv.com</a></td></tr></table><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;margin-top:10px;\"><tr><td style=\"background:#16233F;border-radius:6px;\"><a href=\"https://cal.com/myvisadtv/appel-decouverte-dtv\" style=\"display:inline-block;padding:7px 14px;font-size:12px;font-weight:bold;color:#FFFFFF;text-decoration:none;\">Book a free 10-minute call</a></td></tr></table></td></tr><tr><td colspan=\"2\" style=\"padding-top:12px;font-size:10.5px;line-height:1.4;color:#9C9284;\"> MyVisaDTV is a private support agency. We are not the Thai government and cannot guarantee that a visa will be granted. </td></tr></table>",
};
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const versHtml = (corps, lang) => {
  const sansSignature = corps.replace(SIGN[lang], '').trim();
  const paragraphes = esc(sansSignature).split(/\n{2,}/).map((b) => b.replace(/\n/g, '<br>').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" style="color:#2F6F62;">$1</a>'));
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.55;color:#1F2430;">'
    + paragraphes.map((x) => `<p style="margin:0 0 14px;">${x}</p>`).join('')
    + '<div style="margin-top:18px;">' + SIG_HTML[lang] + '</div>'
    + `<p style="margin:16px 0 0;font-size:11px;color:#9C9284;">${esc(STOP[lang].trim())}</p></div>`;
};

const T = {
  fr: [
    {
      subject: (p) => `Partenariat visa DTV pour vos ${p.public}`,
      text: (p) => `${p.bonjour},

Je suis ${CONFIG.prenom}, de MyVisaDTV. Nous accompagnons les francophones dans leur demande de visa DTV (Destination Thailand Visa), de la vérification d'éligibilité au dossier complet.

Beaucoup de vos ${p.public} se posent sans doute la question du visa pour rester plus longtemps ${p.aVille}. Je vous propose un partenariat simple : vous nous orientez les personnes intéressées, nous nous occupons de tout, et vous recevez ${CONFIG.commissionFr} pour chaque client accompagné.

Le programme est présenté ici : ${CONFIG.lienPartenaires}

Seriez-vous d'accord pour en parler 10 minutes cette semaine ?

${SIGN.fr}`,
    },
    {
      subject: (p) => `Partenariat visa DTV pour vos ${p.public} (suite)`,
      text: (p) => `${p.bonjour},

Je me permets de revenir vers vous au sujet du partenariat MyVisaDTV. L'idée : quand l'un de vos ${p.public} vous demande comment rester plus longtemps en Thaïlande, vous lui donnez notre contact, et nous gérons tout le dossier DTV.

Vous trouverez le fonctionnement et le formulaire de candidature ici : ${CONFIG.lienPartenaires}

Bonne journée,
${SIGN.fr}`,
    },
    {
      subject: (p) => `Dernier message : partenariat visa DTV`,
      text: (p) => `${p.bonjour},

Je ne veux pas encombrer votre boîte : ce sera mon dernier message. Si le sujet du visa revient un jour chez vos ${p.public}, vous pouvez me joindre directement sur WhatsApp au ${CONFIG.whatsapp} ou via ${CONFIG.lienPartenaires}.

Belle continuation,
${SIGN.fr}`,
    },
  ],
  en: [
    {
      subject: (p) => `DTV visa partnership for your ${p.public}`,
      text: (p) => `${p.hello},

I'm ${CONFIG.prenom} from MyVisaDTV. We help foreigners prepare their DTV (Destination Thailand Visa) application, from the eligibility check to the complete file, with a strong focus on French-speaking clients.

Many of your ${p.public} probably ask how they can stay longer in ${p.ville || 'Thailand'}. I'd like to suggest a simple partnership: you refer interested people to us, we handle the whole visa file, and you receive ${CONFIG.commissionEn} for each client we assist.

Programme details: ${CONFIG.lienPartenairesEn}

Would you be open to a 10-minute chat this week?

${SIGN.en}`,
    },
    {
      subject: (p) => `DTV visa partnership for your ${p.public} (follow-up)`,
      text: (p) => `${p.hello},

Just following up on my message about a referral partnership. When one of your ${p.public} asks how to stay longer in Thailand, you simply pass on our contact and we take care of the entire DTV application.

How it works: ${CONFIG.lienPartenairesEn}

Best,
${SIGN.en}`,
    },
    {
      subject: (p) => `Last note: DTV visa partnership`,
      text: (p) => `${p.hello},

I don't want to clutter your inbox, so this will be my last message. If visas come up with your ${p.public} in the future, you can reach me directly on WhatsApp at ${CONFIG.whatsapp} or via ${CONFIG.lienPartenairesEn}.

All the best,
${SIGN.en}`,
    },
  ],
};

const STATUTS = ['À contacter', 'Email 1 envoyé', 'Relance 1 envoyée', 'Relance 2 envoyée'];
const DELAIS = [CONFIG.joursAvantRelance1, CONFIG.joursAvantRelance2, CONFIG.joursAvantCloture];

const now = DateTime.now().setZone('Asia/Bangkok');
const today = now.toFormat('yyyy-MM-dd');
const plus = (n) => now.plus({ days: n }).toFormat('yyyy-MM-dd');
const txt = (prop) => (prop?.rich_text || prop?.title || []).map((t) => t.plain_text).join('').trim();
const jour = now.toFormat('dd/MM/yyyy');
const LIBELLES = ['E-mail 1 envoyé', 'Relance 1 envoyée', 'Relance 2 envoyée'];
// Ajoute une ligne datée à l'historique (Notion limite un texte à 2000 caractères)
const ajoute = (ancien, ligne) => ((ancien ? ancien + '\n' : '') + `${jour} · ${ligne}`).slice(-1900);

const pages = $input.all().flatMap((i) => i.json.results || []);
const out = [];
let envois = 0;

for (const page of pages) {
  const pr = page.properties;
  const etape = pr['Étape séquence']?.number || 0;
  const email = pr['Email']?.email;
  if (!email) continue;

  if (etape >= 3) {
    out.push({ json: { action: 'cloture', pageId: page.id, nom: txt(pr['Nom']), historique: ajoute(txt(pr['Historique']), 'Sans réponse après 3 e-mails, séquence arrêtée') } });
    continue;
  }
  if (envois >= CONFIG.maxParJour) continue;

  const lang = CONFIG.langue === 'auto' ? (pr['Langue']?.select?.name === 'fr' ? 'fr' : 'en') : CONFIG.langue;
  const cat = pr['Catégorie']?.select?.name || 'Coworking / coliving';
  const ville = pr['Ville']?.select?.name || '';
  const contact = txt(pr['Contact']);
  const p = {
    nom: txt(pr['Nom']),
    public: PUBLIC[lang][cat] || (lang === 'fr' ? 'clients' : 'clients'),
    ville: ville === 'En ligne' ? '' : ville,
    aVille: ville && ville !== 'En ligne' ? `à ${ville}` : 'en Thaïlande',
    bonjour: contact ? `Bonjour ${contact}` : 'Bonjour',
    hello: contact ? `Hi ${contact}` : 'Hello',
  };
  const tpl = T[lang][etape];
  out.push({
    json: {
      action: 'envoi',
      pageId: page.id,
      nom: p.nom,
      to: email,
      subject: tpl.subject(p),
      text: tpl.text(p) + STOP[lang],
      html: versHtml(tpl.text(p), lang),
      etape: etape + 1,
      statut: STATUTS[etape + 1],
      today,
      prochaine: plus(DELAIS[etape]),
      historique: ajoute(txt(pr['Historique']), `${LIBELLES[etape]} à ${email} : « ${tpl.subject(p)} »`),
    },
  });
  envois++;
}

return out;
