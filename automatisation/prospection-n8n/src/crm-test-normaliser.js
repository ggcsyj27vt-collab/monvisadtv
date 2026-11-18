// Test d'éligibilité du site -> fiche dans le CRM Notion « Clients »
const now = DateTime.now().setZone('Asia/Bangkok');
const s = (v) => (v == null ? '' : String(v)).trim();
const CATEGORIE = { remote: 'Workcation', freelance: 'Workcation', softpower: 'Soft Power', family: 'Dépendant' };
const VERDICT = { ok: 'Éligible', unsure: 'Douteux', inside: 'Douteux', savings: 'Non éligible' };
const RESULTAT = { ok: 'éligible a priori', unsure: 'à vérifier', inside: 'demande depuis la Thaïlande (à faire depuis l\'étranger)', savings: 'épargne de 500 000 THB insuffisante' };
const out = [];
for (const item of $input.all()) {
  const b = item.json.body || item.json;
  const email = s(b.email).toLowerCase();
  const tel = s(b.whatsapp).replace(/[^\d+]/g, '');
  const r = s(b.resultat_indicatif);
  const ligne = `${now.toFormat('dd/MM/yyyy')} · Test d'éligibilité du site : ${RESULTAT[r] || r || 'résultat inconnu'} (profil : ${s(b.profil) || '?'}, épargne : ${s(b.epargne_500k_thb) || '?'}, demande depuis : ${s(b.lieu_de_demande) || '?'}, contact préféré : ${s(b.canal) || '?'})`;
  out.push({ json: {
    email, tel, ligne,
    nom: s(b.prenom) || email || tel || 'Lead sans nom',
    langue: s(b.langue) === 'fr' ? 'FR' : 'EN',
    categorie: CATEGORIE[s(b.profil)] || 'À déterminer',
    verdict: VERDICT[r] || 'Douteux',
    filtre: email ? { property: 'Email', email: { equals: email } }
      : tel ? { property: 'Téléphone', phone_number: { equals: tel } }
      : { property: 'Nom', title: { equals: '__aucun__' } },
  } });
}
return out;
