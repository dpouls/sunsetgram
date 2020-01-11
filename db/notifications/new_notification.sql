insert into notifications (
sender_id,
receiver_id,
post_id,
is_comment,
is_like,
is_follow,
comment_id

) values (
($1),($2),($3),($4),($5),($6),($7)
);
