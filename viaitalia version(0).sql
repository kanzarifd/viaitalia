-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 04 mai 2026 à 03:25
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `viaitalia`
--

-- --------------------------------------------------------

--
-- Structure de la table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `type` enum('INFO','SUCCESS','WARNING','URGENT') NOT NULL DEFAULT 'INFO',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `link` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `announcement`
--

INSERT INTO `announcement` (`id`, `title`, `content`, `type`, `isActive`, `link`, `createdAt`, `updatedAt`) VALUES
(1, 'dd', 'ddd', 'INFO', 1, 'ddd', '2026-04-26 15:37:35.445', '2026-04-26 15:37:35.445'),
(2, 'Bourse d’études en Italie 2026', 'L’Université de Bologne annonce l’ouverture des candidatures pour les bourses d’études 2026.\n\nLes étudiants internationaux peuvent postuler pour des programmes en licence et master.\n\nDate lim', 'INFO', 1, 'https://studyinitaly.esteri.it', '2026-04-26 16:54:46.661', '2026-04-26 16:54:46.661'),
(3, 'aaaaaaaaaaaaa', 'aaaaaaaa', 'URGENT', 1, NULL, '2026-04-29 21:58:01.839', '2026-04-29 21:58:01.839');

-- --------------------------------------------------------

--
-- Structure de la table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `date` datetime(3) NOT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `etat` enum('PRESENTIEL','EN_LIGNE') NOT NULL DEFAULT 'PRESENTIEL',
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `slotId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `appointment`
--

INSERT INTO `appointment` (`id`, `type`, `date`, `status`, `etat`, `userId`, `createdAt`, `slotId`) VALUES
(51, 'CONSULTATION', '2026-04-27 23:32:01.000', 'PENDING', 'EN_LIGNE', 1, '2026-04-27 00:20:30.753', 5),
(52, 'CONSULTATION', '2026-05-08 00:00:00.000', 'PENDING', 'EN_LIGNE', 1, '2026-04-30 23:24:48.290', 8),
(53, 'CONSULTATION', '2026-05-08 00:00:00.000', 'PENDING', 'EN_LIGNE', 1, '2026-05-03 14:05:23.349', 8);

-- --------------------------------------------------------

--
-- Structure de la table `contract`
--

CREATE TABLE `contract` (
  `id` int(11) NOT NULL,
  `fileName` varchar(191) NOT NULL,
  `filePath` varchar(191) NOT NULL,
  `status` enum('PENDING','UPLOADED','CONFIRMED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `contract`
--

INSERT INTO `contract` (`id`, `fileName`, `filePath`, `status`, `userId`, `createdAt`, `updatedAt`) VALUES
(2, 'Receipt-#AF-26042715928.pdf', 'C:\\Users\\fedy2\\OneDrive\\Bureau\\Viaitalia\\backend\\uploads\\contracts\\contract-1777479367752-165.pdf', 'CONFIRMED', 1, '2026-04-29 16:16:07.786', '2026-04-29 16:16:13.409');

-- --------------------------------------------------------

--
-- Structure de la table `dossier`
--

CREATE TABLE `dossier` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `status` enum('PENDING','VALIDATED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `traductionStatus` enum('EN_COURS','VALIDE') NOT NULL DEFAULT 'EN_COURS',
  `inscriptionStatus` enum('EN_COURS','VALIDE') NOT NULL DEFAULT 'EN_COURS',
  `visaStatus` enum('EN_COURS','VALIDE') NOT NULL DEFAULT 'EN_COURS',
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `dossier`
--

INSERT INTO `dossier` (`id`, `title`, `status`, `traductionStatus`, `inscriptionStatus`, `visaStatus`, `userId`, `createdAt`) VALUES
(1, 'Dossier de fedi kanzari - 🛂 Dossier Visa: Validé', 'VALIDATED', 'VALIDE', 'VALIDE', 'VALIDE', 1, '2026-04-26 14:51:00.473'),
(3, 'Dossier de Fedi Kanzari', 'PENDING', 'EN_COURS', 'EN_COURS', 'EN_COURS', 3, '2026-05-04 01:20:18.044');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `content` varchar(191) NOT NULL,
  `sender` varchar(191) NOT NULL,
  `fileName` varchar(191) DEFAULT NULL,
  `filePath` varchar(191) DEFAULT NULL,
  `fileType` varchar(191) DEFAULT NULL,
  `fileSize` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id`, `content`, `sender`, `fileName`, `filePath`, `fileType`, `fileSize`, `userId`, `createdAt`) VALUES
