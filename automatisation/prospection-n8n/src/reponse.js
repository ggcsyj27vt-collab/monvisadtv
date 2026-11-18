// Extrait l'adresse de l'expéditeur et repère une demande d'arrêt
const out = [];
for (const item of $input.all()) {
  const j = item.json;
  let from = '';
  if (typeof j.from === 'string') from = j.from;
  else if (j.from?.value?.[0]?.address) from = j.from.value[0].address;
  else if (j.from?.text) from = j.from.text;
  const m = from.match(/[\w.+-]+@[\w-]+(\.[\w-]+)+/);
  if (!m) continue;
  const email = m[0].toLowerCase();
  if (/mailer-daemon|postmaster|no-?reply/.test(email)) continue;
  const corps = String(j.textPlain || j.text || j.textHtml || j.html || '').slice(0, 400).toLowerCase();
  const stop = /\b(stop|unsubscribe|désinscri|desinscri|pas intéressé|not interested)\b/.test(corps);
  out.push({ json: { email, stop, sujet: j.subject || '' } });
}
return out;
