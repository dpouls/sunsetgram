create table users(
id serial primary key,
username varchar(25),
password varchar(250),
profile_img varchar(1000)
)

insert into users (
username, password
) values (
'test','test','google.com'
)

create table posts (
post_id serial primary key,
author_id int references users(id),
image_url varchar(1000),
caption varchar(500),
likes int
)
insert into posts (
    author_id,
    image_url,
    caption
) values (
3,
'https://images.pexels.com/photos/69445/sunset-abendstimmung-lake-water-69445.jpeg?cs=srgb&dl=sunset-water-clouds-lake-69445.jpg&fm=jpg',
'Sunset at the lake'
)

create table likes (
like_id serial primary key,
user_id int references users(id),
post_id int references posts(post_id)
)

insert into likes (
user_id,
post_id )
values (
3, 13)


create table comments (
    comment_id serial primary key,
    post_id int references posts(post_id),
    author_id int references users(id),
    contents varchar(250)
)

insert into comments (
post_id,
author_id,
contents
) values (
2,3,'user 3 comments a lot'
)