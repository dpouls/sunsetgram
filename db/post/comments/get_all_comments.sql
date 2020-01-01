select * from comments c
join users u on u.id = c.author_id
where post_id = ($1) 