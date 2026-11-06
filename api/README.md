# API — Trouve ton artisan

API Node.js/Express/Sequelize connectée au schéma MySQL existant (`categorie`, `specialite`, `artisan`). Elle ne crée ni ne modifie les tables au démarrage.

## Démarrage local

Dans PowerShell, depuis le dossier `api` :

```powershell
Copy-Item .env.example .env
npm install
```

Ouvre `api/.env` et vérifie la connexion MySQL. En local, configure un serveur SMTP de test (Ethereal ou Mailtrap) et `CONTACT_TEST_RECIPIENT`; le mode `CONTACT_MAIL_MODE=test` est le mode par défaut et redirige tous les messages vers cette boîte, jamais vers les adresses du tableur.

Pour une mise en production, configure un SMTP avec TLS adapté et définis explicitement `CONTACT_MAIL_MODE=artisan`. Dans ce mode, les demandes sont envoyées à l’adresse e-mail enregistrée pour l’artisan choisi. N’active ce mode qu’après avoir vérifié les adresses et la configuration de production.

Puis démarre l’API :

```powershell
npm run dev
```

Elle écoute sur `http://localhost:3000`. Vérification simple : `http://localhost:3000/api/health`.

## Routes

| Méthode | Chemin | Résultat |
|---|---|---|
| GET | `/api/health` | État de l’API |
| GET | `/api/categories` | Catégories avec leurs spécialités |
| GET | `/api/artisans?categorie=2` | Artisans d’une catégorie (ID ou nom) |
| GET | `/api/artisans?q=menuisier` | Recherche par nom d’artisan |
| GET | `/api/artisans/top` | Artisans marqués Top |
| GET | `/api/artisans/:id` | Fiche publique d’un artisan |
| POST | `/api/artisans/:id/contact` | Validation et transmission à la boîte SMTP de test |

Le corps du contact est JSON : `{"nom":"…","email":"…","objet":"…","message":"…"}`. Les réponses publiques des artisans ne contiennent pas leur adresse e-mail.

## Réponses d’erreur

Les entrées incorrectes renvoient `400`, les identifiants absents `404`, une configuration SMTP manquante `503`; les erreurs internes renvoient un message générique `500`. Les détails techniques sont consignés côté serveur seulement.
