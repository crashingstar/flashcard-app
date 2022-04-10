DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS deck;
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL UNIQUE,
  `password` varchar(45) NOT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `last_login` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE deck (
  `deck_id` int  NOT NULL AUTO_INCREMENT,
  `deck_name` varchar(45) DEFAULT NULL,
  `user_id` int,
  `accessibility` boolean DEFAULT NULL,
  `date_created` varchar(45) DEFAULT NULL,
  `last_updated` varchar(45) DEFAULT NULL,
  `total_cards` int DEFAULT NULL,
  `cards_due` int DEFAULT NULL,
  PRIMARY KEY (`deck_id`),
  UNIQUE KEY `deck_name_user_id_uniq` (`deck_name`,`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE card (
  `card_id` int  NOT NULL AUTO_INCREMENT,
  `deck_id` int,
  `front` varchar(45) DEFAULT NULL,
  `back` varchar(45) DEFAULT NULL,
  `date_created` varchar(45) DEFAULT NULL,
  `last_accessed` varchar(45) DEFAULT NULL,
  `last_correct` int DEFAULT NULL,
  `interval` int DEFAULT NULL,
  `ease_factor` int DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  FOREIGN KEY (`deck_id`) REFERENCES deck(`deck_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

drop procedure if exists create_data;
delimiter #
create procedure create_data()
begin

declare max_val int unsigned default 10;
declare counter int unsigned default 0;
  start transaction;
  while counter < max_val do
INSERT INTO `user`( `username`, `password`,`user_type`,`email`) VALUES (CONCAT('user',counter), CONCAT('password',counter),'user', CONCAT('user',counter,'@gmail.com'));
set counter=counter+1;
  end while;
  commit;
end #

delimiter ;
call create_data();
