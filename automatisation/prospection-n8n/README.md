# Prospection automatique MyVisaDTV (n8n + Notion)

Deux workflows n8n gèrent les e-mails de prospection des partenaires :

| Fichier | Ce qu'il fait |
|---|---|
| `1-envoi-quotidien.json` | Du lundi au vendredi à 9 h (heure de Bangkok), envoie le premier e-mail aux prospects dont la séquence est active, puis la relance 1 à J+5 et la relance 2 à J+12. Sept jours après la relance 2 sans réponse, le prospect passe en « Sans réponse ». Vous recevez un résumé sur Telegram, et une liste des prospects à contacter à la main (WhatsApp, Instagram, visite). |
| `2-reponses.json` | Surveille votre boîte de réception. Dès qu'un prospect répond, sa séquence s'arrête (statut « En discussion ») et vous recevez une alerte Telegram. S'il répond « stop », il passe en « Refus » et ne reçoit plus rien. |

La liste des prospects est dans Notion : **Prospects partenaires MyVisaDTV**
https://app.notion.com/p/41c615ef3da181d8af4af0cc259be233

## Installation (environ 20 minutes)

### 1. Donner à n8n l'accès à la base Notion
1. Sur https://www.notion.so/profile/integrations, créez une intégration interne « n8n MyVisaDTV » et copiez son jeton secret.
2. Dans n8n : **Credentials → New → Notion API**, collez le jeton.
3. Dans Notion, ouvrez la base **Prospects partenaires MyVisaDTV** → menu `•••` → **Connexions** → ajoutez « n8n MyVisaDTV ».

### 2. Ajouter votre boîte e-mail dans n8n
- **SMTP** (envoi) : hôte, port, utilisateur et mot de passe de votre fournisseur (OVH, Zoho, Hostinger…).
- **IMAP** (lecture des réponses) : la même boîte, pour détecter les réponses.

### 3. Importer les deux workflows
Dans n8n : **Workflows → Import from File**, puis choisissez chacun des deux fichiers `.json`. Ensuite, dans chaque workflow :
- Sélectionnez votre credential **Notion API** dans tous les nœuds « Notion : … ».
- Sélectionnez votre credential **SMTP** dans « Envoyer l'e-mail (SMTP) » et remplacez l'expéditeur `contact@myvisadtv.com` si besoin.
- Sélectionnez votre credential **IMAP** dans « Nouvel e-mail reçu (IMAP) ».
- Dans les nœuds Telegram, choisissez le credential déjà utilisé pour les alertes du test d'éligibilité et remplacez `VOTRE_CHAT_ID` par le même chat ID.

### 4. Régler les messages
Ouvrez le nœud **« Préparer les e-mails »**. En haut, le bloc `RÉGLAGES` contient :
- `commissionFr` / `commissionEn` : **obligatoire**. Tant que `[X €]` est là, le workflow s'arrête volontairement sans rien envoyer.
- `maxParJour` (20 par défaut), les délais des relances, votre prénom et votre WhatsApp.

Les trois e-mails (français et anglais) sont écrits juste en dessous et peuvent être modifiés librement. Les sources sont aussi dans `src/preparer.js`.

### 5. Tester, puis activer
1. Dans Notion, créez une fiche de test avec **votre propre adresse** en Email, « Séquence auto » cochée et « Prochaine action » à aujourd'hui.
2. Dans n8n, ouvrez le workflow 1 et cliquez sur **Test workflow** : vous devez recevoir l'e-mail, et la fiche doit passer en « Email 1 envoyé ».
3. Répondez à cet e-mail : le workflow 2 (une fois activé) doit passer la fiche en « En discussion » et vous alerter sur Telegram.
4. Supprimez la fiche de test, puis **activez** les deux workflows.

## Suivre qui a été contacté et relancé
Tout se suit dans Notion, mis à jour par n8n à chaque envoi et à chaque réponse :
- **Historique** (sur chaque fiche) : une ligne datée par e-mail envoyé, relance, réponse ou arrêt. Exemple : `19/11/2026 · Relance 1 envoyée à info@… : « … »`.
- **Date de réponse** : date de la première réponse du prospect.

Quatre vues sont prêtes, en onglets en haut de la base :
- **Pipeline** : tableau en colonnes par statut (À contacter, Email 1 envoyé, Relance 1, Relance 2, En discussion…).
- **Suivi des envois** : tous les prospects, les derniers contactés en haut, avec l'étape de la séquence, la prochaine relance et l'historique.
- **Calendrier des relances** : chaque prospect à la date de son prochain envoi ou de sa prochaine relance.
- **Réponses reçues** : les prospects qui ont répondu, les plus récents en haut.

Si vous contactez quelqu'un à la main (WhatsApp, visite), ajoutez vous-même une ligne dans **Historique** et mettez à jour **Statut** et **Prochaine action**.

## Utilisation au quotidien
- **Ajouter un prospect** : créez une fiche dans Notion. Pour l'inclure dans la séquence automatique, renseignez l'**Email**, cochez **Séquence auto** et mettez **Prochaine action** à la date du premier envoi.
- **Prospects sans e-mail** (WhatsApp, Instagram, visite) : laissez « Séquence auto » décochée et mettez une date dans « Prochaine action ». Ils apparaissent chaque matin dans la liste Telegram « À faire à la main ».
- **Mettre en pause un prospect** : décochez « Séquence auto ».
- Trois prospects sont déjà prêts à partir (Tiger Muay Thai, Bangtao, Alliance française de Bangkok). Leur premier e-mail partira au premier matin de semaine qui suit l'activation.

## CRM clients (base Notion « Clients » existante)
Votre CRM est la base Notion **Clients** de la page « Équipe d'agents IA — myvisaDTV » (https://app.notion.com/p/419615ef3da18149b530d5b19aa6b379).
- Les **fiches de renseignement** y créaient déjà une fiche, via l'agent « Agent 1 · Accueil & éligibilité ».
- Depuis le 18/11/2026, les **tests d'éligibilité** y arrivent aussi : le workflow n8n « myvisaDTV — Test d'éligibilité → Telegram » a une branche « CRM · … » en parallèle de l'alerte Telegram. Statut « Nouveau lead », source « Site », catégorie et verdict déduits des réponses, détail du test dans « Message initial ».
- Pas de doublon : un lead déjà connu (même e-mail, ou même téléphone) voit simplement le nouveau test ajouté à son « Message initial ».

## Délivrabilité et règles à respecter
- **Restez à 20 e-mails par jour ou moins** pendant le premier mois. Un envoi massif depuis une boîte neuve finit en spam et peut faire bloquer votre domaine.
- **Vérifiez que SPF, DKIM et DMARC sont configurés** pour myvisadtv.com chez votre hébergeur e-mail. Sans eux, une bonne partie des messages n'arrive pas.
- **Chaque e-mail permet de refuser** (« répondez stop ») et la demande est appliquée automatiquement. C'est exigé pour la prospection B2B (RGPD/CNIL en France, PDPA en Thaïlande).
- **N'écrivez qu'à des adresses professionnelles publiques** d'établissements, pas à des adresses personnelles.
- **WhatsApp et Instagram restent manuels.** Leur automatisation enfreint leurs conditions d'utilisation et entraîne la suspension du compte.
