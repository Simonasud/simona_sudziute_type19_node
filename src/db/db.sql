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

-- sukurti lentele - 'shop_items'
-- id, name, price, description, image, item_type_id

CREATE TABLE shop_items (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  item_type_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (item_type_id) REFERENCES item_types(id)
) ENGINE=InnoDB;

-- sukurti lentele - 'items_types'
-- id, name
CREATE TABLE item_types (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;




