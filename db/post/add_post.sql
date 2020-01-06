insert into posts (
    author_id,
    image_url,
    caption,
    post_date
) values (
($1),
($2),
($3),
($4)
)
-- returning *
-- select * from posts