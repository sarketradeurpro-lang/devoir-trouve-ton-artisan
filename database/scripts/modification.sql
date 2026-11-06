-- Trouve ton artisan - exemples d'évolution et de modification du schéma
-- À lancer après creation.sql et alimentation.sql dans la base de devoir.
-- L'ALTER TABLE ajoute un index utile à la recherche par ville.

ALTER TABLE artisan
    ADD INDEX idx_artisan_ville (ville);

-- Exemple UPDATE et DELETE annulés à la fin : les données d'essai restent intactes.
START TRANSACTION;

UPDATE artisan
SET note = 4.6
WHERE id = 1;

DELETE FROM artisan
WHERE id = 17;

ROLLBACK;
