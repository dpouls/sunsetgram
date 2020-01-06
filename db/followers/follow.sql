insert into followers (
    follower_id,
    followed_id
) values (
    ($1), ($2)
);

select * from followers;