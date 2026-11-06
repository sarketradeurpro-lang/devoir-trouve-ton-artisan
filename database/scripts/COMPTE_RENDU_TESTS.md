# Vérification SQL — Trouve ton artisan

## Portée et exécution

La version actuelle des scripts suit le modèle à trois tables du plan maître et reprend les lignes de `fichiers-à-joindre-au-devoir/data.xlsx`. Ils ont été exécutés par l'utilisateur dans MySQL 8.4.7, le 6 novembre 2026, dans la base locale `trouve_ton_artisan`.

## Procédure

Dans une base de développement ou de test dédiée, exécuter dans l'ordre :

1. `creation.sql` (supprime et recrée les tables `artisan`, `specialite`, `categorie`);
2. `alimentation.sql`;
3. `test_scripts.sql`.

Ne pas exécuter `creation.sql` sur une base contenant des données à conserver.

## Résultats observés

| Contrôle | Attendu | Observé |
|---|---:|---:|
| Catégories | 4 | 4 |
| Spécialités | 15 | 15 |
| Artisans | 17 | 17 |
| Artisans Top | 3 | 3 |
| Artisans sans site web | 7 | 7 |

Import constaté : 4 lignes catégorie, 15 lignes spécialité et 17 lignes artisan; zéro doublon et zéro avertissement.

Le 6 novembre 2026, l'utilisateur a exécuté `test_scripts.sql` après l'import. Les cinq comptes et la liste des 17 artisans ont été affichés; les nombres correspondent aux attendus.

Contrôles supplémentaires à réaliser dans la base de test : valeur de note hors de 0–5 refusée; doublon de catégorie/spécialité refusé; suppression d'une ligne parente référencée refusée; `site_web = NULL` accepté.

## Contrôles restant à faire

Le 6 novembre 2026, insertion d'une note 5,5 rejetée avec `ERROR 3819` par `chk_artisan_note`; insertion de la catégorie en doublon rejetée avec `ERROR 1062` par `uq_categorie_nom`; insertion de la spécialité en doublon rejetée avec `ERROR 1062` par `uq_specialite_nom`. La suppression de la catégorie référencée `id=1` a été rejetée avec `ERROR 1451` par `fk_specialite_categorie`; après `ROLLBACK`, la catégorie était toujours présente et le total restait à 4. L'insertion d'un artisan de contrôle avec `site_web = NULL` a réussi dans une transaction, puis a été annulée; le test n'existe plus et le total des artisans est resté à 17.

Les e-mails du jeu fourni ressemblent à de vraies adresses : utiliser un destinataire de test pour toute fonctionnalité d'envoi.
