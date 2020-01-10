select * from followers f 
join users u on u.id = f.followed_id
join posts p on p.author_id = u.id
where follower_id = ($1)