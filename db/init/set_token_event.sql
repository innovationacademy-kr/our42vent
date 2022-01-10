create event if not exists expire_token 
on schedule every 10 minute starts CURRENT_TIMESTAMP
do DELETE FROM token where expireAt <= CURRENT_TIMESTAMP
