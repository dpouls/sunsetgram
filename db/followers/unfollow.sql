delete from notifications where sender_id = ($1) and receiver_id =($2) and is_follow = true;
delete from followers where follower_id = ($1) and followed_id = ($2)