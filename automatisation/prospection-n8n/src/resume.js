// Résumé Telegram des envois du jour (un seul message)
const items = $('Préparer les e-mails').all().map((i) => i.json);
const envois = items.filter((i) => i.action === 'envoi');
const clos = items.filter((i) => i.action === 'cloture');
if (!envois.length && !clos.length) return [];
const lignes = ['📤 Prospection MyVisaDTV'];
if (envois.length) {
  lignes.push(`\n${envois.length} e-mail(s) envoyé(s) :`);
  for (const e of envois) lignes.push(`• ${e.nom} : ${e.statut}`);
}
if (clos.length) {
  lignes.push(`\nSans réponse après 3 e-mails (séquence arrêtée) :`);
  for (const c of clos) lignes.push(`• ${c.nom}`);
}
return [{ json: { text: lignes.join('\n') } }];
