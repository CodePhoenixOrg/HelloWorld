-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: localhost    Database: soundlib
-- ------------------------------------------------------
-- Server version	5.7.15-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artist` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `art_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`art_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist` (
  `pls_id` int(11) NOT NULL AUTO_INCREMENT,
  `pls_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `usr_id` int(11) NOT NULL,
  PRIMARY KEY (`pls_id`),
  KEY `fk_playlist_user_idx` (`usr_id`),
  CONSTRAINT `fk_playlist_user` FOREIGN KEY (`usr_id`) REFERENCES `user` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `playlist_content`
--

DROP TABLE IF EXISTS `playlist_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `playlist_content` (
  `plc_id` int(11) NOT NULL AUTO_INCREMENT,
  `pls_id` int(11) NOT NULL,
  `trk_id` int(11) NOT NULL,
  PRIMARY KEY (`plc_id`),
  KEY `fk_playlist_content_track_idx` (`trk_id`),
  KEY `fk_playlist_content_playlist_idx` (`pls_id`),
  CONSTRAINT `fk_playlist_content_playlist` FOREIGN KEY (`pls_id`) REFERENCES `playlist` (`pls_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_content_track` FOREIGN KEY (`trk_id`) REFERENCES `track` (`trk_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=130 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `track`
--

DROP TABLE IF EXISTS `track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `track` (
  `trk_id` int(11) NOT NULL AUTO_INCREMENT,
  `trk_title` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `trk_duration` int(11) DEFAULT NULL,
  `art_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`trk_id`),
  KEY `fk_track_artist_idx` (`art_id`),
  CONSTRAINT `fk_track_artist` FOREIGN KEY (`art_id`) REFERENCES `artist` (`art_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `usr_email` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-26  0:40:43
