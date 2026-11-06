# MLD — Trouve ton artisan

Le modèle logique relationnel contient trois tables. `ville` reste une colonne de `ARTISAN`, conformément au jeu fourni et au plan maître.

```text
CATEGORIE (
  id             INT, PK
  nom            VARCHAR(50), UNIQUE, NOT NULL
)

SPECIALITE (
  id             INT, PK
  nom            VARCHAR(50), UNIQUE, NOT NULL
  id_categorie   INT, FK -> CATEGORIE.id, NOT NULL
)

ARTISAN (
  id             INT, PK
  nom            VARCHAR(100), NOT NULL
  note           DECIMAL(2,1), NOT NULL, 0 <= note <= 5
  ville          VARCHAR(100), NOT NULL
  a_propos       TEXT, NOT NULL
  email          VARCHAR(255), NOT NULL
  site_web       VARCHAR(255), NULL
  image          VARCHAR(255), NULL
  top            BOOLEAN, NOT NULL, DEFAULT FALSE
  id_specialite  INT, FK -> SPECIALITE.id, NOT NULL
)
```

Les clés étrangères utilisent `ON DELETE RESTRICT` et `ON UPDATE CASCADE`. Les noms des catégories et spécialités sont uniques. Les trois artisans du mois sont signalés par `top = TRUE` dans le jeu initial; la limite de trois est une règle du jeu d'essai, pas une contrainte SQL générale.

Le modèle physique correspondant est décrit dans [`mpd.md`](mpd.md) et implémenté dans [`creation.sql`](../../database/scripts/creation.sql).
