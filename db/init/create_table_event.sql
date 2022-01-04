CREATE TABLE event (
	id INT NOT NULL AUTO_INCREMENT,
	creator INT NOT NULL,
	title VARCHAR(256) NOT NULL,
	personInCharge VARCHAR(64),
	beginAt DATETIME NOT NULL,
	endAt DATETIME NOT NULL,
	location VARCHAR(256) NOT NULL,
	category ENUM('lecture', 'exam', 'contest', 'conference', 'community') NOT NULL,
	topic VARCHAR(512) NOT NULL,
	details VARCHAR(4096),
	createdAt DATETIME NOT NULL,
	modifiedAt DATETIME NOT NULL,
	PRIMARY KEY (id)
)