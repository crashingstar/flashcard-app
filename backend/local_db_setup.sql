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
  `user_id` int,
  `deck_id` int,
  `front` varchar(45),
  `back` varchar(45),
  `date_created` varchar(45) DEFAULT NULL,
  `next_accessed` DATE DEFAULT NULL,
  `card_status` varchar(45) DEFAULT "Learning",
  `learning_status` int DEFAULT 1,
  `interval` double DEFAULT 1,
  `ease_factor` double DEFAULT 2.5,
  PRIMARY KEY (`card_id`,`user_id`),
  UNIQUE KEY `front_deck_id_uniq` (`front`,`deck_id`),
  FOREIGN KEY (`deck_id`) REFERENCES deck(`deck_id`),
  FOREIGN KEY (`user_id`) REFERENCES user(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

drop procedure if exists create_data;
delimiter #
create procedure create_data()
begin

declare max_val int unsigned default 20;
declare counter int unsigned default 1;
  start transaction;
  while counter < max_val do
INSERT INTO `user`( `username`, `password`,`user_type`,`email`) VALUES (CONCAT('user',counter), CONCAT('password',counter),'user', CONCAT('user',counter,'@gmail.com'));
INSERT INTO `deck`( `deck_name`, `user_id`,`accessibility`,`date_created`) VALUES (CONCAT('deck',counter), counter,0, '2020-01-19');
INSERT INTO `card`(`user_id`, `deck_id`, `front`,`back`,`date_created`) VALUES (counter,counter,CONCAT('card_front_',counter),CONCAT('card_back_',counter),CURDATE());

set counter=counter+1;
  end while;
  commit;
end #

delimiter ;
call create_data();
