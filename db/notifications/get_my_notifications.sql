select c.comment_id	, c.post_id	, c.author_id,	c.contents, n.notification_id	, n.sender_id	, n.receiver_id	, n.post_id	, n.is_comment	, n.is_like	, n.is_follow	, u.id	, u.username	, u.profile_img	, p.post_id	, p.author_id	, p.image_url	, p.caption
from notifications n
join users u on u.id = n.sender_id
join posts p  on p.post_id = n.post_id
join comments c on c.comment_id = n.comment_id
where receiver_id = ($1)
