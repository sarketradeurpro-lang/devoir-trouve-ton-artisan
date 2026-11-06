# Préparation de la mise en ligne

La mise en ligne sera effectuée avec l'utilisateur. Aucun compte d'hébergement ni mot de passe n'est conservé dans le dépôt. Les étapes suivantes sont préparées pour Alwaysdata, compatible avec le serveur Node.js de l'API et MariaDB/MySQL. Confirmer les écrans et options qui seront réellement disponibles dans le compte avant d'exécuter les étapes.

## Architecture prévue

- Un site statique sert `client/dist` en HTTPS.
- Un site Node.js sert l'API Express sous une adresse distincte.
- Une base MariaDB/MySQL hébergée stocke les catégories, spécialités et artisans.
- Le client compile l'adresse de l'API dans `VITE_API_URL` au moment du build.
- Le formulaire reste en mode de test (`CONTACT_MAIL_MODE=test`) et redirige vers une boîte fictive.

## Étapes de déploiement à faire ensemble

1. Ouvrir le compte d'hébergement et relever les noms d'adresses / sous-domaines du client et de l'API. Ne pas partager le mot de passe dans le chat.
2. Créer la base et un utilisateur API en lecture seule (l'API actuelle ne modifie pas les données). Avec un utilisateur d'administration séparé, importer `database/scripts/creation.sql`, puis `database/scripts/alimentation.sql`. Le premier script supprime ses tables cibles avant de les recréer : utiliser une base de déploiement vide.
3. Dans le site de type Node.js, sélectionner une version LTS compatible avec Node 20+, le répertoire `api` comme répertoire de travail et `node src/server.js` comme commande. La plateforme fournit l'adresse et le port d'écoute. L'API lit `IP` et `PORT` (puis `HOST` et le port 3000 comme solutions de repli).
4. Configurer dans l'environnement privé de l'hébergeur les paramètres `NODE_ENV=production`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `CLIENT_URL` (origine exacte du client) et les variables SMTP de test. Garder `CONTACT_MAIL_MODE=test`; ne pas activer le mode qui envoie aux adresses des artisans.
5. Installer les dépendances API dans `api` avec `npm install --omit=dev`, puis redémarrer le site Node. Vérifier `/api/health` et `/api/categories` avant de mettre le client en ligne.
6. Construire le client avec `VITE_API_URL=https://<adresse-api>/api npm run build` depuis `client`, puis publier le contenu de `client/dist` dans le répertoire du site statique. Vite intègre cette variable dans les fichiers générés; elle ne doit contenir aucun secret.
7. Vérifier que les routes React directes (par exemple `/artisans` et `/mentions-legales`) servent `index.html`. Le fichier `client/public/.htaccess` est copié dans `dist` par Vite et configure cette reprise des routes sous Apache.
8. Activer / vérifier HTTPS pour les deux adresses et configurer une redirection HTTP vers HTTPS dans le panneau d'hébergement.
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
