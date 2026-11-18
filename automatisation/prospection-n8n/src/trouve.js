// Garde seulement les réponses venant d'un prospect connu dans Notion
const txt = (prop) => (prop?.rich_text || prop?.title || []).map((t) => t.plain_text).join('').trim();
const out = [];
$input.all().forEach((item, idx) => {
  const page = (item.json.results || [])[0];
  if (!page) return;
  const src = $('Lire l\'expéditeur').all()[idx]?.json || {};
  const now = DateTime.now().setZone('Asia/Bangkok');
  const ancien = txt(page.properties['Historique']);
  const ligne = src.stop ? 'Réponse « stop » : ne plus contacter' : `Réponse reçue : « ${src.sujet || 'sans objet'} »`;
  const historique = ((ancien ? ancien + '\n' : '') + `${now.toFormat('dd/MM/yyyy')} · ${ligne}`).slice(-1900);
  const dejaRepondu = page.properties['Date de réponse']?.date?.start;
  out.push({ json: {
    pageId: page.id,
    nom: txt(page.properties['Nom']),
    statut: src.stop ? 'Refus' : 'En discussion',
    stop: !!src.stop,
    sujet: src.sujet,
    email: src.email,
    historique,
    dateReponse: dejaRepondu || now.toFormat('yyyy-MM-dd'),
  } });
});
return out;
