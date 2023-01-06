CREATE DATABASE assignment;
USE assignment;

CREATE TABLE roles(roleId char(10) NOT NULL UNIQUE);
INSERT INTO roles (roleId) VALUES ('R1');
INSERT INTO roles (roleId) VALUES ('R2'), ('R3');

CREATE TABLE users(userId char(10) NOT NULL UNIQUE, userName VARCHAR (20), roleId char(10));
INSERT INTO users VALUES ('U1', 'Gagan', 'R1'), ('U2', 'Manpreet', 'R1'), ('U3', 'Sanjana', 'R2'), ('U4', 'Sandeep', 'R2');
INSERT INTO users VALUES ('U5', 'Komal', 'R2'), ('U6', 'Manpreet', 'R2'), ('U7', 'Gagan', 'R2'), ('U8', 'Yashika', 'R2');
SELECT * from users;

CREATE TABLE userDetails(contactNum VARCHAR(10), userId char(10));
INSERT INTO userDetails VALUES ('112233', 'U1'), ('112433', 'U2'), ('117733', 'U3'), ('102233', 'U4'), ('119933', 'U5'), ('11229993', 'U6'),
('1122773', 'U7'), ('1122233', 'U8');
SELECT * from userDetails;

select *
from users u
join userDetails ud on ud.userId = u.userId order by userId desc;



select *, SUBSTRING(userID, 2, 2) as "UserIDN" from users  where  SUBSTRING(userID, 2, 2) in  ( SELECT   Min(SUBSTRING(userID, 2, 2)) as "UserIDN"
FROM users
GROUP BY userName
HAVING COUNT(userName) > 1 ) ;


delete from users where userID in (
select userID from users  where  SUBSTRING(userID, 2, 2)  in  ( SELECT   max(SUBSTRING(userID, 2, 2)) as "UserIDN"
FROM users
GROUP BY userName
HAVING COUNT(userName) > 1 )) ;