(1, 'ddd', 'USER', NULL, NULL, NULL, NULL, 1, '2026-04-26 15:35:33.882'),
(2, 'dsds', 'ADMIN', NULL, NULL, NULL, NULL, 1, '2026-04-26 15:39:34.782'),
(3, 'gg', 'USER', NULL, NULL, NULL, NULL, 1, '2026-04-27 00:08:57.463'),
(4, 'sss', 'USER', NULL, NULL, NULL, NULL, 1, '2026-04-29 16:11:33.987'),
(5, 'ss', 'ADMIN', NULL, NULL, NULL, NULL, 1, '2026-04-29 23:50:35.529'),
(6, 'cxcxc', 'ADMIN', NULL, NULL, NULL, NULL, 1, '2026-04-29 23:51:56.023'),
(7, 'ss', 'ADMIN', NULL, NULL, NULL, NULL, 1, '2026-04-29 23:53:22.699'),
(8, 'dd', 'USER', NULL, NULL, NULL, NULL, 1, '2026-04-30 23:28:13.411');

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `content` varchar(191) NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `content`, `isRead`, `userId`, `createdAt`) VALUES
(1, '📢 Nouvelle annonce: dd', 0, 1, '2026-04-26 15:37:35.478'),
(2, '📄 Votre contrat \"Oumaima rlv.pdf\" a été approuvé', 0, 1, '2026-04-26 15:37:50.212'),
(3, '💬 Nouveau message de l\'administrateur: \"dsds\"', 0, 1, '2026-04-26 15:39:36.169'),
(4, '📢 Nouvelle annonce: Bourse d’études en Italie 2026', 0, 1, '2026-04-26 16:54:46.726'),
(5, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:03:15.831'),
(6, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:03:17.212'),
(7, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:03:18.535'),
(8, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:03:20.265'),
(9, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:03:21.149'),
(10, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:04:10.628'),
(11, '📅 Votre rendez-vous \"CONSULTATION\" a été confirmé', 0, 1, '2026-04-26 23:04:13.705'),
(12, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:36.197'),
(13, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:46.197'),
(14, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:50.077'),
(15, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:52.293'),
(16, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:56.416'),
(17, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:09:59.740'),
(18, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:14:05.584'),
(19, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:37:00.333'),
(20, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:37:09.061'),
(21, '📅 Votre rendez-vous \"CONSULTATION\" a été annulé', 0, 1, '2026-04-26 23:52:00.410'),
(22, '📄 Votre contrat \"Receipt-#AF-26042715928.pdf\" a été approuvé', 0, 1, '2026-04-29 16:16:15.769'),
(23, '📢 Nouvelle annonce: aaaaaaaaaaaaa', 0, 1, '2026-04-29 21:58:01.866'),
(24, '💬 Nouveau message de l\'administrateur: \"ss\"', 0, 1, '2026-04-29 23:50:38.113'),
(25, '💬 Nouveau message de l\'administrateur: \"cxcxc\"', 0, 1, '2026-04-29 23:51:58.239'),
(26, '💬 Nouveau message de l\'administrateur: \"ss\"', 0, 1, '2026-04-29 23:53:25.553');

-- --------------------------------------------------------

--
-- Structure de la table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `amount` double NOT NULL,
  `prixTotal` double NOT NULL,
  `prixPaye` double NOT NULL DEFAULT 0,
  `prixReste` double NOT NULL,
  `status` enum('PENDING','PAID') NOT NULL DEFAULT 'PENDING',
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `payment`
--

INSERT INTO `payment` (`id`, `amount`, `prixTotal`, `prixPaye`, `prixReste`, `status`, `userId`, `createdAt`) VALUES
(1, 5000, 5000, 5000, 0, 'PAID', 1, '2026-04-26 15:38:26.527');

-- --------------------------------------------------------

--
-- Structure de la table `study_in_italy_forms`
--

CREATE TABLE `study_in_italy_forms` (
  `id` int(11) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `passportStatus` varchar(191) NOT NULL,
  `currentLevel` varchar(191) NOT NULL,
  `desiredLevel` varchar(191) NOT NULL,
  `studyLanguage` varchar(191) NOT NULL,
  `desiredSpecialty` varchar(191) NOT NULL,
  `age` int(11) NOT NULL,
  `selectedPack` varchar(191) NOT NULL,
  `submissionDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `timeslot`
--

CREATE TABLE `timeslot` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `startTime` varchar(10) NOT NULL,
  `endTime` varchar(10) NOT NULL,
  `maxBookings` int(11) DEFAULT 1,
  `currentBookings` int(11) DEFAULT 0,
  `isAvailable` tinyint(1) DEFAULT 1,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `timeslot`
--

INSERT INTO `timeslot` (`id`, `date`, `startTime`, `endTime`, `maxBookings`, `currentBookings`, `isAvailable`, `createdAt`, `updatedAt`) VALUES
(1, '2026-04-27 00:00:00', '12:26', '13:27', 2, 2, 0, '2026-04-26 23:27:03', '2026-04-26 23:27:33'),
(2, '2026-04-30 00:00:00', '15:29', '06:35', 2, 1, 0, '2026-04-26 23:29:25', '2026-04-27 00:30:01'),
(3, '2026-04-27 00:00:00', '00:30', '16:30', 3, 3, 0, '2026-04-26 23:30:47', '2026-04-26 23:34:29'),
(4, '2026-04-27 23:32:01', '09:00', '10:00', 3, 3, 0, '2026-04-26 23:32:01', '2026-04-26 23:34:55'),
(5, '2026-04-27 23:32:01', '10:00', '11:00', 2, 2, 0, '2026-04-26 23:32:01', '2026-04-27 00:20:30'),
(6, '2026-04-27 23:32:01', '14:00', '15:00', 1, 0, 1, '2026-04-26 23:32:01', '2026-04-27 00:20:19'),
(7, '2026-04-28 23:32:01', '16:00', '17:00', 5, 0, 1, '2026-04-26 23:32:01', '2026-04-27 00:20:23'),
(8, '2026-05-08 00:00:00', '16:27', '18:27', 2, 2, 0, '2026-04-29 23:28:06', '2026-05-03 14:05:23');

-- --------------------------------------------------------

--
-- Structure de la table `universityinfo`
--

CREATE TABLE `universityinfo` (
  `id` int(11) NOT NULL,
  `university` varchar(191) NOT NULL,
  `specialty` varchar(191) NOT NULL,
  `level` varchar(191) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(191) NOT NULL,
  `lastName` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `passport` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `phoneNumber` varchar(191) NOT NULL,
  `image` text DEFAULT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `passport`, `address`, `phoneNumber`, `image`, `role`, `createdAt`) VALUES
(1, 'fedi', 'kanzari', 'fedy22ka@gmail.com', '$2b$10$BdfhqO5b13gtvVTfQkyfmOfvB1mVfzZ6GtARbAkcROgEdWiqrbOZC', 'N556615', 'Tunisie', '24420508', 'data:image/jpeg;base64,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s/OOPcd/8u8Psf8ATvznjJj2zSfjjDXrzjH/AB75/wCOdO/u9/8AT3H8fDn/AP0267716+62498xrovuvtntrCIx9Y8238616yz5642+x9933/8Ah+Pedfvv/uv/APXLb76u+Ci66aquWGMoquWff7Pfvv3XvvPDTX//AN8+/Px179/140+7/wDee8f7qIrLqYb5J5b5aZo5rQvtv/8An7vn3bHHjrb3/g77Lz3/ALx+5z+y+/nrghjtqvsmrlomhrjuqpngIw263273x/7xy38xyGw6+9xw3z/10x2Rnhgulrjnvrsvvrvulvnjpvhs6/8APfufuf8ADvfPf4fjT7zTjzHTb/5zKu++mqOaKa2eWeGKCmme2762l4bfTb7bLPrnTbDYLf8A5+4737079xZjlskvijivttuljjloluqruqknOFcm993387119+/o78y71/7/AOv+Mhr6I4ZL7iC6qIiTT574aI55wUeCz2Z+f9c89+f9cuXfdN/8/wD/AN0+679pqohhhnlBpopEDsvpkuronSA5DabFB356y1z0924tz8//AN//AHff723S++uueaWWqWeWsdQ+LXZ6WgtlXf5UIfX3nXT/AP38/P64y86z93++8egrjkgvnsrrnvCDBYIAevAJnfXc8mrXn8z37z87907M+/7/AMu9v+PeepJpapKo4Yvbax13Te1d7Va110+oYLHpGef9+8es9/vsMeeMNPft+frZ7p5nd2p0gr5Z7PLjn5U9xPR7n5Z3SgOPOP8ArHzDrxfjPrHb773rw6+OuFq8kSgCtsHEtAX6LLzmXHPVx5sw4Xf7vrTPrDT97fXbjvT7f/WjWWm2eqlDu3YaBSbv7/vb3qNN/wCn/wAQzTt++tsfe/8ADP3LDPjz3vz7Ly20p4rfe4/7nTbPrf8A10++2z86/wDjJzxy/POsv8cuOfdv89/ftuf+91Iq7t/f39/+jxv/APHvPvL+uWjbpK1gwQof/XLTv/7nDz73n7L/AI99+7dvnk3Yi/u7bDZy915332+tzg7y9t9vFNf5/wCtd/cNdcpP9/t/9PtfOnoLR3OPl7WpNZu/vvuv9a9p5d1/LnuwyEd9v8PMM+O9ff8A/r7Lv3XvBK44r7rRSYo3jrvTZZ9N1rvvn/baZPs4xfb/AJyyz7wyzy++8+97/wD+ftb7yhIF6/yvf0VsdePe/NgnN3svX7QSTH8+e8+ft89/u39t9fc+d9/9i5BFbv31+2S/8u4f8DfWDrtf33jaXx4Xv+f8eMftsef8/sd//wDfrXrra0b90doiktqNkOrc5t3+H/dnkc8P8oLPjP3zLX/7PX7vvXzvrT333bY81z7b/e05Vp2+LZYMT9Mndc9oD10Ef/nHfHvLX/jX+/TfrfPDP3fpDf0a9lvvL7ipHd9ZtvN41+BHu613ltb/AOxz8+74+/x/0y7/AN+v8O+YOFgX/e/hf6b98v6Cx/eqZW7YrrjnT7Vjsfsve/fvufO+fcv/AP8A/wBdev2926Wxe0L3DtxxWvPB8arjRy1uDrQ97se+fe9v/wD7rdhPHbzH3bfrJtfz9w2jTT/3nvmfZTX/AAVu6F10nssnxfX66+7+79/791/3+/z/APv+Gdyf7jJdqcETiDA/d+OHOfFPfLW38MrrcDt+Nd/8dP8ArLv/AP71/wC/9+Fldtnf6f8A8/fPT/X/AJ83TZarf829Jefkr/L1x/8A/c+fO9//AP3PL3TXvfnUlb2U72bGn7PzzCPXo/8A9yl+xyPYpvnZZ3/085w+z3ze+/129/5/652PdwDV15tPP/235N9zHabtiwxyP1rtvE7xy645623374Zw741541+7+bM+3ny5u/J2/wCKt97Ru9qquNed0dStvNs/tesu8vO+Ou+8e1nEVF//ANnE6Wu6x+7f9+91tc0ro0mU9ecqkv7vP7T7r3Pf37Tvvf3F9lF9tV5xoM566vz/ANq9+IYk/wBp+uBIIXDn7PQ3vOPc+/e+sM9+OmPs+UW333FX3k/l3809Oc+0K9Tr1KEsp7aExL9KY8+PfvePv/8ATr3/AH07/UV3VXXdWfYz97avPz0DFFDUT3DoEeLFJYupMuxzz7+37++5zw159ebSb9cUdbeYZW6fd/fONtP73v8AfP5Jv/sLB5VHesPfM8//ALXzXfb3v13159RVFFFd5tCXl6+S/u3nvjPo/wDzon67K8+X+/8Ae9+s8/uPdO8tvvXU222Vk32UHk1NWa3yCPT31qzkU3yviUVn9s3+vfvc8uP8esedMM/PGXlHFXX2n20nEnaV+ptP5v8A/TO67j1fePLYZ+lTLzfn3X7nrTzn7TrVFtRpll919JpBhJa1t33W36f73XObTjrOuqUv/v3fvHv3vzDv/vfvnd1lJd9R9dVdZFBR2VAJuLbp/hZx8frLfzcS4mPX/wD+1/297/8A+c/dvOv2W3Gkn2FW122Gr91fvv8AmX/6+urHPfLxxqTr/n773P7vnz/Pvzj/AP38fcTdcfebTbeFLfPfG3zzkzw/TTx27PdeV3gIr9L/ANfP/e9fNved+vFHVXllkjpwaat6ejjoL5h+J3ee/wB/dv8AdTdQTLe+ldo//wDtf+v+tcNf1/0F392+fQq77rz1Uk1mn7x+zJQ6y353OWevp80Hr18waOP+P9MN9al+dgN2nVmVPK70y6uzAb9/8v8Af/7XfH5jd6W0/wBqMuj1vRsLUH95/wBM2z+eN/8A9R5V1O68Oq0MHzZy2solksfcd9EQoYkp3UsdLv3rD2XXfn71Q/P/ADVQfUcVTulLRkrPFk6Ku/8AuWh+tr3j+hTij4WTyP3/APnZk/jr9YkvrTVNBdZ89ujkZ/4gYk7di15Nu06hY1gnH4Ze3sQD7f8A/wC/Iuf8euhy4v8AZtdpPw5Lf+M8kwIA0cou+qyi6Ugt2zqZa+vUYHPLbjPvPzXnvEIp9pN9tF9l8tP2gnLog4g8E8eOCyo80cqyV/5k7w33ff8A12Ve5/z34DJdVecZdRXYej75PGSLOGNDFPHPHGCGH0HtrWa5y16/8325948y+/6ivbUVRZWXfePu/qGrrzJJHLKGPOLFJOPGfy8Obb63Zy//AN+de/8A/wCx/sFaTUfdUbZdUvu7hFPOH3OBrrGJLNJNDcGfGHEdwyde8z9708c9vt2uldWedecddZaSkk7MNDfDVLDhuuAJda3/ANyxiBJuctvNe/eusjZutnrByjkjyh3EmU1/Iv8AQdHt2v1vNcXm1FnRRw00vnXjH1/X/f7Dif7fZWlv9f7TXm7zCIgG04V58fxxflRRs9gQRW6Eao9NJdheIIc42/Z//vp+sLHDeuaGGCS33u22qCfbdD/PvQUmEb2pbj3fKm+6CqKyzvv73/7v22s8vT6j77D2mmKGi+22j3/j76yaq2Skcv3v39XKG+ea+m7j/wC2x861XzeFqmrhFxacVT/1XCdDY83/APBWP+zqPt9sHx2V2jpK9xH3F9bihSjupudlc4us/n3kUPtuPtvuf/5d7t/vvP8ArN/DDf8Az6z+/qv1zu3vttuv/8QAJBEAAwABBAICAwEBAAAAAAAAAAEREAISIDAxQAMhE0FQUWD/2gAIAQIBAT8Aom+N40vXS8aUvClxei9Gw2m02G02Gw2G1m1m1m1m02j0s2m02kNrNrNptIyG0jIzazazabTazabWbTazabTazabTazazazazabWQhtNpDaTExMrM4xH1iE4QiIiEJmEIThCcpmcGkNcYQnrzFKUvQiZfN4nfS+pcr+bCEITCHxhOl/x5mcoQnDV/TmWv6z/rP/ioQhCEIQaJ/LgliE5QhCDX8ddlLlon8OEF6TX8JerP4CXrwaJ7i9W8LmE7H2r16UnCdj9VDy+C7aPra9a8li9F9xC9GlLhD4z2l6tKXog+p9aFypeN40bKNlEylKJl4Ufqrk2Nm4WoTuKUpTcNoeopSiZRMrKJml8b1PrXCj1DY2Uom0LW8bkVG4eobKXiilEzS+99a4NjY2MuUylKUvRS4RpE7l+shYYxjzfRWEact+sssY2MfCl7lhC7r1rFGMfGEJ1vijT7urNwvQfDTl+1qeGTEEuEIQhCDXQjTl9aJ1oh+h42ti+M/GP4x6CNEITnDaLSzabGPQSENOW/ZfgaEqaUlmDQ0h6UScbiMWkWgiJl6CQS+8IfY+tFH4wvJUPUbx62b2LUUaGssQhCY9Q9cHrZvE6VDFn99j61llGxExBIYmN5YhFKUelkIJwTG6Lz3vrbgtX+jGN4SNppX+kQ0hoZRiZRITKISIND0kGJi897623cJjKIUHqFrNw2Nj5oTQmU3YaIIQ9UN4mmvXb+xCHmiZSlKN5Yi4WEylKPUU/YhspofW+tj8iEPlSlGx5QyiKUpS4WXjR60NS+8IY+FKUo3mZYi8bh4eNHr619kEMeX0XCINYXBiy8aF9evqX7wh8X0rgsXDEIQxfYlFOt9jVGIeHwfFZQxDFiYeUhmhenCcWhIaP3l9EIIeHzQvGNKi9aEw1ReRjHiEzREGsrjRMZcIn0aV7bQ0PnRYZMQmHlDFhEpJ6K6mPwNYeG+CeIQQ1hsuUPKQl9D7v1ldTGNZoyEILQQSGhIaHpHpIQmUJCF3rxxnUyYgkLSRDQ2Uo9QtRuLiG0ahCCQkJfY+9eMLsYyDRBITGx8Zn7ExMao1MJCRpQ33rx3Mg1lMpS4p9Yp9Y+jcUo/s0o0oYvpegu+DWHwT6LxSFl969BjHxQs/eG+KEIQ/QXoMeGuKZRQaGPihC9JeB90Hh9CY2N8kIS9JeBi60mLSQ1fSKP7GhD4Lk8JCQlBEIPT3rx1LSLSLQQ1fSKa9VRRPDRMIhCEIbRoaEhI8IbNL4NUemffavGFj7FpptRtRtNolCZ1+Bs1MeFqEqQgtJCEHpIJY2m08DZSwXyC+RG9GnVRqkNqHpGuleMJC0iRCEJh8GqjWo8NZ0sX2QhCEIQhCDaGxvimfF9iHl6URD0D0EfFeMafIsoeIQhM/Kvu4bJhMWoWoQ+VGxsby8o+JRcYfRRoaNaS4LxjTwXJ5+TTUNcUxMWoWo3FKUbGxsb4PPxaXqEvqcqXDPk4LxjT54Lk8tU16YMeVhMpTcVm4o30JVw+PTt0ly+NGa/HBeMafPBcHmZ1qjUY+V5vKzD4tDf31LGvxwXjGnzidFLlo+XT91dC43gsQ0aG2JJE6Uxs1+OC8Y0+eqcGalTXpaY+6Cxo0USmL16vHD9FNPkXReUNemo1aWh9yNGmmnTMwhOnV44frGgXROMzq01GrQ0ffYlTR8f+iSXGD6X44frGjyLqfNqmr40x/E0NNcZiC0Ni+L/AEWlIguCzB89XjgvGNPnouKXg8u4g9CY/iQ/iH8R+M/GL4haEhKCEudKUZOWrxw/WF9C+U/Ij8h+Q/IfkPyH5Debzej8hvPyH5Debz8hvN5vNxuNxSm43M3M3M3s3m9m9m83m9m9m9m9m9m9m9m9m9m5m5jbfBcH1wna8UvrLg8XFzS4pcUpS8LilKUR9H0fXRe2s3M3s3s3s3s3s3s3M3MrNzNzKzczcysrKyspuaNzNzKysrKys3MrKVoomysrKyspWbmbmbmbmbmbmbmbmbmbmbmbmbmQmZyeV6MzO6EITh//xAAlEQACAgEEAwEBAQEBAQAAAAAAARARAhIgMEADITETQVBRInD/2gAIAQMBAT8A69brLL2UUVuvj1FlllllllzZZZaLLhVFlllllllx6PR6PR6iyyy4suPU2WWXFllxZYnwPZe6+he+yyyy4qFuTLEWWWX/AI9lwlC3IoSK/wAmuKyyx/5NlliK/wBZf6q/+dWNiZYn2l0rGXFvg9l9ddFsb5Lhehi6i6LfRUX0lzsb6199u+qpvnXM31q9H9LLEy+Vcr69TQi+0+BD5kUVDU32H0a3KLiu2+dOaGiioTLGhssvlfGx9BKEfwaKKGiihvYuRcKhj3UVNRRRRUJCQ8RYmk0jxKKHiNVKhdV7kjSaR4DVQkUiiihJixKKKGoaKKGhooUrrOaFiJCRSKQ8Ux4DTRTKFjYsUUiiooooaKKGjJD7ThISEhISmhopFIorapa2MyQ12kVCEIRRUPhUt7GZD7qEhC2VwobEx7GMb7L2IQoTmx8CGIexjMvvMuN7MRChKGXxXLljMvsrrOV9MUIUWWN9FjMvsrsoXwQ8kh5msWZrFkhPhsboeRrNYsyxmXOuX+iY2P3FlnsTFkLKxCmyxseY8yy5TZc2XyLjcf2aFiaUfmPAeBQm0Jihw2NsaFiaDQPAqimLYuRctSkelFlloSRpEqFLGikNIstHqGh4qf6VyrisxwbMsKQhFCPX0bMsmxti+/RMRQhy0UZOhssTaFkxOxoaj+9G+DxqkNWNUxIqMk/4aWzSxpixFgJFFFFSxqzSaWaWU6E3GULFmj0ZJrkXFRgv/MZiQlNFGkSShC2NQ4aKKKEoY0YISPIvfIuL+mPxRmIRQt62NzRRUVDhmIkeX718HeMZfRQkVFFFFCW1xWypYxmMeX71/G/UP6IUricIorYxjGYR5HeXWZ437LMl7FtW65exxUOGMw+DdIbt9fF0yxsQmJ8KlyhxcOGMR5H6oXYxdofwUKFFbLmxyh7Wyz+lmTt9nF0x+0KEIsvY4TllQiioZcM/pk+2mxMQtilxZZZZcIbP5DGMb9RdvtUWITEXC2OLLLE1CRRR/IcMbH3KEJiYixM1Go1DzQ8mWxNjYmxZsxzTLLLLHDY2PuqExMsuh5FssWLZoNBoHgaB4MpossTExsbGxvof3mUITjL5KQkVFFFDQ0NeosTsY3DF3VKEx+zQLESEitrGirHiPASobl99PakIThbm4oaGN3Df+AoQhQpujUajUixvYxjH/gXChCFsabGmNsVi3MY0X0f7z2hQhChSyhKhIrYxsY3779oeSF7FF0JicLchw4bG4f0s1Govq2Wah5jzHmNsx9sSEhIaPgmJobLLLLLLNQsjUNjcJDR/ZsWQn0Hkh5jzNY8iy9mD9iQlQihoYmW5ssTiyzUPIsSKGrHgPxjwZmqE2jUxZtCzsTL4HGTpDzY22WWWWXtTpnjdqFDMkeyyyyxssssuEhISGhIooo8z2XRrYs2LMXks1IvY4yfofDc+J+qlQ0NDW25QkYoShilnldua22JswdvYxmXzl8eVMTtCFFGSGhoooooooSEhIqGxT5c6Q2Lgo8exxl84WJwo8eViYtjQ0UUUaTSaRIoUsUN0eXLU+Kzx/dj+xl84WIU+PKjF2hc9w4s8vkXwb4/G/exxl84XClHiyv6J9KzPPSZO+Tx/djjL4f3hc1GGVGGSyFzVPkzoyybi+PDY/sZ/D+8LUJ7MM6ZjmskJ8zZnnRnlcUVx+OLLH9jMf3iahPZhnRh5ExO+R5JGfk/4ZO9j4/H9FL+xl8HyITlCyox8tGPkX9FknvtDzSMvL/webY+hh9EUUP7GfwbE4ssvc4QnKixZtC8rF5v+n6n6H6D8rHm2N2NHwvYy+Px/SpcNWqH4j8z8j8z8j8j8x+M/M/I/M/M/I/IXjPzNBoNBoNJpNBpZTKNJpNA8EaEfmjQjQjQjQjQjQjQhYI0I0I0I0I0I0I0IWKWxrmvf65Fyoe99RdC4orenw0UNFFFFFFFFFFFFFFFI9FIooSKPRRRRRRRRUJI9FIooaKKKKKKRRRW9bF0G9iLLEMUuLLFtsUt7/wD/xAAzEAACAQIDBwMEAgMAAwEBAAAAAQIDERASIAQTITAxUFEUQEEFIjIzUmEjQmBDcHGBoP/aAAgBAQABPwL/ANsb9iqvwb/+j1H9G/N/E35v0b6Jvo+Tex8m8j5N5E3sTOjeRN4jeR8iqIzx8mZeTMvJdF0ZkZkXRmXkzIzITvhcuuzX9pcTLl15LozIui6MyMyLmZGZeTMhNPHdoyG7RkRu0bpG6RukbpG6N0bo3P8AZujdG6FSN0bo3RuTdCps3TN2zdM3b8m7Zu/7N2/Jkl5MrMsjIxKXkamWmZZ+TLU8mWfkyz8i3nktU8n+QtU8n3n3n3+T/If5PJaoJT8n+Tyf5PJafk+8ec/yeWff/Z95efk+8Tn5Hnv1HvB7zyf5PJ9/ktU8n+TyfeZZ3Pv8lp+S0/JafktPyy0/Jll5MsvLLS8stI+/yWn/AGZZmWflmWfktPyZZGWXkcZ+TdS8ipy8m7flm7Zu35N2zds3bN0xUzIOkbp+TdMjBxfUuxPh3K3KthbXbTbkW90v/bC6f/z0X/6x9wlVjHqyrtcI9OJ65EduiLa4MjVjL5/6BzivkdeK+SW1011Ht0fg9d/R6/wT2yo2SqybG28cxCrKPRlDbf5kNpg11PUQM1/+ZnJQV2VduiuhPbZSJVJSfFmbC5fC+D03M4p2+RbRUXyUNta/MjtkWyFSLXUU0/kv/wAlUqxguLK23/wKu0SqdebcuZtCZczCqMVaS+SG0SXyU9ri+pCal/x+011CLt1KlSU+vNeDxTL6LlxFxMpV3BlHaYyQpX7U+wyeU2jbbXUSpUcndl+bfkosXxWCk10Ke0TT6lGqprtL7BVqZIXK+1TkPiyRfXfC5fTbStFtSkU6jpu6KO2JpXITU+nZ37+tVVOJtG0OoNmYfLtiuZYsLC+CwobRKmyntqfUjVUuj7K/fbTWVOBWqOXyMfOftkXI1nHoyhtv8yG005fInw7/ALTtCprh1KtV1Hd4Mfu0XL8lFxSKO1uHUpbVGfyKSfTsD95tW0KnH+yrUcpXZfBvmrl3FruX0LQsE7FHanAo14zXUT7zWqKEGV6med2MsND12Eiw+AuQkW0NctD030KUo9Cjtco9ShtMand2fUK13lQxchFsbksLj1IvovzFy4zcXdGzbbxtMi1JXXu37ra6ypwfkm8zbxvpTxzDwXKSH7q5cRsW1WeWTE7rucnZXNrq7yq/HKXOQmPiND565aL/ACbNttlaRDakyMsy4dx2+pkpYv2D1J4JnwPnrmooTXQoVssrPoJ9w+qPjbBEuYixYsNa0y5m9gtKHpeMJWIyzRNlqZo27fJ8Dbqmeq8EPkItwLFi2hj5Vh85aFghrXRZs0rVBdu2ieWkyo7yeL5CPjTcTwfLvz1isb4PTS6kZZZIoSzQXbvqNTjYfLXBl8Lly+p8h420PkrQh8il+RJ8TYKvx276hK9bsliw0W5ifJj1GbDxqi6dsfQ25/5ng+wLBFhr3GyStWRHp2yq7QZXd58hF8X7a+Cw+Cw1hYsZeQtawRR4STKDvTXbNsdqRPr2BafjBIkixbhgyw8LaUPQtETY67do9s+p1LKw32NEUNcMIjV0WwsPC2GUsWLcpETYONUXaqs8kbm1Vt7UuPmWLFvaJYQRYykVhYawtxHEsZSwkZRxHEeu2P038u1/VJ2p2HykJCRYymUlEa1WLFixYtpQkWMpHBogiS4lhxLYWLDRYsWGhokhrVfBcT6dSywu+1/VJf5LD5SQkJGUSLDRKA420ItpsWLFhIURRIx4ljLxILCwxosNFsGNFixYaJIkiS1LDZKTqVUU45Yrtf1L93KirkYcBRFEymUymQ3ZKlcnQHTaMvJUDdkKYqZkIxLEiPQSxthbVbBkkTJIY8LcMFh9Mo5YZvPbPqi/y8lIpxLCRYS02GiUCdMcB42LEYMjAyEYCgWLFsJLjglrsNamSJIY9MTY/wBK7Z9X/IfXSsYRIoS5ch0zdDom6NyboVMyiiJarYvW9TJEh6URXFGy/qXbPq66a0RQiPMsWwsWLFvdMkiaGtKIcTZo5aSXbPrD6HzpQiIhC7WyRIY9CPp9PeVD47Z9VlerbUhEWIWC7UyRIY9P02dp27b9TVq+pCIoQhdrYyRLSjZ3lqIpO8F2z6t+epESIhC9/wDHMZIkPQxEX9xsks1Jds+r/ktSIkRC7bIkT1I+nS+3tn1ZfcsHoREiIQhdrZIni8Y9T6d89s+qr/HfUiJEj21jJFQZEeCI9TYIWhftm3xvQY+ulCICxXa2MmMTxRS/NGz/AKl2zaYuVKSKicZu+qJFC7Y8GMqEtCKH7IkPxXbH0PqCttL0xKaF05a9o+exjKhLroRQ/ain+PbGfVKdqt9MSkuAtWczm8MxmMxm95cvhfFjwmVMVhQV5lP8F23baO8pj4PFkSl+ItEpJE6tzOzOZxVBVDeiqCqCmjMX9ncbHIdQdU3pvP7N6b0jUFIeLK60I+n0XJ5mLtsuMWbVHLWlghkepT6aJzsTm3pvjmM4qoqpGqKpczCkXwWq5cuZjMOZvB1V5JVR1h1LmdjbLikZhSI1CM74sraI9TZUlRXb/qtO082iJT6YzlYqTuy+pvBIeFxTIVEKZcUiLxvixszDkZiVQdUdUzmczXwvquRlZkZXxr6Ir7kbN+qPb/qFPPSGuONuJS/HGtxHhlMjZkZlMrN0x02cUNY3wpzIzE+IpF+BfRckN2HIcuJJj0WIxbFTMhkMo0XL4U5cSLwrIsPCiryNn/Wu3zV00bXTyVnopfjhJ2J9TKKmRpmUyG7RksWMo4DppkqY4FngiMiLELQ8JE+mDYx4KDZGkKmKBlMhkHElAlAyliJTeFbR9PpbyVxKy7h9Up/7aKX44TLCiJGUsWxci5fB4WMqMhYiRELB4MYyQ0ZDdmVCEXL6XElAlAyGUhhVxiryNkpqnSXcfqX6cUUumDLCWi5mLFjgXRdF8GtMRCweDJD02xRwvjmL4MsMsWEVR4bFDPXRFcO4XNuknCxLCBT6Y20PF1UiVbwbxmdmdkajIzuXwtoiRwtgyeiwkN2HUROfEzszkKrQqqZe+EZCxaLCKo8PpNP/AG7hUlliVarbJcSohESHTUxjnYnVFGUiUcvXCMczJRsyC+43PC6LOMiLEOJbCPUiLBkieFixYchRc2T2dQhcYojXEQoO10JtEJ3GRFjYsVBi4n0+nlpdw2x2iN4NEo2IdSPTSxsqSGylG8uJTgsptcOIy9uhe7KfGSsQj9hUponAg8GsIkcWSJaJP4RCnco00jbf14KWXpjs0Ps4m0UVa6L2KdQQsVhVJEfyNkqrIkZ157ftx0xmiC4kOmmRJDgbohGzITsVWpxJxdzK/BkaNmWV3Z6j+h1pMcmx3IdCxYiLRIkWwkfIqliNcnVjOFirGzLYUo5pClGKKtS5NcRcCEiLFoqkynG5DgKbNnqX7dtnFocRYMj1FqaMo4mUyluGFhx4EIlsbaIi0SHi1cyGVFixuyVOxl/o6YWMhkFTIoWiojL9xFY7LL/J27afz0wXJeNi2lFsWIQtEh4LF6GWMpYtgkJFtMy3HFs2XhUQu2M2j88XhBcmxYsWLFsLFi2LxQhYMY9VixYtjbBIS1yH1w6kUUvzQunbGVvyeLZch05VixYsWLFi2h4oQsWPVYsWMpYsZSxYtyJdcFhDhIj0XbdpVp49RwIdOfbU8ULQx8u3MkLGHVEPxXbdrj86GR9whCxlg/bTFgiCvJEenba6/wAbwsWGR9o9CELFj9mx4zEsdnX3Lt0ldMlwk8ETF7Nj0LS/cS6iLYbJH57fX4TGXGyPs2PQtT9v8iLHyUY2h2/alxwsSIexeD0Ij7l4sj1LlylHNPuG1RvHGaI9ReyehC1PB4LnvGRcWGyx+e4VFeDGrMQz/bStC5bxXKYhaL8ljxmQVxLCirR7jXjaeM/y0rQuQxjFjYQtLxaOgsFz59SiuAylHNUF3HaI/I8KhB61ypHUtpWL1NCwXLY8Gf7EOg2bLCyv3Kauias8KvQhrXKYtSxep4LkPF4PCRD8hFNZpEFZdzr0/kZUI+wZIWi5F6LjY3obIi59QpdRGzQsr91q0PlFeOU+RexfBlyUiVaS+CnXv1IyLly42OQ5imjMXJMj7CoUkUIXYuHdtopqcB8JtEdS5c1c+cMqJUUR+0UrmYzEpEptvgKlKQqLR+JmEszFy3oZI2WGYpwyru76G0K1VkRaVzGi2DY+JZnEzM4shwLlx8SMRc5jGfJslPLDvO2/tIifsmNjZcvwIcSSsSZcuJiFzLvBjwZs8c1VIXBd52/9ghMXPuOZKRmJSE+A5lJ8CtIzCY2ZhSIyL8t4vBn06P3t96+ofswREXIuORnM5vBzJT8DnZGbiXGX4HyUOhtD4i4CeFyMhTIzuXMxnMwnpehvC5sEbU796+pLpihPFaGyczObw3hmMw3hYa4FhxtEhHyJ2KqvhZlraIyIzuZhyFMjIiy+pjeHyjZ45aS71t6/xXwuITwQsWyUiTuORfRYjTbFSN2hU0OmmbodIdIjQFRSJUrs3JKjxJQxuXLkJCkJl8WXGx4UVeqkR6d62hZqbJK0sGLFYsqMviiELkYEYCsi5cuKRdYcENjkXL4OKJQJRESwQiDFi2MY8NgV63e30NqjlrPVF4sqdcURRETM5m1XG9DLmYuMaJRLYIiLCRJjZfH6bHq++fUYfOKPnCIsJk1xLGUUS0kXYngmKQpFy42ZjMXxbGy5mM7M+LQkQQhkiT07DG1Jd82uOakPBYoTESHEymQsZRosZTKZTIKJlMpkMhlwdzKzKZTKZRUxoymUykOGDJYrCCzTSKMcsF3ySvE2mOWq8VojhIjEsWxsWwWOUZYylhosWHhYy4WMpYccGNktOwQz1v8A4Lvv1Cn/ALDxQxCwtyLYrW9dsXhIeD0fTqdoZvPfq0M8Coss2sY4xFzEXL3wvyVoYyXQeDxhFyqJIpRywS7/APUKX+2KFhHBci5mMxnMxvDeG8MwpFy5fFC0sY8Hj9NpXlnf/AbRT3lOxVg4TaeCxQuQ0MtcbLlxszFy4nxLiEIWpjGPRCLnNRRQhu4JdhXYNuoZ43XU+RCFghchoceBkLDiSRHHoWEsFrYyWLw+nULffL/gn0Nvo7ud0XELFaL6bGUyjXAmjLwwpoUSMTKZeQyQ9GybO6krvoRjZdiXv5TjFcWVdvpQNo2j1HTFMWqwhaWhoy8RxsOBTEuWxjHhTWeokijDJC3Y171m07Vl4RK1acvkkbONYITIsWpapC6j/Iy8CKsxIti9bGMlh9OherfFjko9WRkpdPfrp7vMvI6kV8m07R8RKsrsYzZ/yGhxLCEJ4LUsb4vqPphflMkSZJjZFH09cRYV6qpR4leu5y6lDaJQIbZ5IVYy6e9j7e6HUiirtduhPaZS+TeSfyJsmyTLjKH5CLElgmJiYtFxDYpEpFy506lN3HIvhm4FzNxLl8GIYyTJvFI2D5HJLqyvtcIfj1K9d1HxwTFIVRroQ2mUSntXkhUUsV7ddPZuaXyS2hfA9oY67HU/slP+xsWDZVfAsZRQKcLMWDRKI0J2LikJiZcci9kZjMOQ5fB8FVkeCJSL/aJ8Cb4GfgZjMKQmXLmYbJyGxCRYjUlBfaVa1R9WX0JlxMzlGq42ZRrKSw+fbrpzHNL5JV4j2qJ6l/B6mQ9okOs/I6g5mYzFy4tE0WLCQkIWDiTgNFxSFIUjMXHInPgJlyA5EnxIsqS+4jIT4k3pUhs3g5DkN3IkUJFsHElSHF45XfgRpS8DhIs7kehTnYjtEkj1LI7VF9RVY+RPw/aLpyXUivkntK+CdeTHJsbLlzNyGLRLBLFYLBoqRJLBMTM12XMxIWGayMw+hcbE7rC5cbLikJjkSkXwRFCQlosONyVNG6ISUfgjWRHLI2iKXTBFy+GbiU6rTKNVS9nHppbsSrxRPafCHXY5ly+DwuX5K1LFC0NXKsOA8LieD0oY2MT4DfAuXEPqIuXGxYJEUWwepoyliDylSebWmRnboKvK/U9TI9SyO1eRbRFiqRL8yPRadp/UxsuZi43z1pQsVgtEyaHjfC+NxDxuX0oeKQkJCWLI6rDQ1yrly5cuKRGs18lPaPIqsWKSfJXTTtn6sL+y+dKEPFaZImhx4jWhFy+Fy+DFhfQ8FEUREURWmPInr+eTcuZiNaxDaGQlmjfWumnbP1P2q0oeCFpaJoaGiw0PlX02IxEixFEULQyOtkuo9LFy7ly5s36lrWnbf1e0YtMXoQsFixokhoaJIyjRbWsLFiwkWLCRFC0sWub4a2Jc7Zf1LXHpp2z9XtGLSnisELQxokhxHEksLFjKNFjKNCiZSxbFISLEUJaXhHXN8da5+y/qWtads/U/Y2xfJQhC0PBmUykoljKWLGUymXwbsymUymUURQMpYSFpYxkcFoqOy1sjz9k/Utcemna/1cxcmQtceghC0MehoymUcDdmUyEaZKJuzIZSxbSsXgxjIiFom7vU8Fz9k/Uta6ads/X7WQtCw+SIsFzLYNC0PkLQ8GMWCxmx6mLVblbH+pa49NO2/qH19q+DFpaI8tchMuXL6kLS8HoRcuN4rSvYbF+rXD8dO2fqH7WSFqQha3oWl+1QsJPWyK9jsf6tcOmnbP1Plvls+dcPZWLc54vBFxvkr2Ox/rWuHTTtf6sb+0khaosQuZbC2FsbFuc+X1EuHsti/Xrj007Z+r2713IyE8FzbY25j0PQ9a9nsX6tcXwWna/1v3ElqWEWLkoXt3yuovZ7F+rXT/Badr/V7hjVtaISExeyfMb5VyPtNi/Xrj007Z+r3L1oRGQn71vlNkV7XYfw1rpp2z9T9yyS13EyMyMr+5Zcb5TFx5D52wfg9cdO2fr929aLiZGYn7ZslIfKvY6strQ+dsP4649Fp2z9XvJLlKQqhGoi/sLjmOY2Nl+SzqJe32H8NcOmna/1+8Y1yrlxVGRqiqimi/IuZkOoOY5GYuX0LUxK4lz1ydh6PXDpp2z9fvWNcy5czGdm8N6xVDem9N4zeDmZi5m5yXMtztg6a49NO2/r9jbRbGw0WP8A8Lf0W/oy/wBEoss/BZ+DK/DMj8MyPwZJeGZZeGZJeGZJeGZJfxZkl4Zkl/FmSf8AEyT/AIsVOfgyT/izdz8MyT/izdz8M3c/DN3U/izdVP4m5qfxNxU/ibip/E3FT+J6ep4NxU/ienqeD01T+J6ap4PTVPB6ap/E9LU8Hpqng9NU8HpangWyz8HpZnppHppnppnpZnpZnppnpZnpZnpZnpJnpZHpZHpZHpJHpJnpGekl5PSM9JI9JI9HI9JLyPY5eT0j8npJeTZ6W71rpotwuypThUVm2eioeZHoqPmR6Gi+jkejiekgekgelgelgelgelp+D0sPB6aHg9NDwemp+D01Pwenh4PTw8G4h4PTw8G4h4NzDwbmHg3MPBuoeDdR8I3UPBuofxN1D+KN3HwbuPg3UfBuoeDdx/ijdx8G7j4N3HwbuPhGSPgyR8GReEZF4MkfBkXhGSPgyrwjKjKjKvBlXgsWMqLFixZFkWLf1jbRbsq0f+NCj5Hb4YlwuxWzKw+uGVLqxx8c2KuW0K1hIirj645fLHHxry+TL47/AB6YLD/RE8L8OKLWkh9WLgxq47r/AOCVldnBit8is/giupw8FvuHZPoSXg4Ia4HBIiPqf6iXAivIvxYuhHqcLk0Q6kuonYXF8Tg/gS+44X6DsiXTgfkizXQir9S68FlcuvBb7h2TJIdl8HBoS4XOD+CK6jt3KOj/AMaE2hu5cTvIfUXUcX8C/HidYiiR6CuR6sXU/wByXUfRDv8ABxtxHxRFD6kfkfBofBMX4kehHqPqT+BdSSFHyRFc/wBz/Yn1H+KHHwRuR6sy8RLicbj/ACRLqP8AEn8EfxF+PAWYj891WFP8deZl7i4Fy/guy+F8Ll7F7i4F8FwwbL8C9i+DeF2NiLsvxwbvhexmeGZ4XLnUvwOuN+63Ey4p+DeM3jN4Op/ZnFIzGYzmczGczmczmczmcuZjMZjMZjMZjMZjNxMxmMxmMxmMxczGYzGczFzMXLmYuZjMXLmbiZjMZjPxLmYzGczGYzkPuLiYpFy5mMxmM5nMxCN4ts+S5cuXLmYuZi5mMxmMxnM5mMxmL4XLl+JczYrUhIvxHzb6L43L6b8lar4IvofJQuCuPDosb6ErscMsP7E74W8l+B8aHx13LiIQc39pksv7OnAl4w+dC5EVYeMWX56wfLvojH5Y340/GF0X0X5VKOh66VOyzS4EvxZFjld6L8iUi+EYXZkihVIRhaK4mZlx8WNW6nyPqXL8m+iT+7Wl7nJbqN9CXGXOvh8aYq7OEafDryL4Uo/cnL8TaJXqcPxJyvwXQ+RD5drkOJkUY3n1JTjuo26jl9tvnH4OFiTuPBK42r9D/8QAJxAAAgICAgMBAAMBAQADAAAAAAEQESExIEEwUXFhQIGRobHB0fH/2gAIAQEAAT8hfGjUL9N8aFjh7NH2GUuhcamhcOpZdDlCwVOhKXw7jsavn2JWj4irZVTRU0r8FcGVUVFDVlDllcV+xRR8h6KwVUNiXJOHoX7FH/SqhrRUJYn6dTR1HzhUVySKO+NSyy5o+DXHcVNHZVa5VwZUVw2KKmq4ZbS/w+MXTKTvIp2iroo3pmdYLdsQk6C9zG7sT82Zssx7GR1tWP0D8x70E/TP0EjtD72ftE/QfeylhiaXZT2P2I/sdJGLG1WNn2LLls6LxDjsZ1cf2N/oo0N1uMe4xxs2XWyjeGYGWuizA2jAna2XnJYoudlpbG17LGqeWIfZRF3Q/Yo7P2P2P3E7TKdtHsZg0Grs0jmhaKMd8Tcui+dQfsR2xB9mXZkihe7iw6rLdi2tssaFsfsjs2xE/Ys0EhbiRpjHsx7Le7E1si1tl3bMu4wNu3F7YlqD9k+h+4Kq2y+7G6YCrpsS7MfsJ9qKoF7F0ZCVdsb3LpkF+ha4uE2zy2jRCNswU92IqVCmQSrCV0CSvLY3Wtr+xrown7N3c/VDP2mL2im8BcGXbPQ/qP0Z/wDqGDax9wXS3Q2+h7dnsYVHtCt4Z7mP2Z+5+xgHpU2XYzpsxD9GLjtQ6teCdxsWY7lxuKKKK50ZKKivRUbKGioqKKXooaKXqVFFDVlCOhIr8hUGhJbGf0dGTLaK/ChqSRUVgoqVRRUNFFQlZRRXuFgcsqKKEihMTRWYSyMoSivYuOvDU9FFVw65b8leJoWDRWSuXfhu2beeC5OKmsFRUfOK0LjeIfFxVcr43w0X4uzQt54KWdeK43G5uNeJGosvjfiubi5S9jwRfG/4TnTm+fY1gW/JZnxLJc6lvmxQy5T8N+DXHrrgzqHx2PcdRcaL/gfOKFhxfDqXK5LinHRfhUXGzrglc1Hzy3w64ueuHc74XFfwNeK+fUsTi+eo1w1wzH9c1/DUt8dQxR84dnRXJcP3jfK+ajo68CLjTjfKuLL/ANL468v+/wABQ3mUdjf8To68LFwXG4eOHcoY474Pz/fAv4eoX5D4Llouf+eHqL4/88e+TFFRXG4+zUrXi+cWKL40f+efoQjqH/Q/NRfJDjvh9568Wzvxv/0qGzo3wR3xXkXPryKb/Bxo3x1G+d8Oo7568vZqKihPhvjXlvn9hn3muFlT9Pnhf8O+PzxLRrw3G1L3g2fed3xXh1D49ckI/o6nr+AkdFKGf3Fi34uzrk3mEsZ14Oi8i5rn2Pj1x6/eTXFc68jzGvE+WY749ctTUXwXg7l7K15P8lnRVcn53/HfkRcLyVcVxr3G/C/B9/g98vs75dcNCz4K/k3jmyq4dFXGJ6L4IvM9HfhfC+Vi1CfgW/D0djN8Ujfm64LwqKKhD8G/5LFyrk+HfLs68T8d3xXkeTXFL2KXVj56NdD2PU9SovhUvDj5PQuG/N2XzvPgrwWVK4/BOdeNceyuCZHo6H+RfHU3yfDcXw+ebubLNE2LM7C7EMvKO2oVYQTsuOpfhfHoW/4W+ClcdqLoe/F9/jfIuOuDdbNrBiTI6kqH6MjxWEPTbNgxP9E3exMtOEGKkNG/2JjpMSJvAmi1Dj7xvw9neY3/AAFxvEd8GVD5X5Vy143hlGIzZq20bQFn2y6WcjiTofsYha6U0KuhOhjXsaGwo7Fc0W5KMqSMreyxPmvJ95fDvj15OpbzQ9cPvK46HzqOj7PXJsfsRQ8DfqRd9xZZf6WWXc2dmuT8mBao7LfuFZiZrYkqTNGw2VmmW4uVPJcf7Hf8juMz9Fx7lj35O574d8u/C3Wy1gvGzou4tF2WWbKobhMVM/B8EH0J1uFZwmd4YqiwG9mBlQotuqKE2rFJhp/xNTX8Pbj1KL4V7LihxvguW5wJRtiX+Ivxgb3+Flli0I2fnBMTNobqUhFFDD7IVCyx3FZamhbvAX8qy7Nrlcf+HRXiu/NrjtN8+5rXl+clZFFglhDuxjUoNi4sNvotBMuyjYzTRWToRhsuKLGUITEy7gvBgTGLF2dwjRRsflvya8G2pXFebrgj4OLLw2r9DbDaRa82MNZXuOofBLBVxboRkLBZSY1CdFwrQjrI8DUstjMCsDFqtmMNtD+lqKE7ypsR3PfO+PXi2f8AnHY3/I1wejaMje21FhxlYKhOisHZcpnRYllCHiEX7G7QzWi/8hMTE6Q3NCdIuGFR4HWQasaDHGQl2TL5XNeTYz5yfgUfIXlrm3Q2rIOLP6LQ2Bh7yXmWxMbKso11CVzn+hSh0yqZZV/hRViwNUHYTLLGoTpibsbGzkVCl4wyjWSN9Rm2bi+V8/vFFnfC+FRS+K5/T++DU/ebKgthyZuNjBsuy7LjBoQ4as+i7GiqnsSh2ngtyaooZZvgJ2VY9ws0LOz9DHPhjZJ21+ifSWIassxHzwV5UvcV6lrOh+H7NQ+L4o6Ho3kvOwaxYwfRUJRViRkynaP2LYYYnRd/1F8TUNI9IixF5NCdxZYmMZCn5Cy/ZQ4zo2a0d5TE71CmvBfJeF7Hy78C8bF+zCGNhsbGswlZQlTsTIzVFwzRoQyF+iGyxQ0G8fo2WZQpYt8EJjZKjovH6JmnFsbtCdIXgfTUxIZh+LYvCubZ4rHG+PXjpJ5aGvHtjE6RsNwyz2HRo0HyWMN4GWXFyvw9olIbZdjiyxsvEVY0aOxFib7LE4aNQnW4044DU7R1UKhrXDUqbiuOn4N7Gsj8OxeO47FvbofU0Z0bY2jZZdRsWBqGy+G0NTYmXDwLsjAJQx8LosuWITLGtCGxlQ8rAjY8CYwmTSbR2FRR2Ls/jqK5/OOy/A+Fyryy289F5Gouy+GxQ9Yh5nShaZcdlnyC47v9C5MjZd8b5IeGy42djUM0J0LI2cDitsosDFiVeBIWzoXN743x74VFH9eCqlDHpQ2aGXC4UIr3GhPYxiIX5GqipRRsWaFZ4GOhorg9c0bF+otfohvZ7oWdn2NiVNiyofoShti/Z14Vxcf6XRuFw+8r8tDM+KkwzcfJoQ/I+RRrZeBaMxSuDFCdCY1aEpxc6hQ9jUXDXDE6HseoYCmi6HkqEdPQ5VPA9r+uLmvI88HweaHvzdQi6l0KLGHH0+HcI3wMJjaQ3gbFUyZO4NUMvghM7MpmWyyjo+lRXKxM0ydQxZeRfk2hSz+smoaGEvJyvPQuLyMXl3PUVD1S8GdmkMbGNcErFg2B7ibHgIOxYmXayfRiFQ1F1oTFVn4KKMjZQ0JyqFJy2NCZdjQv0oY9Cg05sWV/GbG/Mio74aLpehsbsfFaEJUMsvBZ0MsvBoTLZcWVx/sv2WIWhrEMtlAxrorjoR8EMyDdouiyy+Dh7pmKuYjrg/JvwdePe42FtA2MN2ajSEJFeio7L5pifG+aUbGkUNCRQ0dzcM6joY4vGYTK9CLMXGx/iV4H5XNveC8Y2PMVcoaCcIUM6L4rinxQhbsVNCdj01Z0MKxW8FQzPYazkrJRRXMixP8AwY0NmGWThca41yU/SlL4/PAy+Oy+MmO+d0XZZZYx8H84rJ2Vz/Upi2qKaCdovbK1HEJGSGEzooYoq4WDLkJ5OsCTbwNVey0BcOofg+cFPXPXKqL52VK7cVlj4/8AvBM2VTK4orB2JRsqKPnBKyhclzg1RvEYDVpDsJTpn0eGCsmQ8hlhrIsDyVwWxM/Q1MR4tI08HZfK+HUPm+CL5dQxL36GM6DZGIormhexgZDXBorWYSlTUXCRRYxIx2hnY/7jVPIlfRQJYHeFpQ8p7mi0+CKsSMRCwLmLXgfN743GuW+Fz3zolezGyyxMTwWM2VCcEor3PwKHoSEIooym+DGFRQkIW6Fmkhe9mGhZOlH5l2IqFyFRFD9R1ejKLDAo8dFPVw1CwyyzQnVGpZkPdTjvk4Xg+jn7xX8C9Q9sa4WXKKtH9hb1D2li3Y3pD+g0IoTAgkUM2a5g6Qv6HvRWsI/vC6l0MuSsiCZ4spZEMAq8BrMsTTHHQxhZFItdlO9eF649+HrwqXyuPcMofChZi1qB10fmK7MZVfYkehHWFlsSoa9llvhTZYhJ9LdISuhVrAlFV0IJRu6KrRWR4FDFFWVkoo2KF9QJkoEyINQfYJeh1zf8J/5/Kqce4corBRYykRzZEaSisCVfpQqIvEtaG3oqYj9GeynRZl30MdCfT+i9D8SpGJoJSizE6oVWTSxwaKhR2JFFFDQolm4SC1kehoSM2vorV/rxWb83fB+KuKUrg+ykIISsp2pZCj4UJezf4bQv2EbZa7aP+BfQn9Cb1g6WISwJUtCEtFA4qdrKsSpQoo7HkSo9GTK9FYOijo1Kj+osv0dFCeytg91C8D4LYyh83Pw9iyOEj5y+8sTDx1NUxIQmj0iCCXLs2JWUVBBoqI0TsYSpQjYxlxRRXGsC0PhR1DlZMaMA1FWNZGwLZL3xwXlvnf5HXO/F3AeQ0KoQgpoL0YiClfpo+woWRd2UVCixm4v2Mo1F1H0ZYscHkoeIrhsJgQxM4QzcqL0hKkUp8Xwv3568HU6lz8FP1Qt8E6m4jSEJljcIqxC4M7KhG+DO4eY3FD/BHUPcOLnI0g/sefpVaF3BZ1zrHJc6nfg2NeP4PsZ2a1CFBvUH5R+TEX5Ci47lYFKRQ16LuFHUUPjVMQ9Q4Y9lcLjcf1Gy9DR3Fl2X5F8eud8HCl8l4EIfkTFz8NCWYZTbeoKEIoQpsTi+HZpiZubHw+RdQsvEPwshR8uxwnB62VoJ9qudcPni0J8O/BfhcdIeDcYM2NmG0UIoRZ/gvwWswovg/wBhlwixs6juLNH06Mn0cPfKxjgkHChG5c69HR0dcOpc1P2OoqL8XzyMdRVGwhnYvgoRrhfPU/To7jfDrjZ9Njjueuiof9jzHtF42IwQhQXw5/I78PfL7xeuF8euWIq0NnZQ2KG06ELcISEyrnULU3GRHRU/eFDUUbKHtDKK/CsjKGbloNhwfJkzUWjNmQylb8Vfw+/BvmrFMGjoZ3gYYfCFFwIoR8N80V6FqFqOxFe4ooRXFwykNFDXD6PUNWKblBd7OoJaxKT4d8+uVy/Iorg0KJuhALTixqPQtsrSsQShC4oSiqRRQoWyhn9wkI2MahIoqGdCNFYhj4VYg8KP4FN46ml/YWvlycf3wrxX+fwKjcs2WaDC3kcZdQLhZUbELU2WKFiEbiiioor0VZqKpQiihIX6UVgZR9hxuGPLGkSLs2diCV6RrTw1xUf5xuOvHUb8Gg79M0dxvTAkWIRdbGnsp2xp7EvsS9MSLTEjE7Eyzo6P+ykVkS9RYtmrhQ4o6i6LixoVui/UNjQk0wxaELUnpoX8MR84vXh7jsvydQx/nNPgp7rNYEsXp1CyJkXItIYDRoQtdstYP2G77FmMTyOQsNn9gqtjnZQQv0KOxFwxYLj4IsbLLGx0hpKRFjTqLHbMj9BD0ZLA4W1AtilUDCEpJLkmPyV/IsehKH4NSqux6gouApWjSGxH2OdjZduEzYssTox7HdD3Vuj3HUhlyIJ3BuGy8F2bQ+h5H0LRT3EZMMYhjDY9ntGtn7n5KNDk0L7jdxoLsrIlCYla4teCvY8aleRx351C4YShiGjBoXErI8GaNxDDZdCfssvECZ7DYT9CDFsp5ZcrPcvWYUy4N5G7Q2ShCVv9iZcrG/0Peht27LDTYTseWjY1cXkt9C94xSbEPQgh4EXB/wAXFlQ9S/F14vvn2WpSyEIWA1DGPak4NFhEoeh0YnvCOxnSKRTPwFhFwTKUIcCh4Fca0LQ3ZdGQ2M7LWi3sdYsG9GYRYaDexuiyyaaHLciZWLFGJsQQRQow+Yo74Lzsrkprn9L5oeK7KrVJlZEfBMBlZlmFY3iOzrQrCY8oSaG5QQ9oWFOhiGh6higtHMhaOzTMBvI4weDNgsf9FN6OkY7sWurMxn0UGlnqRdqF/wBBBKeD2l2Jg2NCM7WELQlyfO4XLE9Tt+fqX+Slr2hC2NoPHcGreRHo6BZ2KostmkNiOi3Q2cJkavY1e0N2oJ0YNDWsD6uNGgzcYe0ZaLbLtCTvYk6QiSGSEgk9lr3FDSkMI6MsjGrOjcey8lUvbKQ2X6my5+8bjrw1z65rwfJWwxGb/RS0Jcayqhuh1Y2ekJnsrf6bGwfvMmbLSszoamP6PyIYai3oc7ixZEaFTeSn9DfYL8ZkVBW2OmJehhfRvkTpqjThVzpFSqF4Po+bO+F4iv47RbZUzTYlMRsoKGsiyKGNjCdsTSmA390hexlDw6Eez+8JH9KtjfZXsoWGPBLIw0YjD3FiFEBLQ14YP3GxsIBLsPGizY6Z2NGWCUjKLwIq+xTseo7hG/AuD5b83fJLmxuzSGo7ZW7rAmMj5UzUsYb2I1GPAgtZHoKGUIwRgXobh2h7zL4YrQ6CRohtmEht2UfgUVWigdFx7EtlmigJb3BG1F4NCXobEqFYdNC1Z3EskUcKXK8L/OXR6/jOMcy2L0PYULgaHkZVDVH6WWvDuCIpSNhRTBbII19itExpaFrRThnSiqhMmwmWNHJlFCz8LWG+zIidB9jLDbsSrRsKYwyWYs2bYNRC3BrYm4rhQlZLgn6c65XNHZ8O/FV+OuVYlse6E7CdxeiuRUNC2MawhreR0HamN3Zt+aEsUWMN7IgWlYDn8N2JbQj2g8hMxSKGhRBCh6QsBSqhSHZi7rQ2EqKy9CArEpSZezQjyitUEIawJk2wPoxfc9g1WXys6L8NeH75lvi1AsEaFFLCUo2fSipVhivY2yWsU/QhvbYqs7KdYEkJYKsSobOxIKHg2FFiLWSiGjRUrWDLYhNFFrISemBNvs/RR9HyUFAhoR0W7GdaVF0WWokxZ/kPm+GuSl/9Q9/BWBKxoejJ+iXB4GNFGxVlC9ynZSOhQghQ8QyZ/wCTRChp9n5FKghrgTwZoeZQrcKPRAvQShC0LaFU9YGy50hM41X6PgzfP54n47rw0aD5G0LEGYo6hlFD+FGjPzxKi4vcQSNSSjpxKDKKKGsDi/7P0VkeBhI90FCXseNSngW0JQTwaFLMRfH+P1CXHc/OF8u7NHW4izCFszf5AvU/CqOooo/Aw/cy41WIbwMMS4Bj0b8a0P5wLG/GkK4oeRBYmBYZiPY9zV5b42ZOvJuGLixlx+w2UKNGHBvUJFZKKKKKKGsGCijsehwoSGgobjsPcIUpFFYKhRQisFFGuFwozFCgf8nCpr+b8jXJmovZQlHSEhFFXwoSwVxuWMZRjBtDQ0NGg5IRsXCkUf8AzCRUtDLo2McVo6xD+5Gkvkv5Fcuz/Z+z0X/AS9yrWxi4WZoQij+z/wAOxLjQ4M6hswYoapYjpgayUJUIRpiXorItZmqZUVmXJoZuYDoWiz8joRX9864tZnUfOf3h151JMWsNjJ7hipUI1CxFYOqEdzRWCxhvRZYzcQngTLs/Q0OUzqEjoSKzoqKK4fRjHmMwloZSowthRpcdcq8V878OuTWRdPcFnG4hFy4QxMQ0UUaWP9GfORfqCWBKLrQz8HUbYihKFoX7FWM+jmqNwxjZtxcRSuhRe/M/ks++J+Rn3lUrNodxKGzkQi46i4vJU1NGA+hy5yEEipYzEaE7FrIhIqFgbi7HFwxhssbB2MWArDk+hKq4deDsZ95Vxb4/efXH7x/oRbKTRhwe0axQrFqUhIXBlHY2PUXCFybwtjGVg9BmhY2RMQuF/kvI0aGODcPgWOB7QtGwLw/OHUfC+PfBwvNvlWBzUMdh4HqL9iGhCP1NjY0M7H+jYzISOhBFQ9Qx6GhrBgPBC3JO0dCh8HyPkbLofAsUo2yv/kYh6K9eDUfPF1FgKMEYnaPRsRvCF+8SP/Bv0NwsPkQSEhUMEZbEhrGIZ+BlF2irD+hWZRQscGWWNjY2MbzuDDsQqRKVKVG4uX4r4X5kV4ey4JQxqZYITEIQoLBZv+uD2PA4VYWglkSEoTGBIoSvQ4ZRWz/aKhXCi/kMseRh4b2bDJJQxmZLPKy8nzyNR0b81x/vjvexjEx4PQPQosQv0X4fng5e4bNMjZFoxWxuhPOTYomWMMbGxFwTzBHe4uLhhsbgxix1Qlj9lIYdcuhfwrFnxLzvdoI06eDUwehOEWL9EdCiz/wvODaGXI2RMsbvVQ9hfoT9ljGSJbLLowmRgWXRZZZcMbh7G40PijIKZBsX8vrjdeXrk1ayLYtwaEHuEIX6XQi4Rmj4aQzQ2OIr/g9djnshXoYp9iCKFZg2KXY12K/cKMC+5c3DHjQ2XQ2M7HoyY67Kr0J1/g68nUdzvZc9+LsfB9jRjItx0zT9ELZ0J0IYU3XZYxumNl28lFAaayNvInLKLNrAzxcJYCw2UrLK0UWXQ42Z7Mux1jFwaLnY9mlDfA3GKMmPdLoRi49y/Bfmr34N+Xvhm0fatmgtiLEz8FliPkWOa9FYL7NzRmEQangxHoaGn50IuosR3F6GuxCuCcMUMYy4MPHMtZ8n9+R8K8/eTRXDfJwtBsnvE7LhCLMy8F3HZUUUOXvDgT2JVkynQQMIrjoXLJ0sRexwi4QnkcNjfZY8LA8yOZC4f4vU35H/AAmPcLkNTUD3uExMQi40PYv6Oyyy/hvgzGcarRSsbKbMbovUQl+itZ7Bbapio8lazoUKxZdF5G6E+LYxY9DjZlZax0bFGPPZ3wfBePfivleI6FwfuNhjSExMRZtFjyOgf+h0WGZPYqtlayMk9lmzbg1sf2E3sNdmOQahQi/Y7/TDkrKh+WYw/ZaXZfobk4bgf6fo+iFx34lNcK9878Xc/PIpytLUXDeRMYTLNIUVDD9h5YLsZtNrMG6IvWsjVN7Yxu0wVMaN0aekJjVIbbDVZlq0V8jrgw2jXZ+paIXZbGMZhIs/QqMLgh+C/KoXga5bqNct8aL6Oi8Gxhs9BYwxZdFBSrZeyZaTMxbG7KE/oUIThmITOmKiUXoyiDA7EO+BCDE/wqvgnpjdowE60ZaZlFtQv1N5ROXg7KyLSr14Nvgp75XnwqOo0NUuD4VUPg+S1DK8kXC1QkMYouhD4hj4PWMMTEwdoSI2IjAkMj8Mq3Qqv0dPB7BPUKqzPY6bGNi+itCUbHRuNT7LYLCGy1jZGNSzfaRXofKuSh8V4bFz6juLE/4CaM9ITixP0MTxAsn07D5DGJCiQij8FhOzqFCZDHtncPDG9GOypRiJvPYsRBppwdmaR2NZSZT1Kobjb4d+RFx88HUULXk+zvjXGsC/Y+mWqGd8DQfooSkMdmZWWQ0ZEl5GCcPsEeyr1Na+xFIyxsRA1RcqFb9G70JdHrP6B/oWkMNRYN2LYx5P1jKGqj54L/hrza4Px2lLRi2jTGyJ5LH/AEzj2hLRfZvgTP8AoumaO0Un5RuZjKkrsxP6FuzK2IzxofYy48cjxFcVWj/iIv0Q1Yg0PgbdjdseHC/Y9L2ypfkvgoq478XfioqOv4WufZYJlFGLexv9NmkWNg2hPQlZMR5dCKN9jpCFFQRGQ+CXgJRWTUSFUhJ2JI16K/00P2Moe8iY2VHoLS+cnN3rzrl/hquPfm3N8u8jFXQatCLHEs2HqNhIasaKLioUJjsvA1Ymeix5LKaEvcUKmxIpdiUNQyGh6LsWBoz5BTqdyklwoXh65IXKvGooqdi42PQtyaL+6ZdDY1M2aXwW9mhllw4cXKGEcWCqHTZcOKEN4FDUPcNImyMeEKW2IXdL+Eo/vyL98Cz/AAtca3RTviLpGD/BMaz5waKr4NjyHQ/zD9mD/CrsaNmaLlljuhIKxecQghobi/Y4+IWL6EaeTBGFrwdz/Zf8PvEdeDXKuL4UKep2KZQWhoRiJ4FkYyYhMWovOCirRcJFn+GRdQp+h5jekPgb9GqCJwsF5Llio9ihmjvQFp1qd8V4rlcdc9DqEXw7ioUV4H4ehDVBYZPawNQ2RhQcsv2WKOhqxLKsDN6HngdRgs0srIvggrU+j8I1PhZcXQ7eoPg0GrR1D5k0TL0UV/JcKfsLXgShx14nnhRXFLZdCKfDE1D5NYWBhDeYwFlFiKHbY8CqYhtEtCEkhNNstFpZRSCVQ47HmX/Jmh4GMqFiKUljgnN+e/JoriirXBbmuPXmsbLEtDR07YlL0Q1TE43wLQvotR1gsYGQkJlWUW/IXcIYZbaQuKMpWCoo0xwslcF4tjexMWpFyoY1C8SlyuLPk6c14L5d8rhqP2RcphrYwo7dDe51vdCfsUqSVx8HBLK2GthYfhBplCZioWDqGHGGwN28GhC1LXS+iC2sb/gV4VP0q5t/xW6lvI07QVam1mPZlVsYWhxaUDqOhv6MwmNFehfsLgYZdaNMDxoTpl2obKhliHBqKVgtRfo9ghM1JsbZLawwWcCXhBbkJp6fHqL4V42Ljgl42KbLFwstex9jQhy7Ea7L6qr8LmxUduzCWsyMy/5hmU3oaoo2XDK2Pww2NeShY2ZMsr7P2PHBeTFlt6GLCP0Wexj1aPcVM2N3oQQahqMJehttCWYlx7GRoQtaaxfA3ZS0NW2bgKlmyyqGv2KGzThmvDfL5x1yuG4vg3UIuLXs3aCt7D/Y72NbyHMWvIl7EkmeqDmxQKg1i2Oj2WKFWC3s9x+C7A+yPHMbGX0g3SFtJD0IrfpGTZMD2VDMO3Y/cQ/pao4bP0e8qTpjGfgxCGVB67qHfY3ZZZd/QmKy94HVmDInkux4N0Wd8eporl3x1c3+Q9Q/8NkgjebEOh9RIbOxpVYy8i/s9Q3XZntjuMPexNl2XZcYmXRjP6ofoSLCu6K9irBQ6MGxKlTZ7lnwqoh5YyduG38GYtp0Ub0YeS7HoTdi2WkhPtMXVFOh2Wz2FsRMZLzAINWW9DuhJ6KosTMNju2EuhfkMEkI9qFVYMf0gl5R4O+FeDNDrk2N+zYJgUboNcMaZcOxSDdlwx/pgoXBgXKY+FH5CRR+xZU8BSVJl0ZSsbWCvs2oa2fgb/RYC6MtFlYxRQ7ZmBulYnYsoW7mUJGQfqxvIkNawYI7Eh4FQc6HQUYDO0UeinDwNQi7GhMgjUxLnZd6LLlcbi+P00nXBCW9FtTtjXYOvLHPbHfsYT9uCfuDF2X7HDGWN4Ghw9CQpR/UXFDRWydQSi6hQxNNDUdZhjdj5GxssZmVIIeAg8tjDbD2x1i4YSLKMYsChNUJZiiii0f4HiNe0Y34bLoTcWNwP3ULJ0P0sR0PsXl4Huyr7m+feS/3lsQu7i1Ny0stifuFDLLHNRsdG4Ygo0dGAsw6ENC2Vwey8iFmQ2XiG45eS/YkaGLxCGxqHwJiVx3muDocUzg2VDRRpBROxFnWRuxFiYTF0ZxYtMooPSs0DE+PUUaOL5DbvZkxqHgsuxRYiorJsqorI9CQTxFGoawbFBaFFYgt3Gq0VSEXnY+czWIPMTzY+BhbgmX6FsYbbwOZgExgziu46G/wepVDUNFHYupo7OhMbhDdFieItiCKz2O7uxLZXc2a8HGo1x+H3j0XfCrGhia46mg9wfIhCHIWxvPJ6zAsv0XUXQ8zmGyyynRdot2VCFmTIJUMZoJF0VFDEr4ZxIUMalgXIiqOy5vBc2LCsNcD4f4PjHDs2DL42Jmzc1Y1Rs6ix5Qo9oR2XQslmBvB2KGQv6k8i2VFkjnwWMOC3ZVD/BIcoJWoK+xG0QyeIMYuYeBjYxqIX6VwoD/RsW+GTPdZRSso1yzYoXCf+cNB2dw2bzubhRQh8KKyPBVlaOjubHUfROjMXgbikbQUpxkvSNUMM5C0sH5F7FKgVGJEJRKhJvqCwS4LWUlCQ9D1B7NRMW4rAhrBe43cJR0PBmxDwNC1FFFFRpxR1wlTRqlG4cBuXmOj4dHcqU8m5KF0xRcLQnguOw0FmKEocMh4HrHefIeOhINrHQdS5YTeo/YJUtCoWMWhJlQ8DQbI+BQudMP9HrgxxKih8HxumWbY3M0ReYY+R7FH0oU1Qv2Ghsrh0OGp3Fi0aG4tJFgWdwliRcWm+R/myx4QqdDVLIrnazDhFsWOpjqKqtCXsor2LQvA5Nh6GqLhukfPLHrJqLfYmDb0aRdH3hV3+DjZQ1n8KxkUhF3w1cGYOVNWUVYtw5UVDQv07FCYHlrIw3Yw2DQThYobHkcfCihDFFhVCQ0hrMHsorgtS0PQ1IZpB4cuKlUnsuWz8FsS4fIUaGovAo2IzVzzVyxmyRei4UJZh8F+8Kixif2DQ4TgcQhCE6lw0ML8Kl6jUth2hcSCVcMkODFsQ9iDqi4ZsS7soQ/wWbEpFTd89FwkaGw5pScdtclFGoZ1GxS4+z7tma47UWtYNIQhfp0UJUVoWBorBQ4WyyzsSi7cUJFRcNjHHcP/AKMXga3DZWBG3nkOhxuLsUdDVlSng1cbLNfCxQcUUN8PnBuGJlFllRkjQ2PY8iZYmPaLExMTFkUMeHGxI74NZHlChKGjYhIUv8GOD0dTYVC7WoZ0WMT9j0LLzDuE7izcacbnvMX68K1jl6HzGX7Pxy6h5juPnCioas/2HhuEJ0yh4GuCEKWOEKVFlC9iismQ6FFVxY2MbGMeTYZeRMesHyUVlmhsUBaKO+blSnyXKUb4bCqNyixc7tynyW0NU5exuhM2we2DqCE4+DHQmJiFFWfoor2UKwVNT0Nl4GJLi8iWDQ00dHQ3SFyJRZcIqxeFQnNdEpzJ8EMWhcO51rluUCyUMeYYTyZ6GE7ExG4q5bHY0/I9RUMsv1Flx9l5GMcKtjwNtyv3glbsWo2KVg6OhPhsup7OhtP3h2dlif4QtQzcNwoRsSh8Oij4f2KpzPQtrJcE+GixvR0mKF+zU3KEI+HR2YHDdCeB4GxyUa0MSKO5b9wTgsiQ8OEVZXGuC5W4bEUdjN0MUIXC88LyVgoSmy8y8i4HhizuGhljDHWessWpZUISyKOjcMYxs/s0XHRYxjY2bYbsuXnhgLRY0UWbcMYlZRoubvg52jzC4a/0Uvc6jSOo0xCGd8OjWirRQkUaOypTGSzoWNzRVGmfUDE/wSE0fGdDKK4XF0Jllj47HDGoaov0P9LGxYhGi4ahbZEqm+JYjfG/SFH/AIdH0bnaITLlcxFmi/RfGo/s7LO+O4T4MW2J9NSykUYCqNtNaKdiX34UWXzqGxutlaPaN2NllwoqOx9mRAq6KqHnkLn3C4b56mj+gLQoszYcPRR8Kpc6Kj5yXGiy2hL3L0fD5CbE/ZRplfsY+iR6EVnjorhXBpWRRcWROw3mFPQsqHpFWFoUVNCXsWEOW/XDZsoqKyUZijXHSLIpesx5mqELA9zZuKOoTjajcrillWhOpexy7LqCqKaY2siG84GO0JH2XCajvMX+jUaNsReBr0OexhncblMiQtC3HQxYKo6ixi/TSKsRU/YTAxPksmP243GCCeRMsZtHs1DhcGvZdF+yzfCij5DU6LjYlwXQnDQ8FlFFjbLo2wI4CqVMT+x0YGreS76G1D9Y2G+xsy61qFlwyxD/AARRWSsFl2WPIoqPhUVFFGhRWY/oQ+NmyhsxcktGXkTEWbSh/BDlrIirY+VOoNFfSjD9Kd5KZl1QytFktFP2EwsLexawijsX6Y94NoP2oCpZJM/+oZSkCxe5EWN4ymLE9TNF/c3ZCUvQ9TC9yDcMR/UKoL3xEXtVEYbAlseg/Efoo9yPwPgXehfgW9DL4iFdrHaW9jK9bRUHTsXuP2H7BUBjUNUKHglCeBI7FK/9MMX8Ko39jfp74vqfjHh0VQFAT+sRKnv+aH6VKnoYNT8Iu5S8n6pi0KNB+Ebeh+Au2olBfsP0T8MFd1PyCG/MVdIReoPrD8UfghI6H4Cr6KnwK+ilaRX0IPwKeilCl6KKehqkUvRXooUiiioo/qK9bO8FfBqHkUVYkJFFIwVFXsqOuHZvgmFC0I/9ChW9C+x+CUjdipcsTMSt0j90LStrUI+8dRRUJamNLf4UVCWtvI1psuZFpkiz4hIloEtZmuNCSreho1mf+ylxoriuLyJFeJQoS8D0LMLwa8DWheMDYFg/ys3T6hLhYkUo6cB6GJe0xEhW0FXlUKlj8IVdlYndIUSrobsDQw0lYtiHdKhK21bKN2lTNn0pO6StCt6yKzTQibKHWqGt6VYG1bAha7Es7y5gZWlNlBCZbMaCzrYioxgO4LDYTXQoq3gVlJKKJfTG0BFJoRCYqylQpWZFpwYirIdlSRRUUUPhRXPfj7K8NQvDgkIQhf8AQxm0Uq0hYpNJ1oYmzd9FujwIPsWTH07LN4E3WWO21iDq+j0NsZ0rqN34CU0OV2bDNINQ9H9wbzYLQ3/TQPSDW7Ru6CJt1/QzP0dh/wDo0fIWjYTtoZME2Ale5eJLELcaTQbBn+gzfn0yGxeDf8CrL5bFKmzcVFRU/wCidCcUP/ji6tuKOxtsM9Bu+xMg7LsstPJdF7uxu27LNU2J0wx9gz0Ynu7GejY23sY96MKdFtC93eS8/SzZYlaY17Y1aLqyXy7LzfZYVsbbVWJ9GNneBPR+gnkbvstd3kvsWw9Db2E2ljQnWmNn2JtLDL8v+Fcriy8C8KfPqdyuCYuhSL8jU7P7H6CatntFGsFnRVOhqj8Q+Rj9Q+h1Yhl0OsHQdvpsfg7FRWNqSstshvKhsYmRvkzov2j9wr1kV8iheJay/wDZbBYuYbPQWL0L2H0IuNuhsoJuzc0HdhmxPIyKqZseOCvp2L2Rn0Kwp3quhZ/A8sF31hQ/JhD94NivyGI/zFI4fsqYCssIbpaHifsXVoapFPQmbESHDeCxiW8Cllwbp3RtGhYLuKGWIRrRay2Zm8ssujLR8FgyXow7LbjZ+GBduLixsv0XYhdC2Xlln/hQbyK6sfqNt7F+CW7GWkK2LGxuzRdssbGzuKr22ZnwQJ4H+j4HUJCLnkZwm7fVmF2HkXsuv0Jm3gumM2h12XRkssY/A1t2VRP9Ma8sUqXyx62Es5ZQwPqka6MBKPpYxsq2bDMrLHTwZGhi412N4LFkSEqGzYsHReI/RYxc/wBn+l5wV7LziLXqDGxq8+jFYLToX7G/UWJ9irGhrtjd6whH/S62O2tCWIov0VVjwsQzsutvoeY+GNFjzcvAv0y61ZvO6KMDuhF22JYHgtVWN0q3F0XHUUVgfoL9GepPsW+7ZvIKmyhV2LZ1kahjKtNl3lgZLZsbdnwxaEy4/wCD0LLNFu4sT9FCVo2KkrmyoW8FnZXoctnRdQsR0uCVn3oy4ZeBL0Km9hPTC2NY1gvDnbNIv+ij/ppDY/0StFGmDNjpYz/Y9GAKzmTL6GJl/wDRLJ9KhbFVLC1J8MFCzAvqJdjJY2N2qPRY3DX+SnRY8ZZmqFnS+kIdssqAW0NVTY8OxNFxkZVvQ/So60Xcs1yH/8QAJhABAAMBAAICAgICAwEAAAAAAQARITFBUWFxgZEQobHB0eHw8f/aAAgBAQABPxAPrst5XJfov5gWF5UoPNz4dY1RezpaeP3Cm8RDyl+DZSGf3L55hZqXLXEflMOM19ARF05KuxkCm8llfKeVXtwD4yNl8Rzf3C6P1Dc8kra8f7il7EAr+4UsoXexFXUoO7LPMt6BKu08V/GOSiDvqGwDxD3ELYLH3/FYb9+JXaJoZGkpsR3jKLlXdQVQQu68xLBOQfGQ6Eub58wrwnqRMqImf3K7uzRrFiFjKt7cMQSxX3M8Et6CYN7AA+YDYE0p6gvuU1RDcYkHzPrYBW+JVwm+Cp8dlfEt5SvmVTvZ21mUe7yFcX9QqzzKpqoKtIDdHJQJgKlAq6Zaqr7mEDw4QAXcMWZKS3/M+TvmCSqWm2qqKhV0mP8AxLSl2+PMs7FKqvIBoQLZZtrPGEQqiN1eSmrqoINcmDZAbtmaBbPAMNXIWjlwF3qOyiclCUgP1KeFR+PDEGxjLVXuaZGFHxv3Ae+WfHlHAE8xLSIypnlVdllbLG7RsHIA21b4n4hq4XW7PpUMyPz4l4xWslL4iJTkUMxtEgeZqYWMrOTpYhsOjELk0e2aQclipHKj/wCeJw9ridvagJzkqiCeY+YFqhXDsacxfMbq/c/qCdKqVYPEaIqJQSp4geeQXWIvOkUuqm1F4YCr8MAyKF9ynowKcjVwShwYqyv+onnq+4hq+ym4OsVjseVKrsuCL4PpFosLSw+LucKvwYGKhficCn6NmoAQ7AYXFAPAQQ6fwwuxUe5c2W+JWUPZgFyBY/UA8g/UFvWz1A5W31KMMgqKmX4InzELfoXKABfVyppB8XEm7PuPQofuC21qusFrLX6h1CwO0QGoi1pTnSahVisq+2CWUKfmK5cvS+xGmJlUv7nkpCpUUgGGei/coq7+6gDd5LCz+Km6P7mGDcQfMsspuKNiOj0e4UG3JvRr7ll1T5gZjYOgn5lfNnxFAW0sFNin1FFzkUoFohLGKZ7mPHkenj5hxtL8Mar38jABTjLtKBVScI0VidIcbFu8iAilDOy6a1PZqXW1/MJKDXgYU6RPuoLLmBdxPFB+5Zy7lhD5VDAh+biUEa+5QG0K+YmptZjhUiKlBPKy8/0MA4H8x6gX7ZjafwwpFInIg8/LcCaYnTo+YilP/E1UjvmHFF+LnBliUL6l/cMIXDIk0Xv1KbAo+iWwIuUFPxNG7QjyCvuUvUHquwjrOg6rzKOun4gSjXzFroI1AavtyyKp5SnvWeIU+ZuvXK4S8Vv2T51Pb5jRoeviVhK+9bZe4/2zc8YYpX7iqJkjWKXxK+A+R0lgAJyC/bEOn7nVZfEpB9iACMvm8i5yr5lIoCXMv9s/xAi2yw+Yhh5CNqL4PE3iw9xGtHsZUU33KjwsulLZevVy+fmWdD74QRtaebYYpYc2a6zCLsX1EpR+BhAVHdgwptRbA+JY9JYuyvMaWrfRLaARSXh7Y8pDylCip/3ApW+j2ZH6kxBXCjbnq5tSfuOnV83FF4+qQYCJoJR8xudPuD5wiXJON/oTyUfuA1oPDK1tx7YLgk2UzTnLmX/phWoT8s+G/KAFHHzLdtXu5XtXteRbfF8xvLCuNSkW29VlMnXzMKtPh0l5aeyDcEXaw+7htqvuKapTxF6HX3cSUE9McqtHzL40vl5AAWX7mHk+4RGHSZBLpXsL41HCjzMrCU+YbniW9OkMQw0t2/fiFpf6gfL9y0aobhdPFmx1znxA32fMdQtLJSgmaVVTXYUzdIULvsoVZjLU4h9S2VWdiO+q2IUPuBPhADn9xCbOM8yiqQZQwVHRZcpbR57lIROzBUoZhvssuqpfiIOQICz0xZ2LPSYQAvqAJR33Md7EHG2VTfMfAMg2qchwgAquRBtUCqS4h00Sl27fuVrM2aH42AXRb7ZQxX4lF5EH4EBBRV+/U4SmmAFWe5WrokpT/wAROxMqhqIavSB9VMGWXEojewQAabPlKKcsmtnWgESipZKYLrst4kBAdh4Sl7koLolD7iqqzIgQW8lLSAso5A8ZE1rnxNsWJffEoerY4Htw4vIgbWx9w6Zd3rAJXagA7HbgG3ERXDKD5JYoMqqiOePEDzkEOwDAAwuoepVmTqhyGNE6YttVH1ycJx7NqeJSa/uY9gHj5lKDUBVZX4Qs55nkZW3E95AHk6viFVpcLMjc67Oc7N1AF3SfHuMH8y/c5PbE3CiVZsbOGTUM/gV18Rqms9wKouJTLWln+YV5gGevUO+iAlMDbbGas2CUs+kOzauohVQ+Z2BUUVXJ2zkfGzr9RVaI/cu8rIViSmBpKdEQt8SqglJexaDPfxEveTxXZfmdnZGrvz7hYmPMqVQ3NWvkoGEoB+Z4Zcq7Pi5VMBbvGNBP6uXWmQqMiS88Tatl+Z227lF/URRuP1BVKZMRpyX+oowaIq60wuiFisaZXScKuVWsuzIq9meWe6g+vEEH5lChMnuryC0KVHezUIxSSg66zmdhQYy6l2X4lUfM8XH67Ls9MNH6lIp1ivwQLLJ9Ro/g9uCVT9xbjz+yKavYayztMvIuPzBF+o7FmWX34lYvqUdrkuDRh6Oz2jR1gt/EYE9RLdlv6nipYLLfVx2kjWz4cl14yO/I+ZjJ0Tzdz2msCdl+AKnhuWsLfiXDt+pfkiE5pHx8R/uN1s/qWqX7wl5kPI3Zrdy1QQ/7iC2wHFmxKbL3YFFoiGKepV2nmUP3KqK+4h3xFAl3TAbUYlh7jQWP5i39yl/Mr9xA5rG2n1O7PHzPzLHzUsM9yqK6ywVC1xiOU9gPTvuIDNQv3Hq+S6+bmepVmTLonzL/AKg8M0S7R87+pb57OuzTnJvifc3seHtieas8Rr1Lyod7BPMqcYXkUU8TekXOzjLEDjLsS6CGAEryQUG4KWZAFtVL97K21liiWZNMgFBONyunnxLynz1go1fJdinZ27gQs7BmNHqUVcSc2PDUX1hONsRNyPgOfxcFq2Dtz8dlppLfqWMWXfMh3Xn5h5f6n0Qa75nUfUs6ytPLYNd2PxMezv8AictAtdqO9agU7sW5GmgbAo7ye1xtqiiI3mTKsnIFojglUWfqVGZLUV6m2LkFX3ENoyyqOyhPlue5TelE8C89QD3HUqAdmR/+xxLZfL8Tz2DjLzs3D236lLw8xvr+p3xUGijpFYhB0Y9WGLSMzzNqq+oeF7Co3UC7PL6ZdS3Pc728l+a5PqVXiXSxds+oYBez8S8nmIRpZVe0AivZa4EIRthko75ituk3XsWcuFRsUcnI+37lmIoMz1sd1ljJzPU2udhi5gFclB9pUvOZDTv7nc7PrnNgBdfUEv1KL8z4jnzB5U+VhYg7YeJ8ZU61PSpc0j77E4ssmGkts9MUB9y3wjm+2G/9QshT6BFFQi38S3Uujs5V3GC8GzxSz08Qv/7PE8/Esug5Lo+ZfGdGjJ8y59xj8M6wi15jeh2Lu9mJcutKl0NeYNgzux/qU98R8US2SrhnYy/jY8D3Ao9wrV1Pk8zIvEB2ZbC2wW25+YKRo2Alwq6iWPMUeeZbxCXFJgtJnTzKLtlZ9yqZyVTXSWXlIEpL/jrE8x+NlArzFvfUEezWfJyBvI2q8lVRd3FyWnmd+Y1dM8B+5fm+wu84Rd5s7S9j8kOzizCXDlwCvmCBoxsO9jmdZfhlU7AHZ1RFfZdtVRArqLa7svKjQSrRE1TEAbO6bFeE0/6hP6nwq+7Dt+ZvqXW1KW/6S5bw4wX1DCHtLtyIhkBWc5kUxu6IahVMOTPEzsK5fZdRKbFB+iXdiUlocWL7gXLp2LtvYKx/+RPZ1SRz+BSsNhXwjV3OkvK8SjzKVL5EGhs8Utz5hX5YMSFBbAVpUHtn1OfMMye4IPexabBT7Z1+oUc2XThLPPZ4rzHnzLyiXtRyXzxLErxDG7jf4/8AbMvnxLatl+Z3ezTZ/mb/ABalQKbdha34jlPmBdjpv4hC2WU5BLlLtYIp7APFzau5oX4m1sM5Eoq6WFfQQ78Mr5s/ueNm3c51r6ijrpOF+WN8Oe4rkz8yrwhhTCvE2AqyxU3suZzZ+JtX5nj+5Zh7gNpyapuZdmVsf1CY+4jm0ky/mWiRbbSavwRco5FSjzL9w58+pTsR+Uv/AMQRaNZ6BMNh8SjzkqN2PUVdn05PBWyxTFy/E8HzLozY/BOU/wBTLuOlBKzci2VAfJky/id/1PHwSvWQqq6l+T6mRr1RA9Txc0/MPRv3LTz5l15g+n9waE7PUbgMb2Ym9h+4zXPBD3yvEUMggXfZUDJ9R9oIVkRSCot08qAvxG2zrGeOSgWzr/G1Sz58RBZ9oUeXLsDzfI9fOTLusdYJp4YhXN9zcrJYNmz85LpGFHPMqt2JpmgZBficpmNjkqnOQ0uVWcPmJXz8zaqUGnmHs0lF/EpLTniNwW9ljzWIRtW+IzXniNUfM8t9nf8AudkG38SvPqYve/xreEMR9wC6vIGm3LfHjxyCXNuJbUqj2nMnj18x1bpLuh8eJVKynEbv4hVWfqffidYT8Qs83cGmplO/wpek67ADnuA1ebLhkRXz5i4XCjXJanqN9Ga8m+IW74i2ZkD7youWy+VOZccLqWdfPqU3N1g32ePdzKyHv8QVb5C9vzHYCeYlWO2jVy1qEfaV55XiXeHfmOnKIVdXsrJVsO34jXmF38xqxvk9V0lH5lXkoeZj52K+sjTQRMZjRyW1Fc0lvxKyhl1ryQKS+kxvxDOQbK1F89iqk8sdL9epY8sl2UM4rn9z5e+46qEGXTZK8+Z72rl7F1yWGG/cwZ2Gr2Sy6Nib3JQXWy/c+YcrwRv3kpppieRwnPNzdB3ExnWb5iVRCzGy6cr3DlfxyXT6iseGcDc/hM7KJZjPFPueM8Sx72ODvYqUepQlSqLvn8GxPzFzJYyBuwfPIgFsdfuUOXKR3SAlpqVC7p2eHwkMLvsx4xTpPxLPH8IdW0mXnJ7cho7Cq02PpiML3fUPPIV+UaWznjP4v0Roe0xHD6nizstQssqW/llpiQTx2X87Hv3C1krkx3pHZRbbgVvmFPFT6lbdzJVmwo5LeSvKWHYZ3zNlb8TwMIuVKAuDTFtnumZ6g8e4eS3MTZjkLr0stbfqeRwjmEW4X2sn6QK3LlaS2qqeKJYc31LPe+ZoaVLuiN9IzJXl5HYUGy7liJOcJZaqpvuZPD7n0yg/gosjUyC6rsrK6hk89lBvirm+tmj7ltJ2Dnmd09w7fGaeJxAD2d+JhPPhnJSPE81GhAm+Z0a7DhWzjPnxBPGxNjL+YliXf1LOEqfUt9bNtEj+o6bqwefUQ7cHI5HtSqblB4nYYlRSaVMmVR2F2FdlgvzFvIMfmYFpL2LlM+HITxb5l2+4pTTf8HHoiv3Adb/iqjLum5ZRnmVdtGQGemW6kWjP4G+kbSjRB68xuqUsr3cBdqfPjzOis0RKlW2dmn1Pl8xrzyFfc338EGWZKqFLPF3LsuNsbvOQyolPq4+0zsw14nEDblCe6/jBd5M0wqrmc8kLo87LoVbha2b7ljpzzANfBF8w7QKlU8jsWhR2XkusudFhVafmZ9hOb7/jLg39StyPU+Z45c4Dcd2fHiAnYAQIXEE5vxEBRmwN+UYKmU1LsLJ5PiWjfBnauHrx4lN7NrYczvJVS+K/7j7Zstezn/EL8eYe7jTTcChHuxGAx7FumOsa9bMOsX35lMC0uVHhNfHxM8S6hb8SjfUN/MuYaupepRCzvZdMqmxl1fmetnw/LKVcEcuNHynkidpgKxqn/tm+IFWHYD5bleeTBW0pXn1PqP3M7Pb4uUZfIDLKnT7lH1F4ZQ98RvxCzL7Oy8sJc0fEoPzAy3ty62F3dXN+rmx9/wByz2sBPMxVdnCUHalNeyAa9TzXvYgV9y6sC4vnkEdjyZQH8FplV6lLxr4nzUbaH3PDDNhe+oIIF6MqGqpNlZ38R9sxS4p8pd65C7uGZTPoqeLvjKflGgvzLsBsY0dI6kLOtEwfv3Pm/wAQdF3IC40O/wAO0syt4eJ4EmQtDbmdTPMEMXYF6yIbMMloTEvwT72HJ1LyJNSCdcliaRcyc1Iu2+JD3KdTsdows5OvxK1WXtkdfdsoGiKnuyvJOpZF8HIea5BOdiNgQ2mVeRvzL8sdNg054IXVzeygXKz7lgzFshbnie4KUOk0l/MamjmE+v1OzhREbn3Hty72DZ6r+PMq6a0nX3LjpUADSCVQSp6hTfbqA3fqPbNueNg5ssqb08xIVAEp0/VQN3c/uUP2Txkre8lHT+Ox2W2WlE000JZ3xBWlNF/3HVHn3PG5Uvd2d3vxO/H+JixVDhezFbPPMl208iWQGqnz4loBLp9sFuqnHZX7lYeKlkb88iYh55OIPiIlVyIXqHKvYcninYX6I7dTXzAyF+fEvzUwL8MVqeRIZavYF8nPqaB6YlfKCZRkPUfU8NzKBhQ35cnA+YrwjwOhPNGTXsLqrybfGpY8ZnpyYt+Y6zzTG/KDwjyyY0XKmjU0NiSmrCWu2fMKbfMv8xxrzOVe2S8CFHXZr5mGH9yzYW7fmaVEVfU80+IV22AWwCq5HX+O5L8+J6CLsb9pH0f75OAh2WDbDn3BOsofiVvZbhADuylGeR/c2uXNOvM07E9O+LjbLuvUrxyHvxKMQBjpD18RJS5A5bkaUg1xyO48JrgufIlXwnjZ4p25j9zx693LspitXLttnhSyr3wwvmATs9pd6zY9oI4QQd7HHKlmg4TzyWLZKFJ5tD9y75+pnPMbDGXyZfMli3iD5ZV70iBs/wDE8Q3kOvWZxlHHfmL5cisv+p18RQzxKOeI3kq3X3EH1G6TzTPPuA0uZO77ij8kCxr+yHP+f4Wy9/1ObxfUN8bM/M6N9nyIN5Uc/jXRmD5lqS/ZUzI6l+YJ5ll/MtDZfrFqFu4+pR8xGq8SxzP4VdMcl/qZUyjPzAsE5H0SgbDvwS0N8QKt1+4ezIKGOzQtmlMc75i10l5hOh4ZVG9g3V+ZVeJRdsUxg9uNhYRcM2W9uVGuu2ZLyjZnLuAvclKqNfiLb6Jh9xmJCnI0IVvYC+Kj+oXVTfMJVVBSqYO7/wDJZW8uAnXY/qvi5njZT4lSrOx6RhowghiSyreTFaua7C7PE7nah6I7TcWkHstdrkC3GdjVfcNoOyujO9Z9T59TEvzPqYXz3Lnn7ivE/MbFAtqCi55yOmwE1gnklnauPtg7/D2fc+plfm5QPay3hyOUkz8Syp7E42F7525YbVQKLlLjybPl4RR8RrzyWJjDG7BQEIOIOo6hwmdOTum5WFfwFx/cC97cBRe17j75fqNv1DcOT5MTaCD+P9wfom+eTxF5ME37in5eZ8mVYeiNqeYsAW3A9awjmzxeyq7O6ZUE/M1llNuzxD+oct6R7cFa1KXTReRtzKmtPmeLi3xpnPOwvs4EovMn4uL9/ufMt8R9rzxO8JS2uxvYAZ2N2MNu/M80Qrz45EupxyWXJ4mV+It0mXk7KH8TPORdWEVPiNdrZ46QtbxmXkshd5PNrFFiaEcLnlYJS8ici7MqoVG4J5I2UjZ7D0t/MrxcqrDs232f2TGl/iKjwltV0ZQayILT32R9jKugiUp1i0wi8PEeYxV/ExMKlJxmjsT0yxirpjLuGfiW1b5loogfNy3Qiq3dz/2w/Ua+0BvxUzsKuY6ZDvqJ6hg+4UN+8mOfxYeJSbPgS5QC7lipe+pWbU+kQa16jtiGI9lImC299EY2D9zdv7eYayPFhApPiiWq2WV7jtn/ADOadmjUoaw3pRKUz3PddCL/AO+YfMCXU3r4mkZdbz6l+TMlW/Ut/EeJ5I9s/UvytL4l2xN+Ic7KbyDKOyqbJd+ajUWzDJamB+YcrPxHgcnSdcluORUa6EH8wLcg7KqLU11qU8r8xDy5KavtwQxiAJ48wpX2eogK9i/8ZShU07EDx2ZyCOVC1+pxg1uzyvv3Abxsr8TkE+6hynjOTXR/EDOS67yPPiCVQ3U79w/YR7Zkr3spItGGEEcrY7PqIJznNndj+E5vI2KCeiZf3Nr7iXzWN8mVQfc3DPyRpaJ7yXGz6YL0++xe0GR0xhkV3gyb9n5hmy9yJmvywNoX0lGoVwuUiz3LEAHhbK3b+YUQtLdiNG4JpsUu3vqAfNQoAYqV4eJjniXXD9zB9Ro6wCZKJRz3PvJRCnsbuFuQo7yG/DxDMI4W89SzR4jryGRvnIK5B8+ZusPufE7tRu8mvxBzMhyBbL8HiBG3GLewryyvLyAU1LFJQmd8wvjY742U6eovolqLFn0jWW78Efhni3zG6YOQW87H3C3JaN/5m13fmI9goiyvJ5lI07Ksv9TlLNdltUkyuztnqeFsU8SlfRHZ3GIhUqlzJZO8CaY1MgvPEbqcvNg5HtUteoEIHtJch9csD4hjy4erlagF+YoDh8wCjfxBeTt+YOiEl+WxuWMRwhaUMQMBmcTsQg8qFS10xLKAeymr+TMilKBYHmWVePJUxcPleRZSzsVpp+IJQdIHjI2rZLFHj8Sw+fxBLoGfc42QOrs0LSmFuJnZ0EKltpGsODA97c5O758Rbq/6ns9wG/xLunXifn+K8nGdWCcIjUZSpX/mBmRbAjhniPwm9gldqVmy8onG4PqdLZz4n5lF+5/RKGlxv1F2zZdRWTweYW4y8+oViQC1tvglJyViwPMv3kcaNgK+Z5sl8eRnBkuu8iYsECmAlPnzKhXHksYcnD6h7Z5i2j1N8wLK/wAxrEfiO1RyOlB2DWPiG7wlD298xABehhoWV18Q5t89eYpeSxX7rxBAnGK8MtzrzBX2NWA4JYlGwoLex8jzN4YIorqUylrKAO34glhphdvnYt3jxKLeRkVypWXh/cv6DwXk0jX8xrwEt7CFa9xMtXgnVOeLgVhbUrvtC+efmXwwbusm6G/UtoI8qd+JzfFTMgeJXUZ5rwQLX1Cr+Iu4WxWq8RXwEu6zsMEOEvxH3GvHPU2s5FKqBi1K6j4gB2kmfU6H8Aa+f9TuxvwymY9hWKoghrMuzrA/3CwvY63N6eWo4eoJd9ll2eY9j7mhNDTsxDzD2OSy9htpL+co+r9wzuy0x8xcZcK1W4qfiAu8+od/zD0di3iz3cfErdlvr9zkt87HCpgikEXIFnAQmFWEfbJ5KALil35lDzYi1Q0+alGdNx7X2JXNZYN0T2JNx6nScThcJ07EjTx5iotZAUKyJiyXfYF497L7oqWE7D47Bags7coS2zkaIPl2BMANyzWHqLvx8Qrx+IoJbuw5b5j6iVjL/nzOxNr3HtkRxg+/M25VvYCQx9R9OQtarzPiejFO0ZKvXzKapcmvmggiSq5D5jz6ghb79zzZ5hdZDzG5t34ieZblEL6k15kdO1iX3xEEsngEn2TLVk8FwVfUWok8viWeNuCb49R2qN9zXXJSqS/NxXjpcdCS3Km3PYyY7L97O4yhzfc5dS0fdy7PLXYcnr4iWu40WnJT+4UxY91AZEA3yTkdLbeZaI69wzhVyzl7BDcxhmnssXqoIgvPmNv4jrcbB+ZpT6lBZ65EqHItZ4rrAF/FTEKZlJdxGkKCHdgkzIo4XEtvzACyItMhfQuK4yxXiKpRtS1r8iIdxdFuO3DpAUBjXC4u05Lzt15lNUx9EbJ6QNmdeCYhJpu5ceTK+fcB+/mG3su+8nZVeYisoLhRBDpDtV2W85BKwthaaQXQ7NC/JNXm+5jXuWhNHKlL4haD1MMIO61HlG1Lo2FXku3JhRHCHYtuRDtV/uPuGzmd9Q0+YDYuV8QL+IgNS2vcfjJa1bKuWDLASoKZ4l/uX1uHllh4hd5yCI0jrNPEusjhRyCadojChF4+YgyyzIy2U23zC0Y2Eliduc3BnC1qLZdwabJQSpfUyqtgvMqL+IGwZZChy4VmolfEaAkKWfPxPCsuAC5hSyUrcli5sbbc6V4lae/UStpEvLgm9iNVr2UZyb2I02Zx1FviWgAxc3+vcXvrG1T+YAenxLtFwD+MciqZG+5Bi4bNe8jX3DIVfwTXEoIo0VU4zxHn+oH8CK21Ci9uH9R0hdZK/PuDZY88R9PfE63ZV7KDuSqd8zmvLlPhyV68SoG8WV8xX0Rfv+o3NyIXhk9l0RZVXXmPff1AByK34yPolviFeblPY/q5kLfi4Xl+Jr8VB8+p4EPVSr/MGhP7g19Q/wAom6leXxLBZGpniOx6WBnAWl2eol0Mhq7TRw5GnORcoZqN1TcsPFR09wNDddjK1wghOfmWSrnzH0EpyLR8xThyaUP4iekPDpF2+PK+IkAexr3kOCCbHXIt9ElikyxpBU8zo1UUy7OSrQuEPhLG8qiTR2vUUiWPmWeY2cntFeGPzHLevUxYq5fJd8VBL9Ssl0RbeXHelJL9OsQv4lB5hv3L/fmfP+Z3q/smdqIXvueOfUqj49zCklF4djsuy+rK8yqfU0LeJlYeZz4IfMb59Rq2o+HHyzniGaYTxBHnZ9Mq5vV7Btg92L6yF1Zn8ZWNep2jY8r5ht1Gz5lC12VsRrEa7PHWClLkC22L1yYl32LucmReEbY+J7j9BuFwa729inHanVwWoX7cr7lqnkLWiJa8iLduOhjfzOGbEG6dgjZgIHlsCQ1eRIPMEu0eRX8VPmrIA7aQHY0n2lnP+0VqzZlsdA7RFo+YFa8ljprKt+IqmjIlDAFXNZU0NR9DfmoAfQ7GD1G3sAAW+YG6JTw3cBeJFGiqnBqdNJeAHzcoF1AeXrKWz+4o258Vf1NqADcseEDdJbbcs9fuG0ePUuiWpfEiv3CtH6lK2Ddalgvx0mTx/wAzzXqDz+v+4KXzfJbW8mdog2XElpw7O4OylexN/FTy1LIa/L5i3Ok7rU26qXYW5MrOz5rsH+pXmPKllofUehC7X1F5OpSrZO85PxEvvI14lfGQhYcm6Tw9RoaL+EWG77yGWGYWE18HJZoGHY088wUzxCCyZwEK8S4uK5/cVxAhkRAYkUEvfqDtwLXAdrYVzFIp61O+pQHe5EFHjIrBshWz1Ci1p2FGzkQvVSy9kTHGd7AV8imCJCjS1C2GkupiN0xrnk0fEu1z6jUBlwk1hEuWmUxVlPzbK8DyHmElb9oqM9FiZKRrxN2XV+oR9GP6YlVWz7mhmS85KvSFPw+oKPxEHIepzzswnqU4bDPTY1w89ltN78xE5GiJ5jV974nyZctLplmBmeIk9m+4m3NTauGFwG+GeKg0+4tnK+Zd8OQ3AqVRk8/KFflPD9zjb2KesieGHAmXGucRb8c9zu1HeQa7K2jvqA3ssGROg8i5YJVf1HSdij4uCsgqh8M02UopsPB/ccVjbB7EVbjyJO6RIFPZdkAWQAfapYx4fE9W36lN3G/PiVdp0ey2qcjwLnwFy+Z2KSvHIVCJnYeFz28QDVeI+nIrY8YAx2b3leoAo7LBrpC9RFhGhrnqGu8jA+EQOPqMpa2GFB7ZGvs96qIFwGLB4RXKIBp9Repbvz/ABlTxHmRoDZlXazI4uXPh5PEPO+ewu4FHw+Z9x8/crY4JyXdNxImquWlbsQ+lQ/uZyuwlMMGX7lHY0Tcnj+pdeYO5v3NOGkdfYl1ETXkAl33x6nc8TV52YBTKzsSiXdB5n05EvvZWQ7FLaIG6JbrlTkEZETLqo7Co2nI51ltHVS/q6lLwqJQxsM1WUE15kcPcgDwT4M8QFoyrlDvGBeRQnJfy2Lory7G3M3zAFzZRUFSux86v7lRFIhbhdxPitgL9oE+I05txXjlymHjEWvT1NV+Y1lORDyWF+YnhqEc8RCyJWyPr3GgtItbxLYe5WoX9Iih7Lyv0Y4WQyUp7ZUuFY8mXOwxuAfuFXcavlzKfiBm9lFiP7nipnZTbn3PlPj8Qwp8wrn5ie8lnjsBGuzwVUybTUDL8zxpMLfiXejyNVOoW3M55lXG7rtniN7BNeKll1fYr5YOtGTRUYJ+YteZft/gB+ZRSTBLLgXpkandNlt7LpnWjJaOGTJsiqVlNRh7sAhbsgqAURHHfUCzFD5gir0jcyAi0fEFPq5wYhemYAN+4F7EUGrk9nZUaRKUyNrwGL54wRp8+ZrLnFbGlC5BAvS+Q1DFRcpVtRHh/4igZyUl3UXdlsP7Z4Fl7Aa2qjn/cVkw3x/A+EM8RBaaxVh2LqPMGitI8x7KIlHCNU8IwPGysljyjvqAyYUHIrWsKqY+DIuz0p4i1+ewrfM4+42rMgbphV/6mGGz8WQvb8R9E4zTYVc4ufEAEt7LHSWj8xb/U8aURBFRLhlyqJ4r3NDTCXZfv1KKs+pwr+57iKavYU1b9/UeZs3xHbPMKLLSwSvf1D4yXYNSsKl3n7gHP4vOQIqGwQGByWnYC2mJATRK+FldEU6F3FWDFDnahhjZ1pyBQTpNA57lnfJc8wHPUJonGZutGW6clPMHHzNGfmdcuDvcJZT2hKe/JrXCCy2mBu7godlgPU5PUBMu/iCKPn9yh6ZADMqBvzChLOPJG75ypiq2petYQSXDRK2WlniFNW7c1LYmFkUTvYLRee4qufmCH+4oJT7lRYTQsJBaLuWHnkHGUdnkdndPEFWuyjnGVX3H4jjmwu6gHzUqoZvmeKeyi9LZbwyd1mH4gq3UsvOk2/uXb9RK7KcLPUO0QfEUvNiqV/HM5ChrxUyqqVk02UcMtZbcp8kqetxil1i/M9+IcfXubXxNaqJe1sBDs6rzAR+52h2N5xe/UsFAZ4bEEeEAITgefEDVMQKvPEu/mVZW+RUqPhbjrY5FPW42d7Lbc8wTvlyENri7UqzHkPKJ4YW81Ch7sqSz8w7FyKMKPmKWDzE1PS4K+ZXklv3NHwPiC+T8yzvqCr0M7o8lW75mn6jNfEBLnWP3kHpRCXdwaqLz49xF2M6VOEUjEg06xQHLJZNZ8xWhbnhXIzlUP5jmlhRGKDewo1r0IbFRMuIniaNGQC7fxE9bsSubUKuP9xLho1w7Lz4ma8jV9qOXNu49PmPcWXTzYKbC5vmUq/P8ABFr0Ro5+pnhh/crL7Ky/c24H6MjVUXb6j61rso8ediGB72AssyXXJf6Y33twycyoU8aqY80IkqiybM8rOwR6YRet6fuKbeJZSW6iqyLesbavjH17lW+5Tz4jR8QjSO1couR9PiBsMLvZV+YFnuNijx4nG7qWwD1hFrV+IyXy4b7bFCg2DoX9I4vLLpYQAlBSTEuZmVMqyDYfxKXJb+4lP4g+5anply8Y10NXFfEQaiEp7Lv8QxFyPiEFn6jyzCVUrnmIaIgQ8RI2IWxCKDK+NC2ExXZ4lONwzyxNnjIfGS7wbhz5iLbEWEWFKOQWUwff4mefMKdj6JxDyS+XP7IHjsNErkosPEH/ADKEfIO+4+zvmVKMSDQyhlV1uf5/zBz1PY7Lx9zj39xoKp9zE9TuQ7sY5KT5lnnICzcu+S/fmIHNmuEat9uVH34iGkFrfE03wRQ4hLSHylqxfsIt63kQl9/7h1xOzcBPIoTQFRwgVVb2KMXEXNuJBDfiHHZTWMaFQgsGVbfmClI1FW2NN8gWjrH8YlVX5lbLS75KcclF7Sw1oZ5R8xoYlb4nx35llfGxJuHP7XGlzfcQFxEoJh8whwIdgYOkNlg58xTKZgtxiWaz4YOa1D9xDtVVzGCjkKlg8x2fwTkoUt5XYBaPqbLeMtJ9mS8r3EavtRfFw+6jnzBZn5in3kK8IPLEI8y2mSiKroj68/xRWPmEUnPMfXn3A9t/wp5gJTHk+JR+pW75hszpvxEH4nMdleSHuWVnliekP8RwjYux21wipohLXcjt3CIUvkW3OTeRd8yuxPX1FajLTNXpKd2ZfpQGeyIN6ksBYhwdlVZaeZhhSbGW/E1PgeeIVdsy9KmrSeC+IBazIjX3Ku03Np37nIjccAfmFdYVoynBBwe12I7y5R2JwdmlEDweIfosFG7uehUcSvMGXFXx8xLeYB6lLx/cHd0yhafmIW9gp2NMGFnTvqMsWK2umZgJqVrV2G4pyYleSIuwB7AKV+5fi5WXUfLzL3dmUVCwoje1k3JVFX+IF5DGefEarDZ68wA5VTaruT7JzSfCN1Xm5QuTjs09J5DxA9zCpY9lC0wp6TBcqFeZWheTrfuLWTPxM8QcXzKGx1hfFgXKgoY0kNdtV7Gx9SwwHEhszpHnclXVoeDq+ymhlRopGe00f6RGU0hoV7lQjsstDyjZsvsP4Ki1jbiGxJRxvzAX/uFJqXUzLlW7NYQMHxFPbZfasVjwnH1FFJtxELUASsXBdiHZR4ZDMHsL/M+2ql8Y437gFrkwrkV0hT8PEb0fEIewCRp1ty67xyWOeog4QXk2uSs2COJycnXxHULQy6Jmyh296VPuKimYxaAjbdBk2wGBZcwvOyvjZ34hdbNZjkM3/wAQa8X6i347yGGI8+IK9lhx+4j7joV4ippUGALkWK54gNHzP9Mezk7K8HY2HOw1t/ivEx/EyX0cI1VZPmuQOuRrCU7c1fmFjCLSOicuLBvnkAwiblhnIcg7xh85PYgaCaS1hmSNPmCvZVZ2Om4VPc0i62JVWkrUuRcqxUugeIDh2KC6uF1RP8EROtkEE4mxZHp5hKPJirbbv1D2YND4lUoONTvNSLgmSnLq4CN3zJXaKnk+off5lAN7fmKv4hrDQ32LT5nH3LLf9QUbq4lA9Q1jrGwvuKFDUKLfHmWojAlEIV3vILtMqF+GBTtJcdlw4R0PxcB8z5qDKqr4clZ8MsE7OXsuXDmw7Xqecilsx8Qb5ku2/EupWXjcysGZwOxuUZcTkt2jvfqcdnyQ0zzsT1Lol3zkors3g4QMt5PMf7lO/wBk9CY18yhIh/BEB9xrzFpZswbPKECdJQv+oqe9mivvkal3kRrIFHuAvYGriYrLnol0q9Jl7fMWUTRRDBi9OssLM9xTWWCnzGxuKrJRyIH+JdFNx5CjIUJWpx8JSq8QjdR2CPNREKzCWB6S1bNWvOxoZaGKfMr15l0V5nbgWz4F3FVEvPK+zBm/cV4Sr4wEo24jB5hR2AqFj1FsC4hQ+o2Z+5Va6ZqPBkAopaNwFA8EAruy69zLyHG0ipl9nyLiFomUdhKv5nFwsPiNmzbuBZdUQq78RdvxCvHJ9SzpKuL5iY9wLtvJv8HF54l3jKniVfyno5FfxB7Buo9utewIvkyDk/uVlhFR4JOa8iOehcBJF8Rmi6vsYKComk+JgbqakfBFdNyxPUtWv3FV2K0D2Lyy1vxE27yKI7LDetS2l5HKLyWtjyIYRPMSzIe/UWy4LUtWzGVZX+ZRfdlD0z4hytlVrGs8XMHOMbb8wKLLfiCVeDHPUXVviaJMI77QQF2HB+4XVnmKlMP6Rcdt9zSpFEocnnG4IhNgvvZQ7kXySlCHABlGPPcSwgC/EHXx4jJXWqlqHxDeT5JWxWsLh4sq4V4blZ7nzyFcZzfMuW8iKb/UuwOTlz/ieOQoKvYB5h+k/M0KSHb9RbM7Bf7mXfD5lj9QVXpZezzLjsrf4K4Efc0/MznmOP8AxLfEUvgtsapv1yGqwJ/ULp2v+ZpXZaKs2KxRME+I9sjPLATHZhpqmA1dVKFu6mnYg22/uWaLq40i4h7leY0F9v8Ah1pyPFMqUQbl1WyirX9T1TYRbM6yyvcq7fcRvfxPGGy6i1+eSl7dQV5CKKFDMQ+IANbFKIJLqHsDN1TLgVy1TRcMmuSgeATBxK+FRIV/iUFPMwfEOV/Ud8VUpQvOMrwMQunIlrOm4UKrxGX9JRrLBujKKfomW7ZUFXoEq7TPc5Ofc9EnT3M1UsPzHtG/xQxxmTxs+SXOnYYPn5mtYg2wLM5DlYjZ2b1LvY36yYStXsy/qVbTMxJ5PU6L+k5T/iF3hRKs7KbuVPVTcyL1LBlXAa8XPPZY9+orfOxGx3JcDMexiLvzEBoy8t7GrzItb2Nd8xSsJnKhYV4gLNRDp6hYi0rJg0iXTpL+NIti1+IIgcl7RsQ+JWfMPLyXZb45F1ypVDydj6MGj6m1dfMW/FS6aNmX3IX46SmmLnMOQTpGuzsugN8yks6TtpZkBFh6gX9uYsPvJ0VvqKPKJTR/EBb7DQmIryRbuNCmWs1+IlHK+Im3+IqfmdMt/Eow8fx1e5C6iLZYQh8ozpSIxztEQi9Y/DUGZNbQvyy1XAsd2WmML8E36lHvJbVSwl+kKfzP9QWcS/EqGA8eYuUclD+JVS/j5nTwXLY0qPCkGnly7rwE6eoPhlCZhAAYWupfM8xB2FHfHufn5WVVXXuNX+IYzGXg6Yeot2ZcdQCZ5ip+Jd9aJ9bKNbj0vJzE1EvA0heAQa12dKIuHNiqI+jHKuApaR5dxzAmsSp+hZS48TS5VtM+DUBU7SRD3sS64qJwP3C6s8wc+YyxgAVa3kRtWTEqKEHzBJrkLdeQwDfNxA0wgUPEVcyOlhUSmhUMtx88gMQotIYiuRDSUtvY5Z8RceXZhddlrrxHN8THkLylIjVTJCXr/CAF7sPPkfmWovqV/cwaey8iZ2D4g2UawurqqmtiWSnxOz6lLA9+IvnkAmTt+J2slA3PTz7/AIsGvYHzGg2VueI3S+4ChcDz6gEp8eY+yG86EDyT0/c4+p4PmBl+Li+CabC+diB1LK5cWWxh6BZfJdjChCaHmWqKzH8RsHplns26cj78TyRaN35l8p5BdYVyuzkKB8vqB0d+ZUJyfiD78wBL8xvMtdseoFFSjfMpSmUkFMoq/JNjjsvOfcwngJe3YnxHaGCBPPiN5GvEpPUZ2XZEpt5BKX3ds7XtIqGGGK8eoQw0lwjolNfuWpRfidvDkqFHXY28YRFDw+JQJV72XABXzMWwgbwC7uX4JlLWTtfECMsi4cP3BUbmHksuy5h8XGIfien0xu17EXf3KXkZmXOOMod8ytqzJbf8s2/DAaDGHW/ohe+KyZXYClstKzexxRsuynxNDPE1658wf7mlywQ+CIfmpQcJYtZ0X+pS77h7DfrxEueifTV+J9ka/ETKWBQjDaB+Z7Rd/EKmi2B3NNVEeMicDAXyK8Yi0N3EXDJSmWzZb49RH3fzKih+YZa2rIqGD3KFtnD/AJlXusB1J5ZCo8TWpyJC/E3tooaaxV05E+eMChE+pxAXJ4Kv+CyjSAljiOiYv/UvUNWImHzE4r8+IoYIthchWHalSJtSjTVMJ4tYijiIgrJSTwiVpTGxVWQsTWVHoSy2vxEU6PUo0QXICO9ioLUAoGmWxc/3CgVbK0vT9TAoypXTpLp5C+D2Fc8xrxA3ZbwXPKXB2d54muy6l6sAG+zzZnifZ2Gt6smkzka25koSPHusmL6nPqX8RDlRPmp9b8wtRubaymq8uzmOzh8zTPcFvY1Vn8FAZGiYWMay/UIPwK17h8aKgNvi5VG7LThUWCG5RbqfLz1ETYBo2oIsfmEFfaIBpku21UqLFPqXcMlpRd5GbZc73EQOaTSN1AVXuX0fzEERuKdbJyKd8S/iIjkU4fU9TsdYXR2WXkVYkP8AMGwkSj9nYtLH/COiDYuVhUID0HY4lSwoqC0dqWGEBi+puUZKACdJ5JmS+/TOeux1p31KnNqbNKmHNgW+P7nIsT9QNUECaeIe3IPQzUB+oBXWENOzv0hGlUACXc2Vo+IG54hbfr3MuieGcRfEQJuXdMaeSnrEOkDp5U+Sfia5NlfEzx2ZBHAqFCDLn3PFSmGTqys3fiWI3lcl0RXb6P1C7+JWff8ADI3lw5vuKHiHi44ZuE6PhkZ4+mU91M6EL7d3PkeQLdZh2UVeIJel3kTCmwEdgAjBBQYSo5L7S7yCWqpIWOV7gApCmwx48iA1FePcfvR8TUY2EC4hxRLBuQyOnubRZC6xI22H5ZYAKw7EodvsA4NPXiFRoPNy60fLyAEBZYNbBCgmmFMVcu9uIrt2FWJa17KAQb4+ICnxdwDfrkaq8Es0SJXwygAHXsKJSmpS9biIUyW2+Zqsplav7n4DNKngrI+j6iVmnuQAUHmIoDVjIcruvEHwtr2NEtohn3BQtniYbPrZSu8lZKomfqX4mBswzjDlvJa/ifI6/cw+Y6x15KnOS3nZ+Zjh2Znx6l5EV7VzXb2e9iHjYThXJt/E+JVk+ovv3EKTbJXqN+Z1HkZnLbGEU4e2CV39zzLuWhRALuBX8QoPMA17iiHIALK+YfL3wxSoyALUCnrs214YG1GmQqZo/Ub8/UoBCCL7fqCPhMSwdYbW6xHsB2o0a1Cw0/EBV0jSpAeZZ0wuYlRo1F4KL2XlGmBU5Cioh6+4TDCJCjsrDHxESnUgelxDBEK5AFrvzE8hKC/6gPHmDdMiY0kJdOSifDAmpZcaFp2IlnIW1Sk2FfmcCJXn3E3IMK1hs02MCEoMiVfiZXWn5lKqzG0aLmjprG6LJSd5OtS6n9xwsfxLHeSkFVvI9amx1+Jxh6h9w3m5OcmnAWekN+5dRMsi6MUNZK+dnJqvi5oqXUtW39QWwoIKtcZR4lwduC/ibezS3Pdy8JVp6hdcvYYhrUFIoanNEbcCvUr52Zbs0uG+Q6UU8gI8vuGUBR4lFX0mvHJTgeIF6bKEuB+G/Me7EBVnHiU4Ns4JPVRaBsBlX9xFIZ5SiNn6lCrJ/cq2fmIEAMHc7KYMjwMEAY2AsOeYgLlK/CSlB4ie+TG2N7OxuP8AM/cEJdwHWW7UpVv4mDXiDFA6gLFqADy+43T+qgPBHVpkfCsZ+5jS5SS7VvmL8wBT7ligWx35R4jIeHIo2A7L2rwiKog83CLmy7+oZsX0bH1Pwy2WZ9ykM2OFciLBWuQW+pxBreuRoL/qohnzOcYazzhEivOTwL5imJBtepZp76i+lTHYJ9/EsdVmEDYLlQdZV65Brx+Z2I1asgVnqdniHPqWNhY+4fy8+5W1w6NfqBb6ZTTSf+vUsmeMhv63Nx0XsW7uy4QFwBK8wHA7Arbu4FqGShKah0zmT5ZE/SBQMrkRZfjxOBuFrfUDia/4gtiUMO1X6uFbZf7h2HqoPPEDAr7iGvuG78SwF95BeepiHgHZ9y1/Et75MIcipviWVUq78kXM0gLK6+PMBY4nYwaeMAOxRsuJWmsQ7X9y8FSmrPEfly4VUqAq7H0Khy3zUYa8cnm/UFQ4SirLKeCIeWoIzVjV7AKpLohQCXNnFN0yir9S5bcsy2YOXsWd+ZWyjx2Lf5gU3Fbu4pdbh4JVHKZ8yuzvkPiPqo+DSjIUNHYrYXjDly6m/ZCtT3Dr4jaevUoVZNugigbydy4VwnvzXiCpfJ0olM5dtTschV+JcIhKC/JK0vzBWSjXkoBgaeJY8V8RIqucjYuepY1ewpgK5kJp1Dj6lcRBrmXOPqePuGlnSUAaficG7NN1K2BqwiKPvxcTYMd0OBBLCclNfM9BvxEnfMtzqw8IBgNQsp5LPDyVeq51TxjipWz1nWubGrrzDl8uC3djTBbllQHzU1KGY87KK+Y2N+Il5HzcEUKu1cJ1xYTwoPUTwHY0qbLZa3piq0t/qEYUGTb3ZSYm/EolxNmXy479M06VUeicgJseTXwlrdcP4PmUXD9Sy5byeGBnZYTJR9wwzsKbha6hrVMuj7lY7Mnc3JV1UaK9ToEinr8T1fIas8xihwirY7+Yf6jGeS5+Y3Vdi03Aae/iUAP7i0H6JWm9OSlrw5GUj8xL7EdBWxWl1In9yw2bEd8y', 'USER', '2026-04-26 14:51:00.461');
INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `passport`, `address`, `phoneNumber`, `image`, `role`, `createdAt`) VALUES
(2, 'admin', 'admin', 'admin@example.com', '$2b$10$g9dQ8Zo/wBS1hbZx/1cVEetZEOSNxlQOb0QBA3ScO6yWh9t/z1w9q', '25362514', 'jbal jloud,fathalh', '24420508', NULL, 'ADMIN', '2026-04-26 15:36:52.706'),
(3, 'Fedi', 'Kanzari', 'fedys22ka@gmail.com', '$2b$10$6s1RNjtfTIGmWee2UvPgdeakWlTnpydWGO7GRm5oWhsfXukXvtqLm', 'sssss', '9870 9870', '24420508', NULL, 'USER', '2026-05-04 01:20:18.010');

-- --------------------------------------------------------

--
-- Structure de la table `userannouncement`
--

CREATE TABLE `userannouncement` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `announcementId` int(11) NOT NULL,
  `isRead` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `userannouncement`
--

INSERT INTO `userannouncement` (`id`, `userId`, `announcementId`, `isRead`, `createdAt`) VALUES
(1, 1, 1, 0, '2026-04-26 15:37:35.473'),
(2, 1, 2, 0, '2026-04-26 16:54:46.720'),
(3, 1, 3, 0, '2026-04-29 21:58:01.854');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Appointment_userId_fkey` (`userId`);

--
-- Index pour la table `contract`
--
ALTER TABLE `contract`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Contract_userId_fkey` (`userId`);

--
-- Index pour la table `dossier`
--
ALTER TABLE `dossier`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Dossier_userId_fkey` (`userId`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Message_userId_fkey` (`userId`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Notification_userId_fkey` (`userId`);

--
-- Index pour la table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Payment_userId_fkey` (`userId`);

--
-- Index pour la table `study_in_italy_forms`
--
ALTER TABLE `study_in_italy_forms`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `timeslot`
--
ALTER TABLE `timeslot`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `universityinfo`
--
ALTER TABLE `universityinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UniversityInfo_userId_fkey` (`userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Index pour la table `userannouncement`
--
ALTER TABLE `userannouncement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UserAnnouncement_userId_announcementId_key` (`userId`,`announcementId`),
  ADD KEY `UserAnnouncement_announcementId_fkey` (`announcementId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `contract`
--
ALTER TABLE `contract`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `dossier`
--
ALTER TABLE `dossier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `study_in_italy_forms`
--
ALTER TABLE `study_in_italy_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `timeslot`
--
ALTER TABLE `timeslot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `universityinfo`
--
ALTER TABLE `universityinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `userannouncement`
--
ALTER TABLE `userannouncement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `contract`
--
ALTER TABLE `contract`
  ADD CONSTRAINT `Contract_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `dossier`
--
ALTER TABLE `dossier`
  ADD CONSTRAINT `Dossier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `Message_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `universityinfo`
--
ALTER TABLE `universityinfo`
  ADD CONSTRAINT `UniversityInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `userannouncement`
--
ALTER TABLE `userannouncement`
  ADD CONSTRAINT `UserAnnouncement_announcementId_fkey` FOREIGN KEY (`announcementId`) REFERENCES `announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserAnnouncement_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
