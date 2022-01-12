CREATE EVENT IF NOT EXISTS expire_token 
ON schedule every 10 minute starts CURRENT_TIMESTAMP
do DELETE FROM token WHERE expireAt <= CURRENT_TIMESTAMP
