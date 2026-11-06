-- Trouve ton artisan - données d'essai issues de data.xlsx.
-- Les e-mails viennent du jeu fourni : ne pas envoyer de vrais messages pendant les essais.
SET NAMES utf8mb4;
START TRANSACTION;

INSERT INTO categorie (id, nom) VALUES
    (1, 'Alimentation'),
    (2, 'Bâtiment'),
    (3, 'Fabrication'),
    (4, 'Services');

INSERT INTO specialite (id, nom, id_categorie) VALUES
    (1, 'Boucher', 1),
    (2, 'Boulanger', 1),
    (3, 'Chocolatier', 1),
    (4, 'Traiteur', 1),
    (5, 'Chauffagiste', 2),
    (6, 'Electricien', 2),
    (7, 'Menuisier', 2),
    (8, 'Plombier', 2),
    (9, 'Bijoutier', 3),
    (10, 'Couturier', 3),
    (11, 'Ferronier', 3),
    (12, 'Coiffeur', 4),
    (13, 'Fleuriste', 4),
    (14, 'Toiletteur', 4),
    (15, 'Webdesign', 4);

INSERT INTO artisan (id, nom, note, ville, a_propos, email, site_web, image, top, id_specialite) VALUES
(1, 'Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan01@example.test', NULL, NULL, FALSE, 1),
(2, 'Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan02@example.test', NULL, NULL, TRUE, 2),
(3, 'Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan03@example.test', 'https://chocolaterie-labbe.fr', NULL, TRUE, 3),
(4, 'Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan04@example.test', 'https://truchon-traiteur.fr', NULL, FALSE, 4),
(5, 'Orville Salmons', 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan05@example.test', NULL, NULL, TRUE, 5),
(6, 'Mont Blanc Eléctricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan06@example.test', 'https://mont-blanc-electricite.com', NULL, FALSE, 6),
(7, 'Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan07@example.test', 'https://boutot-menuiserie.com', NULL, FALSE, 7),
(8, 'Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan08@example.test', 'https://plomberie-bellemare.com', NULL, FALSE, 8),
(9, 'Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan09@example.test', NULL, NULL, FALSE, 9),
(10, 'Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan10@example.test', 'https://lecuyer-couture.com', NULL, FALSE, 10),
(11, 'Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan11@example.test', NULL, NULL, FALSE, 11),
(12, 'Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan12@example.test', NULL, NULL, FALSE, 12),
(13, 'Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan13@example.test', 'https://coiffure-leala-chambery.fr', NULL, FALSE, 12),
(14, 'C''est sup''hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan14@example.test', 'https://sup-hair.fr', NULL, FALSE, 12),
(15, 'Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan15@example.test', 'https://le-monde-des-fleurs-annonay.fr', NULL, FALSE, 13),
(16, 'Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan16@example.test', NULL, NULL, FALSE, 14),
(17, 'CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'artisan17@example.test', 'https://cm-graphisme.com', NULL, FALSE, 15);

COMMIT;
