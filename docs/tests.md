# Vérifications du projet

Mis à jour le 6 novembre 2026. Les résultats ci-dessous sont ceux observés pendant le travail local; ils ne constituent pas une preuve de validation externe.

## Base SQL

| Vérification | Résultat observé |
|---|---|
| Import dans MySQL 8.4.7 | Réussi selon la sortie fournie par l'utilisateur |
| `test_scripts.sql` en lecture seule | Exécuté le 6 novembre; comptes et liste conformes |
| Catégories | 4 |
| Spécialités | 15 |
| Artisans | 17 |
| Artisans Top | 3 |
| Artisans sans site web | 7 |
| Contraintes SQL | Note, doublons et suppression référencée rejetés; `site_web = NULL` accepté |

Le 6 novembre, l'insertion d'un artisan avec une note de 5,5 a été rejetée par MySQL avec `ERROR 3819`, contrainte `chk_artisan_note`; les insertions en doublon de la catégorie « Alimentation » et de la spécialité « Boucher » ont été rejetées avec `ERROR 1062` par `uq_categorie_nom` et `uq_specialite_nom`. La suppression de la catégorie référencée `id=1` a été refusée avec `ERROR 1451` par `fk_specialite_categorie`; après rollback, `id=1` était toujours présente et il y avait toujours 4 catégories. Enfin, une insertion de contrôle avec `site_web = NULL` a réussi dans une transaction, a montré `NULL`, puis a été annulée; aucune ligne de test ne reste et le total reste de 17 artisans.

## API

| Vérification | Résultat observé |
|---|---|
| Démarrage et connexion MySQL | « Connexion MySQL établie »; serveur disponible sur le port 3000 |
| `GET /api/health` après mise à jour des dépendances | `{"status":"ok"}` |
| `GET /api/categories` après mise à jour | 4 catégories avec 15 spécialités |
| `GET /api/artisans` | 17 artisans; les e-mails ne sont pas renvoyés dans les objets publics |
| `GET /api/artisans?categorie=2` | 4 artisans de Bâtiment |
| `GET /api/artisans?q=Mont%20Blanc` | Mont Blanc Eléctricité |
| `GET /api/artisans/top` | 3 artisans |
| `GET /api/artisans/6` | Fiche de Mont Blanc Eléctricité |
| `GET /api/artisans/999` | 404, « Artisan introuvable. » |
| `GET /api/artisans/abc` | 400, « Identifiant invalide. » |
| Contact avec champs invalides | 400, erreurs de validation |
| Contact vers un ID absent | 404, « Artisan introuvable. » |
| Contact valide sans SMTP de test configuré | 503, service indisponible; aucun e-mail envoyé |
| Envoi réussi vers une boîte de test | Réussi en local le 6 novembre 2026 avec une boîte Ethereal; réponse HTTP 202, message de test fictif, aucun e-mail envoyé à un artisan réel |

Le script public `database/scripts/alimentation.sql` remplace les coordonnées e-mail du tableur par des adresses réservées en `.test`. La base locale déjà alimentée n'a pas été réinitialisée; la configuration locale du contact reste en mode `test` vers Ethereal.

## Interface React

| Vérification manuelle | Résultat observé par l'utilisateur |
|---|---|
| Accueil et artisans du mois | Fonctionne; 3 cartes affichées |
| Liste des artisans | Fonctionne après correction d'un rendu React des catégories |
| Recherche « Mont Blanc » | Fonctionne; l'artisan attendu est trouvé |
| Filtre « Bâtiment » | Fonctionne |
| Fiche artisan | Affiche les informations provenant de l'API et le formulaire |
| Formulaire sans SMTP | Affiche que le service est indisponible et que le message n'a pas été envoyé |
| Route inconnue | Affiche la page 404 |
| Route `/mentions-legales` | Ouverte et fonctionnelle selon vérification manuelle |
| Route `/cookies` | Ouverte et fonctionnelle selon vérification manuelle |
| Route `/donnees-personnelles` | Ouverte et fonctionnelle selon vérification manuelle |
| Route `/accessibilite` | Ouverte et fonctionnelle selon vérification manuelle |
| Vues mobile ~360 px, tablette 768 px, ordinateur 1280 px | Fonctionnent selon vérification manuelle |
| Navigation au clavier avec Tab et focus visible | Fonctionne selon vérification manuelle |
| Focus après ajustement du contraste | Recontrôlé par l'utilisateur; reste visible |
| Compilation `npm run build` | Réussie; avertissements de dépréciation Sass/Bootstrap et avertissements de bundling React Router |

