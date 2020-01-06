select * from followers f
join users u on u.id = f.followed_id
where follower_id = ($1)