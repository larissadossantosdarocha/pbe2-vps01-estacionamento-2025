-- CreateTable
CREATE TABLE `Automovel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NULL,
    `ano` INTEGER NULL,
    `proprietario` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `marca` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Automovel_placa_key`(`placa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Estadia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `automovelId` INTEGER NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saida` DATETIME(3) NULL,
    `valorHora` DECIMAL(65, 30) NOT NULL,
    `valorTotal` DECIMAL(65, 30) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estadia` ADD CONSTRAINT `Estadia_automovelId_fkey` FOREIGN KEY (`automovelId`) REFERENCES `Automovel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
