/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  david
 * Created: 24 sept. 2016
 */

DROP DATABASE IF EXISTS `soundlib`;
CREATE DATABASE `soundlib` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `soundlib`;

-- DROP USER 'djay'@'localhost';
CREATE USER 'djay'@'localhost' IDENTIFIED WITH mysql_native_password;
GRANT USAGE ON *.* TO 'djay'@'localhost' REQUIRE NONE;
SET PASSWORD FOR 'djay'@'localhost' = PASSWORD('demo');
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'djay'@'localhost' WITH GRANT OPTION;
