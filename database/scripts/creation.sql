-- Trouve ton artisan - création du schéma MySQL
-- Schéma conforme au plan maître : catégorie -> spécialité -> artisan.
-- Attention : ce script supprime les tables existantes de même nom.
-- À exécuter dans la base de devoir choisie (ex. trouve_ton_artisan).

SET NAMES utf8mb4;

DROP TABLE IF EXISTS artisan;
DROP TABLE IF EXISTS specialite;
DROP TABLE IF EXISTS categorie;

CREATE TABLE categorie (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_categorie_nom UNIQUE (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE specialite (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL,
    id_categorie INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uq_specialite_nom UNIQUE (nom),
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (id_categorie) REFERENCES categorie(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE artisan (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    note DECIMAL(2,1) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    site_web VARCHAR(255) NULL,
    image VARCHAR(255) NULL,
    top BOOLEAN NOT NULL DEFAULT FALSE,
    id_specialite INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT chk_artisan_note CHECK (note >= 0 AND note <= 5),
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (id_specialite) REFERENCES specialite(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    INDEX idx_artisan_nom (nom),
    INDEX idx_artisan_top (top),
    INDEX idx_artisan_specialite (id_specialite)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
