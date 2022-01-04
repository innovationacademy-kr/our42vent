CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(64) NOT NULL UNIQUE,
	profileImage VARCHAR(256) NOT NULL,
	createdAt DATETIME NOT NULL,
	updatedAt DATETIME NOT NULL,
	PRIMARY KEY (id)
);