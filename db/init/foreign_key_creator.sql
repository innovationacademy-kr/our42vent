ALTER TABLE event
ADD FOREIGN KEY (creator) REFERENCES user(id);