# Veille sécurité

## 6 novembre 2026 — dépendances de l’API

- **Source locale :** `npm audit` dans `api/` signalait trois vulnérabilités (deux modérées, une élevée), dont Nodemailer et `uuid` transitif via Sequelize.
- **Nodemailer :** mise à jour ciblée vers 10.3.1. Le changelog officiel indique que Nodemailer 10 requiert Node.js 20 ou plus; le projet utilise Node 24. Les fonctions employées (`createTransport` et `sendMail`) sont conservées. [Changelog officiel](https://github.com/nodemailer/nodemailer/blob/master/CHANGELOG.md).
- **UUID :** override de Sequelize vers 11.1.1, version corrigée pour l’avis [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq). UUID 11 conserve CommonJS; UUID 12 le retire. [Documentation UUID](https://github.com/uuidjs/uuid/blob/main/README.md).
- **Action et résultat :** après `npm install`, `npm audit` a confirmé zéro vulnérabilité; l’arbre observé contient Nodemailer 10.3.1, Sequelize 6.37.8 et UUID 11.1.1 sous Sequelize. Aucune mise à jour forcée ni rétrogradation de Sequelize n’a été utilisée.
- **À surveiller :** refaire `npm audit` avant la remise et confirmer l’envoi du formulaire avec un transport SMTP de test.
