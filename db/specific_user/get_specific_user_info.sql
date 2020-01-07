select post_id, author_id,image_url,caption, id, username, profile_img
from posts p
join users u on u.id = p.author_id
where author_id = ($1)