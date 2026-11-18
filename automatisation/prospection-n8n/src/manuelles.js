// Liste Telegram des prospects à contacter à la main (WhatsApp, Instagram, visite…)
const txt = (prop) => (prop?.rich_text || prop?.title || []).map((t) => t.plain_text).join('').trim();
const pages = $input.all().flatMap((i) => i.json.results || []);
if (!pages.length) return [];
const lignes = ['📋 À faire à la main aujourd\'hui'];
for (const pg of pages) {
  const pr = pg.properties;
  const canal = pr['Canal']?.select?.name || '?';
  const autre = txt(pr['Autre contact']);
  lignes.push(`• ${txt(pr['Nom'])} (${pr['Statut']?.select?.name || ''}) · ${canal}${autre ? ' · ' + autre : ''}`);
}
lignes.push('\nPensez à mettre à jour « Statut » et « Prochaine action » dans Notion.');
return [{ json: { text: lignes.join('\n') } }];
