-- Vérifications de cohérence pour Trouve ton artisan.
-- Exécuter après creation.sql et alimentation.sql dans la base de devoir.
-- Ce fichier affiche les résultats; il ne modifie aucune donnée.

SELECT 'categories (attendu 4)' AS controle, COUNT(*) AS obtenu FROM categorie
UNION ALL
SELECT 'specialites (attendu 15)', COUNT(*) FROM specialite
UNION ALL
SELECT 'artisans (attendu 17)', COUNT(*) FROM artisan
UNION ALL
SELECT 'artisans top (attendu 3)', COUNT(*) FROM artisan WHERE top = TRUE
UNION ALL
SELECT 'artisans sans site web (attendu 7)', COUNT(*) FROM artisan WHERE site_web IS NULL;

SELECT a.id, a.nom, a.note, s.nom AS specialite, c.nom AS categorie, a.ville, a.top
FROM artisan AS a
JOIN specialite AS s ON s.id = a.id_specialite
JOIN categorie AS c ON c.id = s.id_categorie
ORDER BY a.id;

-- Cas à vérifier manuellement sur une base de test distincte :
-- 1. une note < 0 ou > 5 doit être rejetée par chk_artisan_note;
-- 2. un nom de catégorie ou de spécialité déjà présent doit être rejeté par UNIQUE;
-- 3. la suppression d'une catégorie ou spécialité référencée doit être rejetée;
-- 4. site_web NULL doit rester accepté.
