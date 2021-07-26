INSERT INTO users (name, last_name, birth_date, gender,  email, password , profile_pic, country, city, referrer, type, relationship)
VALUES
('Saoussen', ' Slii', '1985-04-23', 'female','sawsan@live.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/38138018?s=400&u=6053abab35bca9174bbc6b545987513dee321cdf&v=4','Canada', 'Ottawa', 'a', 'normal',  'married'),
('Deepthy', ' Sharon', '1991-04-23', 'female','deepthy@live.fr','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/67440072?s=400&u=44de8f15d1d2b0718d60426a603508cc829aedc6&v=4','Canada', 'Ottawa', 'a', 'normal', 'married'),
('Khaoula', ' Mouanniss', '1989-04-23', 'female', 'khaoula@live.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/71297492?s=400&u=19580f47790205d7ab04bae3188b7696536df4de&v=4', 'Canada', 'Ottawa', 'a', 'super', 'married'),
('Mahdi', ' Slii', '1985-04-23', 'male','mahdi_sli3i@live.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/38138018?s=400&u=6053abab35bca9174bbc6b545987513dee321cdf&v=4','Canada', 'Ottawa', 'a', 'normal',  'single'),
('Sharukh', ' Sharon', '1991-04-23', 'male','Sharukh_sharon@live.fr','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/67440072?s=400&u=44de8f15d1d2b0718d60426a603508cc829aedc6&v=4','Canada', 'Ottawa', 'a', 'normal', 'single'),
('Hedi', ' Mouanniss', '1989-04-23', 'male', 'Hedi_mouannis@live.fr', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u', 'https://avatars.githubusercontent.com/u/71297492?s=400&u=19580f47790205d7ab04bae3188b7696536df4de&v=4', 'Canada', 'Ottawa', 'a', 'normal', 'single');
INSERT INTO topics (topic, topic_level)
VALUES
('Public/strangers', 1),
('Family', 2),
('Romance', 3),
('Friends', 4),
('Partner/Dating', 5),
('Neighbors', 6),
('School', 7),
('Work', 8),
('General', 9);

INSERT INTO items (creator_id, item, time, approved)
VALUES
(3, 'Allowing yourself to be seated at a bad table even though you had reservations', '2020-01-15 04:05:06', true),
(3, 'Asking to share a table with strangers at a crowded restaurant or bar', '2020-01-16 04:05:06', true),
(3, 'Making a phone call in a public bathroom when other people are in there', '2020-01-17 04:05:06', true),
(3, 'Sending food back at a restaurant because it tastes bad', '2020-01-18 04:05:06', true),
(3, 'Doing what your parents want you to', '2020-01-19 05:05:06', true),
(3, 'Telling your sibling to shut up when they''re too loud or annoying', '2020-01-19 07:05:06', true),
(3, 'Watching a child hit your child and saying nothing to the other parents', '2020-01-19 08:05:06',true),
(3, 'Telling your parents to shut up', '2020-01-19 09:05:06',true),
(3, 'Letting your sibling get their way', '2020-01-19 10:05:06',true),
(3, 'Approaching an attractive stranger at a party', '2020-01-19 11:05:06',true),
(3, 'Asking a total stranger to dance with you', '2020-01-19 12:05:06',true),
(3, 'Asking someone out right away who you met online', '2020-01-19 13:05:06',true),
(3, 'Trying to talk to someone on the bus who you find attractive', '2020-01-19 14:05:06',true),
(3, 'Avoiding eye contact with people you find attractive', '2020-01-19 15:05:06',true),
(3, 'Asking friends to donate to your favorite charity', '2020-01-19 16:05:06',true),
(3, 'Confronting your friend about a serious lie', '2020-01-19 17:05:06',true),
(3, 'Confronting your friend about a serious lie', '2020-01-19 17:15:06',true),
(3, 'Letting your friends choose what to do when you go out at night', '2020-01-19 17:25:06',true),
(3, 'Asking your friends to come to an event that''s really important to you', '2020-01-19 17:35:06',true),
(3, 'Pushing your friends hard to buy something you''re selling', '2020-01-19 17:55:06',true),
(3, 'Controlling who your partner talks to', '2020-01-20 08:00:06',true),
(3, 'Telling a new lover that it''s important to you to use protection during sex', '2020-01-20 08:10:06',true),
(3, 'Making decisions for your partner when they can''t choose', '2020-01-20 08:20:06',true),
(3, 'Making your partner choose between you and their pet', '2020-01-20 08:25:06',true),
(3, 'Letting your partner tell you what to do', '2020-01-20 08:30:06',true),
(3, 'Complaining to your neighbors about their dog that barks all the time', '2020-01-20 08:35:06',true),
(3, 'Asking your neighbors to move their car that''s taking up two spots', '2020-01-20 08:40:06',true),
(3, 'Going over to your neighbors'' place to borrow something you need urgently', '2020-01-20 08:45:06',true),
(3, 'Trying to get your neighbors to join your political cause or group', '2020-01-20 08:50:06',true),
(3, 'Telling your neighbors to turn down their music at night', '2020-01-20 08:55:06',true),
(3, 'Cracking jokes in class', '2020-01-20 08:59:06',true),
(3, 'Talking in class at the same time as the teacher', '2020-01-20 09:12:06',true),
(3, 'Asking your teacher to explain something after class', '2020-01-20 09:15:06',true),
(3, 'Raising your hand to answer a question in class when no one else does', '2020-01-20 09:20:06',true),
(3, 'Asking someone you don''t know if you can copy their notes after class', '2020-01-20 09:25:06',true),
(3, 'Demanding a raise at work', '2020-01-20 09:30:06',true),
(3, 'Starting your own business', '2020-01-20 09:35:06',true),
(3, 'Seeking a leadership position at work', '2020-01-20 09:40:06',true),
(3, 'Telling other people how to do their job', '2020-01-20 09:45:06',true),
(3, 'Letting other people take credit for your ideas at work', '2020-01-20 09:50:06',true),
(3, 'Expecting people to do what you want', '2020-01-20 09:55:06',true),
(3, 'Giving in when someone really wants something that you don''t', '2020-01-20 10:05:06',true),
(3, 'Letting someone tell you what to do', '2020-01-20 10:15:06',true),
(3, 'Continuing a story no matter how many times you get interrupted', '2020-01-20 10:20:06',true),
(3, 'Taking charge in an emergency', '2020-01-20 10:25:06',true);
INSERT INTO answer_items (item_id, user_id, answer, date)
VALUES
/*(2, 1, 1, '2020-11-20 10:25:06'),*/
(2, 2, 1, '2020-11-20 10:25:16'),
(2, 3, 2, '2020-11-20 10:25:26'),
(2, 4, 3, '2020-11-20 10:25:06'),
(2, 5, 4, '2020-11-20 10:25:16'),
(2, 6, 5, '2020-11-20 10:25:26'),
/*(3, 1, 1, '2020-11-20 10:25:06'),*/
(3, 2, 5, '2020-11-20 10:25:16'),
(3, 3, 4, '2020-11-20 10:25:26'),
(3, 4, 5, '2020-11-20 10:25:06'),
(3, 5, 5, '2020-11-20 10:25:16'),
(3, 6, 2, '2020-11-20 10:25:26'),
/*(4, 1, 4, '2020-11-20 10:30:16'),*/
(4, 2, 1, '2020-11-20 10:30:16'),
(4, 3, 1, '2020-11-20 10:30:16'),
(4, 4, 4, '2020-11-20 10:30:16'),
(4, 5, 1, '2020-11-20 10:30:16'),
/*(5, 1, 2, '2020-11-21 10:25:06'),*/
(5, 2, 3, '2020-11-21 10:25:06'),
(5, 3, 3, '2020-11-21 10:25:06'),
(5, 6, 3, '2020-11-21 10:25:06'),
(5, 4, 2, '2020-11-21 10:25:06'),
(6, 1, 2, '2020-11-22 10:30:16'),
(6, 2, 4, '2020-11-22 10:30:16'),
(6, 3, 2, '2020-11-22 10:30:16'),
(6, 4, 4, '2020-11-22 10:30:16'),
(6, 5, 4, '2020-11-22 10:30:16'),
(7, 1, 1, '2020-11-20 10:25:06'),
(7, 2, 5, '2020-11-20 10:25:16'),
(7, 3, 4, '2020-11-20 10:25:26'),
(7, 4, 5, '2020-11-20 10:25:06'),
(7, 5, 5, '2020-11-20 10:25:16'),
(7, 6, 2, '2020-11-20 10:25:26'),

(8, 1, 2, '2020-11-20 10:25:06'),
(8, 2, 2, '2020-11-20 10:25:16'),
(8, 3, 4, '2020-11-20 10:25:26'),
(8, 4, 5, '2020-11-20 10:25:06'),
(8, 5, 4, '2020-11-20 10:25:16'),
(8, 6, 2, '2020-11-20 10:25:26'), 

(9, 1, 2, '2020-11-20 10:25:06'),
(9, 2, 5, '2020-11-20 10:25:16'),
(9, 3, 3, '2020-11-20 10:25:26'),

(10, 1, 1, '2020-11-20 10:25:06'),
(10, 2, 2, '2020-11-20 10:25:16'),
(10, 3, 3, '2020-11-20 10:25:26'),


(21, 4, 1, '2020-11-20 10:25:06'),
(21, 5, 5, '2020-11-20 10:25:16'),
(21, 6, 2, '2020-11-20 10:25:26'),

(22, 1, 1, '2020-11-20 10:25:06'),
(22, 2, 2, '2020-11-20 10:25:16'),
(22, 3, 5, '2020-11-20 10:25:26'),

(23, 4, 1, '2020-11-20 10:25:06'),
(23, 5, 5, '2020-11-20 10:25:16'),
(23, 6, 2, '2020-11-20 10:25:26'),

(24, 1, 2, '2020-11-20 10:25:06'),
(24, 2, 5, '2020-11-20 10:25:16'),
(24, 3, 2, '2020-11-20 10:25:26'),

(25, 4, 1, '2020-11-20 10:25:06'),
(25, 5, 5, '2020-11-20 10:25:16'),
(25, 6, 2, '2020-11-20 10:25:26'),

(26, 1, 1, '2020-11-20 10:25:06'),
(26, 2, 5, '2020-11-20 10:25:16'),
(26, 3, 4, '2020-11-20 10:25:26'),

(27, 4, 4, '2020-11-20 10:25:06'),
(27, 5, 3, '2020-11-20 10:25:16'),
(27, 6, 1, '2020-11-20 10:25:26'),

(28, 1, 1, '2020-11-20 10:25:06'),
(28, 2, 2, '2020-11-20 10:25:16'),
(28, 3, 4, '2020-11-20 10:25:26'),

(29, 4, 1, '2020-11-20 10:25:06'),
(29, 5, 5, '2020-11-20 10:25:16'),
(29, 6, 2, '2020-11-20 10:25:26'),

(30, 1, 1, '2020-11-20 10:25:06'),
(30, 2, 2, '2020-11-20 10:25:16'),
(30, 3, 5, '2020-11-20 10:25:26'),

(11, 4, 1, '2020-11-20 10:25:06'),
(11, 5, 5, '2020-11-20 10:25:16'),
(11, 6, 2, '2020-11-20 10:25:26'),

(12, 1, 1, '2020-11-20 10:25:06'),
(12, 2, 2, '2020-11-20 10:25:16'),
(12, 3, 5, '2020-11-20 10:25:26'),

(13, 4, 1, '2020-11-20 10:25:06'),
(13, 5, 5, '2020-11-20 10:25:16'),
(13, 6, 2, '2020-11-20 10:25:26'),

(14, 1, 2, '2020-11-20 10:25:06'),
(14, 2, 5, '2020-11-20 10:25:16'),
(14, 3, 2, '2020-11-20 10:25:26'),

(15, 4, 1, '2020-11-20 10:25:06'),
(15, 5, 5, '2020-11-20 10:25:16'),
(15, 6, 2, '2020-11-20 10:25:26'),

(16, 1, 1, '2020-11-20 10:25:06'),
(16, 2, 5, '2020-11-20 10:25:16'),
(16, 3, 4, '2020-11-20 10:25:26'),

(17, 4, 4, '2020-11-20 10:25:06'),
(17, 5, 3, '2020-11-20 10:25:16'),
(17, 6, 1, '2020-11-20 10:25:26'),

(18, 1, 1, '2020-11-20 10:25:06'),
(18, 2, 2, '2020-11-20 10:25:16'),
(18, 3, 4, '2020-11-20 10:25:26'),

(19, 4, 1, '2020-11-20 10:25:06'),
(19, 5, 5, '2020-11-20 10:25:16'),
(19, 6, 2, '2020-11-20 10:25:26'),

(20, 1, 1, '2020-11-20 10:25:06'),
(20, 2, 2, '2020-11-20 10:25:16'),
(20, 3, 5, '2020-11-20 10:25:26'),

(31, 1, 3, '2020-11-20 10:25:06'),
(31, 2, 2, '2020-11-20 10:25:16'),
(31, 3, 5, '2020-11-20 10:25:26'),

(32, 1, 1, '2020-11-20 10:25:06'),
(32, 2, 2, '2020-11-20 10:25:16'),
(32, 3, 5, '2020-11-20 10:25:26'),

(33, 4, 4, '2020-11-20 10:25:06'),
(33, 5, 5, '2020-11-20 10:25:16'),
(33, 6, 2, '2020-11-20 10:25:26'),

(34, 4, 4, '2020-11-20 10:25:06'),
(34, 5, 5, '2020-11-20 10:25:16'),
(34, 6, 2, '2020-11-20 10:25:26'),

(35, 1, 1, '2020-11-20 10:25:06'),
(35, 2, 2, '2020-11-20 10:25:16'),
(35, 3, 5, '2020-11-20 10:25:26'),

(36, 4, 4, '2020-11-20 10:25:06'),
(36, 5, 3, '2020-11-20 10:25:16'),
(36, 1, 2, '2020-11-20 10:25:26'),

(37, 1, 1, '2020-11-20 10:25:06'),
(37, 2, 2, '2020-11-20 10:25:16'),
(37, 5, 5, '2020-11-20 10:25:26'),

(38, 4, 4, '2020-11-20 10:25:06'),
(38, 5, 5, '2020-11-20 10:25:16'),
(38, 2, 2, '2020-11-20 10:25:26'),

(39, 1, 3, '2020-11-20 10:25:06'),
(39, 4, 2, '2020-11-20 10:25:16'),
(39, 3, 5, '2020-11-20 10:25:26'),

(40, 1, 4, '2020-11-20 10:25:06'),
(40, 5, 1, '2020-11-20 10:25:16'),
(40, 6, 2, '2020-11-20 10:25:26'),

(41, 1, 1, '2020-11-20 10:25:06'),
(41, 2, 1, '2020-11-20 10:25:16'),
(41, 5, 5, '2020-11-20 10:25:26'),

(42, 4, 1, '2020-11-20 10:25:06'),
(42, 1, 5, '2020-11-20 10:25:16'),
(42, 6, 2, '2020-11-20 10:25:26'),

(43, 1, 1, '2020-11-20 10:25:06'),
(43, 5, 5, '2020-11-20 10:25:16'),
(43, 6, 2, '2020-11-20 10:25:26'),

(44, 4, 1, '2020-11-20 10:25:06'),
(44, 2, 5, '2020-11-20 10:25:16'),
(44, 6, 2, '2020-11-20 10:25:26');



INSERT INTO item_topics (item_id, topic_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 3),
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3),
(16, 4),
(17, 4),
(18, 4),
(19, 4),
(20, 4),
(21, 5),
(22, 5),
(23, 5),
(24, 5),
(25, 5),
(26, 6),
(27, 6),
(28, 6),
(29, 6),
(30, 6),
(32, 7),
(33, 7),
(34, 7),
(35, 7),
(36, 8),
(37, 8),
(38, 8),
(39, 8),
(40, 8),
(41, 9),
(42, 9),
(43, 9),
(44, 9),
(45, 9);
INSERT INTO user_topics (user_id, topic_id)
VALUES
(1,1),
(1,4),
(1,5),
(2,3),
(2,6),
(2,8),
(3,7),
(3,9),
(1,2);