-- CreateTable
CREATE TABLE `Galeri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
