# Préparation de la mise en ligne

La mise en ligne sera effectuée avec l'utilisateur. Aucun compte d'hébergement ni mot de passe n'est conservé dans le dépôt. Les étapes suivantes sont préparées pour Alwaysdata, compatible avec le serveur Node.js de l'API et MariaDB/MySQL. Confirmer les écrans et options qui seront réellement disponibles dans le compte avant d'exécuter les étapes.

## Architecture prévue sur l'offre Free

- Un seul site Node.js sert l'API Express et les fichiers statiques compilés de `client/dist` sous l'adresse `*.alwaysdata.net` du compte.
- Le client utilise l'API sur la même origine, sous `/api`; aucun domaine personnalisé ni seconde adresse n'est nécessaire.
- Une base MariaDB/MySQL hébergée stocke les catégories, spécialités et artisans.
- Le formulaire reste en mode de test (`CONTACT_MAIL_MODE=test`) et redirige vers une boîte fictive.
- `api/src/app.js` sert l'interface React en production et renvoie `index.html` pour les routes du navigateur. En développement, le client et l'API continuent de tourner séparément.

## Étapes de déploiement à faire ensemble

1. Ouvrir le compte d'hébergement et relever l'adresse `*.alwaysdata.net`. Ne pas partager le mot de passe dans le chat.
2. Créer la base et un utilisateur API en lecture seule (l'API actuelle ne modifie pas les données). Avec un utilisateur d'administration séparé, importer `database/scripts/creation.sql`, puis `database/scripts/alimentation.sql`. Le premier script supprime ses tables cibles avant de les recréer : utiliser une base de déploiement vide.
3. Modifier le site `*.alwaysdata.net` existant pour choisir le type Node.js. Utiliser le dossier du projet comme racine, sélectionner une version LTS compatible avec Node 20+ et démarrer avec `node api/src/server.js`. La plateforme fournit l'adresse et le port d'écoute; l'API lit `IP` et `PORT` (puis `HOST` et le port 3000 comme solutions de repli).
4. Configurer dans l'environnement privé de l'hébergeur `NODE_ENV=production`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, ainsi que les variables SMTP de test. Garder `CONTACT_MAIL_MODE=test`; ne pas activer le mode qui envoie aux adresses des artisans. `CLIENT_URL` reste réservé au développement local ou à une éventuelle architecture à origines séparées.
5. Construire le client avec `npm run build` depuis `client` (sans `VITE_API_URL`, le bundle de production utilise `/api`), puis publier `api`, les dépendances nécessaires et `client/dist` dans le dossier du projet hébergé. Les secrets restent dans les variables privées du site.
6. Installer les dépendances API dans `api` avec `npm install --omit=dev`, puis redémarrer le site Node. Vérifier `/api/health` et `/api/categories`.
7. Vérifier que les routes React directes (par exemple `/artisans` et `/mentions-legales`) servent l'application, et que les routes API inconnues renvoient une erreur JSON 404. Le repli React est géré par Express dans `api/src/app.js` en production.
8. Activer / vérifier HTTPS pour l'adresse `*.alwaysdata.net` et configurer une redirection HTTP vers HTTPS dans le panneau d'hébergement.
9. Parcourir en public l'accueil, la liste, une recherche, une catégorie, une fiche, les quatre pages légales et une adresse inconnue. Vérifier le formulaire avec des données fictives et confirmer qu'il arrive dans la boîte de test. Contrôler la console et l'onglet réseau.
10. Après confirmation de l'URL publique, ajouter les captures réalisées par l'utilisateur et cette URL au dossier final PDF. Réaliser le contrôle HTML du site publié sur les pages finales et documenter les résultats.

## Valeurs de connexion MariaDB

Alwaysdata indique actuellement l'hôte sous la forme `mysql-<compte>.alwaysdata.net`, port `3306`; les valeurs précises (nom de base et utilisateur) sont celles visibles dans le panneau du compte. Ne pas supposer que l'utilisateur ou le nom local `trouve_ton_artisan` est valable chez l'hébergeur.

## Références officielles consultées

- [Configurer une application Node.js](https://help.alwaysdata.com/en/docs/web-hosting/languages/nodejs/configuration/) — versions LTS, commande Node et adresse/port d'écoute.
- [Créer un site](https://help.alwaysdata.com/en/docs/web-hosting/sites/add-a-site/) — types de sites disponibles, dont Node.js et fichiers statiques.
- [Configurer les fichiers statiques](https://help.alwaysdata.com/en/docs/web-hosting/sites/http-servers/static-files/) — site Apache et fichiers `index.html` / `.htaccess`.
- [MariaDB / MySQL](https://help.alwaysdata.com/en/docs/web-hosting/databases/mariadb/) — versions, hôte et port SQL.
- [SSL/TLS](https://help.alwaysdata.com/en/docs/web-hosting/sites/ssl-tls/) — certificats et redirection HTTPS.
