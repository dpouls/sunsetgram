create table users(
id serial primary key,
username varchar(25),
password varchar(250)
)

insert into users (
username, password
) values (
'test','test'
)