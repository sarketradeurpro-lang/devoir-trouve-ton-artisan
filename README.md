# Trouve ton artisan

Projet de devoir bilan : créer une plateforme qui aide les particuliers à trouver un artisan en Auvergne-Rhône-Alpes et à lui demander des renseignements, prestations ou tarifs.

## État du projet

Le client React, les scripts SQL et l'API Express/Sequelize sont présents et ont été lancés localement. Les principales routes API et le parcours principal du site ont été vérifiés avec MySQL. Les tests de contraintes SQL, l'envoi par boîte SMTP de test, les preuves visuelles, les maquettes Figma et le PDF final de remise restent à compléter.

## Technologies imposées

- Maquettes : Figma
- Frontend : React, Bootstrap, Sass
- API : Node.js, Express, Sequelize
- Base de données : MySQL ou MariaDB
- Outils : VS Code, Git, GitHub

## Organisation prévue

```text
api/                 API Express et accès Sequelize
client/              Interface React
database/scripts/    Création, modification, alimentation et vérification SQL
docs/figma/          Lien et captures des maquettes
docs/schemas/        MCD, MLD et MPD
docs/tests/          Cas de test et résultats observés
docs/captures/       Preuves de validation et captures du site
fichiers-à-joindre-au-devoir/  Données et ressources graphiques fournies
```

## Données de départ

`fichiers-à-joindre-au-devoir/data.xlsx` fournit 17 artisans, 4 catégories, 15 spécialités et 3 artisans marqués « Top ». Le fichier contient des coordonnées e-mail qui ressemblent à de vraies adresses. Pour les essais de contact, utiliser une boîte de test et ne pas envoyer de message à ces adresses.

Dans `database/scripts/alimentation.sql`, les 17 e-mails sont remplacés par des adresses réservées en `.test` avant partage public, afin d'éviter de publier des coordonnées d'apparence réelle. Le tableur source reste local au dossier de travail et n'est pas destiné au dépôt public. Remplace ces e-mails par des coordonnées vérifiées avant une véritable mise en service.

## Base de données

Créer une base de développement MySQL/MariaDB, puis exécuter dans l'ordre `database/scripts/creation.sql` et `database/scripts/alimentation.sql`. **Le script de création supprime les tables `artisan`, `specialite` et `categorie` existantes avant de les recréer.** Ne pas l'exécuter sur une base dont les données doivent être conservées.

Le schéma contient trois tables : `categorie`, `specialite` et `artisan`; la ville est un champ d'artisan conformément au modèle du devoir. Les instructions de création, modification et alimentation sont dans `database/scripts/`.

## Client React

Depuis un terminal ouvert dans `client/` :

```powershell
npm install
npm run dev
```

Le client récupère les catégories, les artisans du mois, les listes filtrées/recherchées et les fiches depuis l'API. Son formulaire appelle aussi la route de contact. En local, renseigne un SMTP de test et garde `CONTACT_MAIL_MODE=test` dans `api/.env`; en production, `CONTACT_MAIL_MODE=artisan` envoie vers l'adresse enregistrée pour l'artisan.

## API Node.js

Depuis PowerShell, ouvre un second terminal dans `api/` (garde le terminal du client ouvert), puis prépare et lance l'API en suivant [api/README.md](api/README.md). Les variables de connexion et SMTP de test vont dans `api/.env`; ne copie aucun secret dans Git. Le démarrage de l'API n'efface ni ne recrée les tables SQL.

## Configuration et sécurité

Ne jamais committer un fichier `.env`, mot de passe, clé ou identifiant réel. Utiliser `api/.env.example` comme modèle, puis fournir les valeurs locales dans `api/.env` (ignoré par Git). Les paramètres d'e-mail des tests doivent pointer vers un service ou une boîte de test.

## Sources et suivi

Les consignes complètes sont dans `devoir objectif.odt`, `téléchargement (2).pdf` (brief), `téléchargement.pdf` (guide GitHub), `plan_maitre_trouve_ton_artisan.pdf` et `maquettes_trouve_ton_artisan.pdf`. Le résumé courant est dans `MEMOIRE-DEVOIR.md`; le suivi s'effectue par jalons selon `.agents/skills/suivi-artisan/SKILL.md`.
