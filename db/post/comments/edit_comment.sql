update comments
set contents = ($1)
where comment_id = ($2)
returning *