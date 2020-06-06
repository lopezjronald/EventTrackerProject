-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tradedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tradedb` ;

-- -----------------------------------------------------
-- Schema tradedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tradedb` DEFAULT CHARACTER SET utf8 ;
USE `tradedb` ;

-- -----------------------------------------------------
-- Table `trade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `trade` ;

CREATE TABLE IF NOT EXISTS `trade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `reference_id` INT NOT NULL,
  `trade_date` VARCHAR(45) NULL,
  `time_of_trade` VARCHAR(45) NULL,
  `underlying` VARCHAR(45) NULL,
  `expiration_date` VARCHAR(45) NULL,
  `strike_price` DOUBLE NULL,
  `trade_type` VARCHAR(45) NULL,
  `open_interest` INT NULL,
  `ind` VARCHAR(45) NULL,
  `exchange_code` VARCHAR(45) NULL,
  `spread` DOUBLE NULL,
  `premium_price` DOUBLE NULL,
  `size` INT NULL,
  `bid_size` INT NULL,
  `bid_price` DOUBLE NULL,
  `ask_price` DOUBLE NULL,
  `ask_size` INT NULL,
  `edge` VARCHAR(45) NULL,
  `lean_size` INT NULL,
  `size_ratio` DOUBLE NULL,
  `delta` DOUBLE NULL,
  `theta` DOUBLE NULL,
  `vega` DOUBLE NULL,
  `gamma` DOUBLE NULL,
  `sigma` DOUBLE NULL,
  `rho` DOUBLE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO tradeuser@localhost;
 DROP USER tradeuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'tradeuser'@'localhost' IDENTIFIED BY 'tradeuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'tradeuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
