// Nouveau lead -> création ; lead déjà connu -> on ajoute le test au « Message initial », sans doublon
const DB = '419615ef3da18149b530d5b19aa6b379';
const rt = (v) => ({ rich_text: [{ text: { content: String(v).slice(-1900) } }] });
const txt = (p) => (p?.rich_text || []).map((t) => t.plain_text).join('');
const out = [];
$input.all().forEach((item, i) => {
  const c = $('CRM · Normaliser le test').all()[i].json;
  const page = (item.json.results || [])[0];
  if (page) {
    const ancien = txt(page.properties['Message initial']);
    out.push({ json: { action: 'maj', pageId: page.id, body: { properties: { 'Message initial': rt((ancien ? ancien + '\n' : '') + c.ligne) } } } });
  } else {
    const props = {
      'Nom': { title: [{ text: { content: c.nom.slice(0, 200) } }] },
      'Statut': { select: { name: 'Nouveau lead' } },
      'Source': { select: { name: 'Site' } },
      'Langue': { select: { name: c.langue } },
      'Catégorie': { select: { name: c.categorie } },
      'Verdict IA': { select: { name: c.verdict } },
      'Message initial': rt(c.ligne),
      'Nb relances': { number: 0 },
    };
    if (c.email) props['Email'] = { email: c.email };
    if (c.tel) props['Téléphone'] = { phone_number: c.tel };
    out.push({ json: { action: 'creation', body: { parent: { database_id: DB }, properties: props } } });
  }
});
return out;
