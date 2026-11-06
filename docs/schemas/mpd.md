# MPD — Trouve ton artisan

Base cible : MySQL ou MariaDB, moteur InnoDB, encodage `utf8mb4`. Les scripts exécutables sont dans `database/scripts/`.

| Table | Champ | Type | Contraintes |
|---|---|---|---|
| `categorie` | `id` | `INT UNSIGNED` | clé primaire, auto-incrément |
| `categorie` | `nom` | `VARCHAR(50)` | non nul, unique |
| `specialite` | `id` | `INT UNSIGNED` | clé primaire, auto-incrément |
| `specialite` | `nom` | `VARCHAR(50)` | non nul, unique |
| `specialite` | `id_categorie` | `INT UNSIGNED` | clé étrangère vers `categorie.id`, non nul |
| `artisan` | `id` | `INT UNSIGNED` | clé primaire, auto-incrément |
| `artisan` | `nom` | `VARCHAR(100)` | non nul |
| `artisan` | `note` | `DECIMAL(2,1)` | non nul, CHECK entre 0 et 5 |
| `artisan` | `ville` | `VARCHAR(100)` | non nul |
| `artisan` | `a_propos` | `TEXT` | non nul |
| `artisan` | `email` | `VARCHAR(255)` | non nul |
| `artisan` | `site_web` | `VARCHAR(255)` | nullable |
| `artisan` | `image` | `VARCHAR(255)` | nullable, absent du tableur initial |
| `artisan` | `top` | `BOOLEAN` | non nul, défaut `FALSE` |
| `artisan` | `id_specialite` | `INT UNSIGNED` | clé étrangère vers `specialite.id`, non nul |

Les relations sont protégées contre la suppression des lignes parentes déjà référencées (`ON DELETE RESTRICT`) et suivent les changements d'identifiant (`ON UPDATE CASCADE`). Des index couvrent le nom, le statut `top` et la clé étrangère de spécialité; l'index de ville est ajouté dans `modification.sql`.

Pour (re)créer le schéma, exécuter `creation.sql`, puis `alimentation.sql`. Attention : `creation.sql` supprime les trois tables existantes de même nom avant de les recréer. `modification.sql` est un exemple d'évolution et annule ses changements de données avec `ROLLBACK`.
