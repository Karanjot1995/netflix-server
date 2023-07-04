CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `f_name` varchar(100) NOT NULL,
  `l_name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `dob` datetime DEFAULT NULL,
  `card_number` int(20) DEFAULT NULL,
  `cvv` int(20) DEFAULT NULL,
  `expiry` int(11) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

insert into user (email, password, f_name, l_name, phone, dob, card_number, cvv, expiry) values 
('karan.nanda97@gmail.com', 'password', 'Karan', 'Singh', '8888888888', '1995-08-11 00:00:00', 111111111111111, 123, 2028);


CREATE TABLE `Watches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `Content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image_data` varchar(250) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `average_rating` varchar(100) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



insert into Content (name, image_data, release_date, average_rating, genre, type) values 
('God Father II', 'https://i.ytimg.com/vi/puad0J86xI8/maxresdefault.jpg', '1995-11-08 00:00:00', 9.5, 'thriller', 'Movie'),
('God Father III', 'https://www.musicparadigm.com/wp-content/uploads/2015/02/godfather3.jpg', '1995-11-08 00:00:00', 9.2, 'thriller,gangster', 'Movie'),
('Batman Begins', 'https://weminoredinfilm.files.wordpress.com/2014/11/batman-begins.jpg?w=640', '1995-11-08 00:00:00', 8.9, 'thriller', 'Movie'),
('The Dark Knight', 'https://wallpapercave.com/wp/wp10441064.jpg', '1995-11-08 00:00:00', 8.8, 'thriller', 'Movie'),
('Joker', 'https://m.media-amazon.com/images/M/MV5BMGQ1ZGZmNTAtM2MyYi00NmZhLTkwYmYtNTNlZDRhMzU2ZTgwXkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UX500_CR0,0,500,281_.jpg', '1995-11-08 00:00:00', 8.0, 'action,thriller', 'Movie'),
('Scarface', 'https://cdn.shopify.com/s/files/1/1057/4964/products/scarface-vintage-movie-poster-original-british-quad-30x40-7691.jpg?v=1665736932', '1995-11-08 00:00:00', 8.1, 'action', 'Movie'),
('Avengers', 'https://variety.com/wp-content/uploads/2014/04/01-avengers-2012.jpg', '1995-11-08 00:00:00', 8.0, 'action,drama', 'Movie'),
('Avengers II', 'https://www.themarysue.com/wp-content/uploads/2015/05/Avengers-Age-of-Ultron.jpeg?fit=1024%2C576', '1995-11-08 00:00:00', 8.0, 'action,sci-fi', 'Movie'),
('Avengers: Infinity War', 'https://cdn.marvel.com/content/1x/avengersinfinitywar_lob_mas_hlf_01_3.jpg', '2021-11-08 00:00:00', 9.0, 'action,sci-fi', 'Movie'),
('Avengers: End Game', 'https://calendar.syracuse.edu/wp-content/uploads/avengers-endgame-poster.jpg', '2021-11-08 00:00:00', 9.1, 'action,sci-fi', 'Movie'),
('Thor', 'https://images.indianexpress.com/2018/04/thor-1-759.jpg', '2021-11-08 00:00:00', 7.8, 'action,sci-fi', 'Movie'),
('Thor: Ragnorok', 'https://cdn.mos.cms.futurecdn.net/WKTMtW9nZg8zgqY52eAsti-1200-80.jpg', '2020-11-06 00:00:00', 8.0, 'action,comedy', 'Movie'),
('Ant Man', 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DEFFAB8B878AD51E86C18350E1BA68B5DB3A72262B5FAABD5BEC18D076C71019/scale?width=1200&aspectRatio=1.78&format=jpeg', '2021-11-07 00:00:00', 8.0, 'action,comedy', 'Movie'),
('Guardians of the Galaxy', 'https://ichef.bbci.co.uk/images/ic/640x360/p061d1pl.jpg', '1995-11-08 00:00:00', 8.6, 'comedy,drama,action', 'Movie'),
('Iron Man', 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/80C64C0B63382CD3ED2653356125F275F63D036028A77D38DC3286AD851A6833/scale?width=1200&aspectRatio=1.78&format=jpeg', '2005-11-08 00:00:00', 8.6, 'action,thriller', 'Movie'),
('Iron Man II', 'https://cdn.mos.cms.futurecdn.net/M4m4cHakkXjJ5a9YTNYgAU.jpg', '2011-11-08 00:00:00', 8.4, 'action', 'Movie'),
('Iron Man III', 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/4F1E945B7AB933F7A474C5ECAD5AB895ECBF763F80DF64B835D131D41F4D90BD/scale?width=1200&aspectRatio=1.78&format=jpeg', '2017-11-08 00:00:00', 8.0, 'action', 'Movie');

insert into Content (name, image_data, release_date, average_rating, genre, type) values 
('Friends', 'https://hbomax-images.warnermediacdn.com/images/GXdbR_gOXWJuAuwEAACVH/tileburnedin?size=1280x720&partner=hbomaxcom&v=6a409f09891f75549fdb8d07dc969b63&host=art-gallery.api.hbo.com&language=en-us&w=1280', '1994-11-08 00:00:00', 9.5, 'comedy', 'TV'),
('How I Met Your Mother', 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/2970945770FC137FF7D5D3408D5D40836FD4C715DE6A1744F6F5AF21B2386827/scale?width=1200&aspectRatio=1.78&format=jpeg', '2005-11-08 00:00:00', 9.2, 'comedy,drama', 'TV'),
('Flash', 'https://tvseriesfinale.com/wp-content/uploads/2021/03/flash32-590x332.jpg', '2010-11-08 00:00:00', 9.5, 'thriller', 'TV'),
('Suits', 'https://i0.wp.com/filmloverss.com/wp-content/uploads/2015/03/suits-filmloverss-1.jpg?fit=720%2C400&ssl=1', '2015-11-08 00:00:00', 9.2, 'drama', 'TV'),
('New Girl', 'https://ntvb.tmsimg.com/assets/p10909474_b_h10_aa.jpg?w=960&h=540', '2010-11-08 00:00:00', 9.5, 'comedy', 'TV'),
('Game Of Thrones', 'https://images.everyeye.it/img-articoli/game-of-thrones-10-anni-dopo-storia-leggenda-speciale-v4-52733-1280x16.webp', '2010-11-08 00:00:00', 9.2, 'thriller,action,drama', 'TV'),
('Big Bang Theory', 'https://flxt.tmsimg.com/assets/p185554_b_h10_bk.jpg', '2005-11-08 00:00:00', 9.5, 'Comedy', 'TV');


