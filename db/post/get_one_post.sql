select * from posts
join users u on u.id = posts.author_id
where post_id = ($1)