-- AlterTable
ALTER TABLE `realisations` MODIFY `image_avant` LONGTEXT NULL,
    MODIFY `image_apres` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `services` MODIFY `image` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `valeurs` MODIFY `contenu` LONGTEXT NULL;
