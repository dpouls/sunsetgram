delete from notifications where comment_id = ($1);
delete from comments
where comment_id = ($1);