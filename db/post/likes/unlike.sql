delete from notifications where sender_id = ($1) and post_id = ($2) and is_like = true;
delete from likes where user_id = ($1) and post_id = ($2);
