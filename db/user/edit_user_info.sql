update users 
set profile_img = ($1)
where id = ($2)
returning id, profile_img, username