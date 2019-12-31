select count(like_id) from likes
where post_id = ($1) 