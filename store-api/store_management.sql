-- -- 1. Create the new database
-- CREATE DATABASE store_management;

-- -- 2. Use the new database
-- USE store_management;

-- 3. Create the merchants table
CREATE TABLE merchants (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Create the users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  merchant_id BIGINT,
  account_number VARCHAR(255),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  password_digest TEXT NOT NULL,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Create the stores table
CREATE TABLE stores (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  merchant_id BIGINT,
  official_company_name VARCHAR(255) NOT NULL,
  brand_name VARCHAR(255) NOT NULL,
  store_scale ENUM ('small', 'medium', 'medium_large', 'large') NOT NULL,
  store_category VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE users ADD FOREIGN KEY (merchant_id) REFERENCES merchants (id);
ALTER TABLE stores ADD FOREIGN KEY (merchant_id) REFERENCES merchants (id);

-- 6. Insert a single merchant
INSERT INTO merchants (name)
VALUES ('Harmoni Nusantara.');

-- 7. Insert a single user associated with the merchant
-- Generate account_number based on merchant_id = 1
INSERT INTO users (merchant_id, account_number, full_name, email, password_digest, last_login)
VALUES (
  1, -- Assuming the merchant_id is 1
  'HARMON-0001',
  'John Doe',
  'john.doe@example.com',
  'hashed_password',
  NOW()
);

-- 8. Insert at least 5 stores associated with the merchant
INSERT INTO stores (merchant_id, official_company_name, brand_name, store_scale, store_category)
VALUES
(1, 'Harmoni Nusantara Store 1', 'Harmoni Brand 1', 'small', 'veterinary_services'),
(1, 'Harmoni Nusantara Store 2', 'Harmoni Brand 2', 'medium', 'agricultural_cooperative'),
(1, 'Harmoni Nusantara Store 3', 'Harmoni Brand 3', 'medium_large', 'landscaping_horticultural_services'),
(1, 'Harmoni Nusantara Store 4', 'Harmoni Brand 4', 'large', 'general_constructors');
