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

-- sukurti item_types
INSERT INTO item_types (name) VALUES ('food'), ('drink'), ('electronic'), ('clothes');

-- sukurti lentele - 'orders'
-- id, user_id, shop_item_id, quantity. total_price, status
CREATE TABLE orders (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  shop_item_id INT NOT NULL,
  quantity INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shop_item_id) REFERENCES shop_items(id)
) ENGINE=InnoDB;

-- sukurti lentele - 'user_roles
-- id, name
CREATE TABLE user_roles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB;




