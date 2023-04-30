-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-04-2023 a las 04:16:28
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fotaza`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'DEPORTES', '2023-04-25 00:47:38', '2023-04-25 00:47:38'),
(2, 'KAYAK', '2023-04-29 17:32:44', '2023-04-29 17:32:44'),
(3, 'TIRO AL BLANCO', '2023-04-29 17:33:13', '2023-04-29 17:33:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `description` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `ImageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `ImageId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `resolution` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `format` varchar(255) NOT NULL,
  `watermartk` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `src` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `stars` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `RightId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`id`, `resolution`, `title`, `description`, `type`, `format`, `watermartk`, `tags`, `src`, `status`, `stars`, `createdAt`, `updatedAt`, `UserId`, `CategoryId`, `RightId`) VALUES
(1, '1191x685', 'Primer post', 'Una foto de cuando hice el login', '1', 'png', 'Mi primera watermark', '', '76a969e0-4b75-40c4-a272-68e713d9ba58.png', 1, 0, '2023-04-30 00:45:01', '2023-04-30 00:45:01', 3, 1, 1),
(2, '1026x514', 'Segundo posteo', 'Esta es una foto del diagrama de ER de net', '1', 'png', 'Fotaza', '#Programacion#Node.js', 'ab29be8a-0af0-4169-8624-26e2b5f0c0b6.png', 1, 0, '2023-04-30 00:50:42', '2023-04-30 00:50:42', 3, 3, 1),
(3, '200x200', 'Tercer post', 'Una foto de perfil cualquiera', '0', 'jpg', 'Fotaza', '', '578f7b3a-f82f-46dc-a4fd-9400a318737a.jpg', 1, 0, '2023-04-30 00:51:58', '2023-04-30 00:51:58', 3, 3, 1),
(4, '225x225', 'Cuarto Post', 'Una foto random', '0', 'png', 'Fotaza', '', '52d92d8a-3973-41e9-94c0-952f0dc2be59.png', 1, 0, '2023-04-30 02:13:24', '2023-04-30 02:13:24', 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `stars` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ImageId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `likes` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `imageSrc` varchar(255) DEFAULT NULL,
  `portrait` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `profiles`
--

INSERT INTO `profiles` (`id`, `likes`, `lastname`, `birth`, `imageSrc`, `portrait`, `status`, `createdAt`, `updatedAt`, `UserId`) VALUES
(3, 'Comer papitas', 'Carlos Amendola', '2023-04-28 00:00:00', '4d231acc-e7c6-4139-86eb-ddefe642467e.jpg', 'b83f68ec-b9a1-4aa9-934c-e623844c6b4a.png', 1, '2023-04-25 00:47:38', '2023-04-27 19:30:40', 3),
(4, 'Programar feo', 'Carlitos Tevez', '2023-04-28 00:00:00', '7bb4da3b-bd73-43a3-8cad-d9214f2c74c1.jpg', '35062823-0707-4de1-a381-4175d9edbad2.png', 1, '2023-04-27 13:24:29', '2023-04-27 13:25:34', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rights`
--

CREATE TABLE `rights` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rights`
--

INSERT INTO `rights` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Ningun Derecho', '2023-04-29 17:46:29', '2023-04-29 17:46:29'),
(2, 'Copyleft © 🄯', '2023-04-29 17:47:04', '2023-04-29 17:47:04'),
(3, 'Creative Commons (CC)', '2023-04-29 17:52:14', '2023-04-29 17:52:14'),
(4, 'CopyRight ©', '2023-04-30 02:38:38', '2023-04-30 02:38:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ProfileId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `status`, `createdAt`, `updatedAt`, `ProfileId`) VALUES
(3, 'test1@gmail.com', 'Diegassus', '$2b$10$N5X2.YvnIh/PImaJscOsmera6c1EbOX2AirIPbFwMU.4lldlbcqsS', 1, '2023-04-25 00:47:38', '2023-04-25 00:47:38', 3),
(4, 'test2@gmail.com', 'pepito', '$2b$10$XMaDXf8M.3FOtv4qb2LJguZW4CBMJOeD3q4onnOS6bkDgX08GDH4i', 1, '2023-04-27 13:24:29', '2023-04-27 13:24:29', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`UserId`,`ImageId`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`UserId`,`ImageId`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `CategoryId` (`CategoryId`),
  ADD KEY `RightId` (`RightId`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`ImageId`,`UserId`);

--
-- Indices de la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Indices de la tabla `rights`
--
ALTER TABLE `rights`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD KEY `ProfileId` (`ProfileId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `rights`
--
ALTER TABLE `rights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `images_ibfk_3` FOREIGN KEY (`RightId`) REFERENCES `rights` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ProfileId`) REFERENCES `profiles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
