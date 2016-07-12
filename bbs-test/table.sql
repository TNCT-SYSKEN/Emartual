create table users(
  id int not null auto_increment primary key unique,
  name varchar(255),
  email varchar(255) unique,
  maintext text,
  created datetime
);
