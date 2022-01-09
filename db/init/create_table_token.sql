create table token(
	userId INT NOT NULL,
	content VARCHAR(256) NOT NULL,
	PRIMARY KEY (userId),
	FOREIGN KEY (userId) REFERENCES user(id))