## Dépendances et sécurité

Le 6 novembre 2026, le premier `npm audit` API signalait trois vulnérabilités (deux modérées, une élevée). Nodemailer a été mis à jour vers 10.3.1; l'override Sequelize est limité à `uuid@11.1.1`. Après `npm install`, `npm audit` a confirmé zéro vulnérabilité et `npm ls` a montré Nodemailer 10.3.1, Sequelize 6.37.8 et UUID 11.1.1.

## Contrastes (vérification ciblée)

Calculs de contraste sur les couleurs utilisées pour les éléments principaux, fond blanc/pâle : le bleu `#0074c7` atteint 4,86:1 sur blanc et 4,53:1 sur `#f1f8fc`; le texte blanc sur le bouton bleu atteint 4,86:1. Le texte d'erreur `#7d1d20` sur `#fff1f1` atteint 9,24:1. Le contour clavier et les bordures de champs initialement pâles ont été remplacés par bleu foncé `#00497c` (9,36:1 sur blanc) et gris `#7a8998` (3,58:1 sur blanc; 3,34:1 sur fond pâle). Après ces ajustements, `npm run build` a réussi; les avertissements Sass/Bootstrap et React Router persistent. Ces calculs ciblés ne remplacent pas un audit visuel et clavier complet.

## Validateurs W3C (contrôle ciblé)

Contrôle effectué le 6 novembre 2026 avec les validateurs officiels du W3C. Le shell statique `client/index.html` a retourné 0 erreur et 6 messages non bloquants. La feuille des styles propres au projet (partie personnalisée de `client/src/styles/main.scss`, sans l'import Bootstrap) a été acceptée par le validateur CSS3 avec 0 erreur et 0 avertissement. La feuille compilée complète incluant Bootstrap a retourné 24 erreurs et 133 avertissements selon ce profil CSS3; les erreurs observées comprennent des propriétés et sélecteurs de Bootstrap que ce profil du validateur ne reconnaît pas. Ce résultat combiné n'est donc pas présenté comme une validation W3C réussie. Le HTML vérifié est le shell avant rendu React : les pages hydratées et les contrôles d'accessibilité complets restent à auditer.

La procédure pour vérifier le DOM React rendu, page par page, est dans [`validation-react-w3c.md`](validation-react-w3c.md). Les résultats initiaux ci-dessus ne portent pas sur ces pages hydratées.

### Vérification reproductible au 6 novembre 2026

- `client/`: `npm run build` terminé avec succès (Vite 8.3.6). Avertissements de dépréciation Sass/Bootstrap et directives React Router seulement.
- `client/`: `npm audit` — 0 vulnérabilité.
- `api/`: `npm audit` — 0 vulnérabilité.
- Le fallback Apache SPA `client/public/.htaccess` a été ajouté pour que les routes React profondes renvoient `index.html`; il sera à vérifier sur le serveur réel après déploiement.

## Ajustements préparatoires à l'hébergement et images manquantes

- L'API écoute maintenant sur `PORT` et `IP` fournis par l'hébergeur, avec `HOST` puis `0.0.0.0` en solutions de repli. `node --check api/src/server.js` a terminé sans erreur.
- Le jeu de données ne fournit pas de photos d'artisans. Les fiches affichent désormais une illustration SVG locale avec un texte alternatif qui précise qu'il s'agit d'une image de remplacement; une vraie image de la base reste prioritaire si elle est ajoutée. La page 404 utilise une illustration SVG locale et un texte alternatif.
- `npm run build` côté client a réussi après ces changements. Restent les avertissements non bloquants Sass/Bootstrap et React Router.
