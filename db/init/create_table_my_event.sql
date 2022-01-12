CREATE TABLE IF NOT EXISTS my_event (
	id INT NOT NULL AUTO_INCREMENT,
	eventId INT NOT NULL,
	userId INT NOT NULL,
	notification INT,
	FOREIGN KEY (eventId) REFERENCES event(id),
	FOREIGN KEY (userId) REFERENCES user(id),
	PRIMARY KEY (id)
);
