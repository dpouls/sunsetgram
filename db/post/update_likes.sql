update posts
set likes = ($1)
where post_id = ($2)
returning *