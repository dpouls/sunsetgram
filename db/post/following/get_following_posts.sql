select p.post_id, p.author_id, p.image_url, p.caption, u.id, u.username, u.profile_img, f.follow_id, f.follower_id, f.followed_id
from posts p
join users u on u.id = p.author_id
join followers f on f.followed_id = p.author_id
where follower_id = ($1)