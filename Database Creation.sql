SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema sd10_Icon_DB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sd10_Icon_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sd10_Icon_DB` DEFAULT CHARACTER SET latin1 ;
USE `sd10_Icon_DB` ;

-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`EQUIPMENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`EQUIPMENT` (
  `equipment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `brand` VARCHAR(45) NULL DEFAULT NULL,
  `model` VARCHAR(45) NULL DEFAULT NULL,
  `year` VARCHAR(4) NULL DEFAULT NULL,
  PRIMARY KEY (`equipment_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`LOCATION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`LOCATION` (
  `location_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `region` VARCHAR(45) NULL DEFAULT NULL,
  `country` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`location_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`USER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`USER` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NULL DEFAULT NULL,
  `last_name` VARCHAR(255) NULL DEFAULT NULL,
  `is_admin` TINYINT(1) NULL DEFAULT '0',
  `is_deleted` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`user_id`, `username`, `email`))
ENGINE = InnoDB
AUTO_INCREMENT = 43
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`MAINTENANCE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`MAINTENANCE` (
  `maintenance_id` INT(11) NOT NULL AUTO_INCREMENT,
  `start_date_time` DATETIME NOT NULL,
  `equipment_id` INT(11) NOT NULL,
  `location_id` INT(11) NOT NULL,
  `user_id` INT(11) NOT NULL,
  `is_complete` TINYINT(4) NOT NULL DEFAULT '0',
  `is_canceled` TINYINT(4) NOT NULL DEFAULT '0',
  `reason` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`maintenance_id`),
  INDEX `equipment_key_idx` (`equipment_id` ASC),
  INDEX `location_fk_idx` (`location_id` ASC),
  INDEX `user_fk_idx` (`user_id` ASC),
  CONSTRAINT `equipment_fk`
    FOREIGN KEY (`equipment_id`)
    REFERENCES `sd10_Icon_DB`.`EQUIPMENT` (`equipment_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `location_fk`
    FOREIGN KEY (`location_id`)
    REFERENCES `sd10_Icon_DB`.`LOCATION` (`location_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `user_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `sd10_Icon_DB`.`USER` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 200
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`MOCK_DATA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`MOCK_DATA` (
  `message_id` INT(11) NOT NULL AUTO_INCREMENT,
  `temp1` INT(11) NULL DEFAULT NULL,
  `temp2` INT(11) NULL DEFAULT NULL,
  `door1` INT(11) NULL DEFAULT NULL,
  `door2` INT(11) NULL DEFAULT NULL,
  `gate1` INT(11) NULL DEFAULT NULL,
  `gate2` INT(11) NULL DEFAULT NULL,
  `gate3` INT(11) NULL DEFAULT NULL,
  `gate4` INT(11) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `t1c` VARCHAR(45) NULL DEFAULT NULL,
  `t2c` VARCHAR(45) NULL DEFAULT NULL,
  `g1c` VARCHAR(45) NULL DEFAULT NULL,
  `g2c` VARCHAR(45) NULL DEFAULT NULL,
  `g3c` VARCHAR(45) NULL DEFAULT NULL,
  `g4c` VARCHAR(45) NULL DEFAULT NULL,
  `d1c` VARCHAR(45) NULL DEFAULT NULL,
  `d2c` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `sd10_Icon_DB`.`SENSOR_DATA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sd10_Icon_DB`.`SENSOR_DATA` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `sensor` VARCHAR(45) NULL DEFAULT NULL,
  `temp` FLOAT NULL DEFAULT NULL,
  `open` INT(11) NULL DEFAULT NULL,
  `color` VARCHAR(45) NULL DEFAULT NULL,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 327722
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
