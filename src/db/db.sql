-- sukurti lentele - 'users'
-- id, name, email, password, role_id

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_email (email),
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB;