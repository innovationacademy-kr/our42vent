create table if not exists token(
	userId INT NOT NULL,
	content VARCHAR(256) NOT NULL,
	expireAt datetime not null default (CURRENT_TIMESTAMP + INTERVAL 2 WEEK),
	PRIMARY KEY (userId),
	FOREIGN KEY (userId) REFERENCES user(id))
