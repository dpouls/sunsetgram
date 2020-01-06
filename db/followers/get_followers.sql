select * from followers f
join users u on u.id = f.follower_id
where followed_id = ($1)