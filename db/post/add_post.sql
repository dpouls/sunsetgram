insert into posts (
    author_id,
    image_url,
    caption
) values (
($1),
($2),
($3)
)
-- returning *
-- select * from posts