create table　posted_data(
  maintext varchar(1000) key,
  form enum('circle','square', 'complex'),
  image_pass varchar(255),
  category enum('sport','normal') not null,
  tag varchar(255) not null,
  good int default 0,
  created datetime
);
