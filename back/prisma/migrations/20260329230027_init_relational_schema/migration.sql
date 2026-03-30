-- CreateTable
CREATE TABLE `pages` (
    `id_page` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_page` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `pages_slug_key`(`slug`),
    PRIMARY KEY (`id_page`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id_section` INTEGER NOT NULL AUTO_INCREMENT,
    `id_page` INTEGER NOT NULL,
    `nom_section` VARCHAR(100) NOT NULL,
    `ordre` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id_section`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `champs` (
    `id_champ` INTEGER NOT NULL AUTO_INCREMENT,
    `id_section` INTEGER NOT NULL,
    `nom_champ` VARCHAR(100) NOT NULL,
    `type_champ` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_champ`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `blocs` (
    `id_bloc` INTEGER NOT NULL AUTO_INCREMENT,
    `id_section` INTEGER NOT NULL,
    `ordre` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id_bloc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `valeurs` (
    `id_valeur` INTEGER NOT NULL AUTO_INCREMENT,
    `id_champ` INTEGER NOT NULL,
    `id_bloc` INTEGER NULL,
    `contenu` TEXT NULL,

    PRIMARY KEY (`id_valeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id_service` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `image` VARCHAR(255) NULL,
    `details` TEXT NULL,

    PRIMARY KEY (`id_service`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id_categorie` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id_categorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `realisations` (
    `id_realisation` INTEGER NOT NULL AUTO_INCREMENT,
    `titre` VARCHAR(150) NOT NULL,
    `description_projet` TEXT NULL,
    `description_client` TEXT NULL,
    `image_avant` VARCHAR(255) NULL,
    `image_apres` VARCHAR(255) NULL,
    `id_categorie` INTEGER NULL,
    `date_realisation` DATE NULL,

    PRIMARY KEY (`id_realisation`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admins` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `mot_de_passe_hash` TEXT NOT NULL,
    `role` VARCHAR(50) NULL DEFAULT 'admin',
    `date_creation` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `admins_email_key`(`email`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demandes_devis` (
    `id_demande` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_client` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `telephone` VARCHAR(50) NULL,
    `service_demande` VARCHAR(150) NULL,
    `message` TEXT NULL,
    `date_demande` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `statut` VARCHAR(50) NULL DEFAULT 'en_attente',

    PRIMARY KEY (`id_demande`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_id_page_fkey` FOREIGN KEY (`id_page`) REFERENCES `pages`(`id_page`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `champs` ADD CONSTRAINT `champs_id_section_fkey` FOREIGN KEY (`id_section`) REFERENCES `sections`(`id_section`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blocs` ADD CONSTRAINT `blocs_id_section_fkey` FOREIGN KEY (`id_section`) REFERENCES `sections`(`id_section`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valeurs` ADD CONSTRAINT `valeurs_id_champ_fkey` FOREIGN KEY (`id_champ`) REFERENCES `champs`(`id_champ`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valeurs` ADD CONSTRAINT `valeurs_id_bloc_fkey` FOREIGN KEY (`id_bloc`) REFERENCES `blocs`(`id_bloc`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `realisations` ADD CONSTRAINT `realisations_id_categorie_fkey` FOREIGN KEY (`id_categorie`) REFERENCES `categories`(`id_categorie`) ON DELETE SET NULL ON UPDATE CASCADE;
