insert into likes (
    user_id,
    post_id
) values (
    ($1),($2)
);
select count(like_id) from likes
where post_id = ($1) 