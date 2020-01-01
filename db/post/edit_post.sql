update posts
set caption = ($1)
where post_id = ($2)
returning *