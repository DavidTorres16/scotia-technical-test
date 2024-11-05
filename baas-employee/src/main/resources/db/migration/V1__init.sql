CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- table for position employee
CREATE TABLE IF NOT EXISTS position_employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    salary DECIMAL(15, 2) NOT NULL,
    time_in_position DATE NOT NULl
);


-- Table for Country
CREATE TABLE IF NOT EXISTS country (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Table for Region
CREATE TABLE IF NOT EXISTS region (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    country_id UUID NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES country(id)
);

-- Table for City
CREATE TABLE IF NOT EXISTS city (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    region_id UUID NOT NULL,
    CONSTRAINT fk_region FOREIGN KEY (region_id) REFERENCES region(id)
);
-- table for employee
CREATE TABLE IF NOT EXISTS employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    location_city UUID NOT NULL,
    address VARCHAR(200) NOT NULL,
    date_of_birth DATE NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    position_id UUID NOT NULL,
    status VARCHAR(100) NOT NULL,
    CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES position_employee(id),
    CONSTRAINT fk_city FOREIGN KEY (location_city) REFERENCES city(id)
);

INSERT INTO country (id, name) VALUES
    (UUID_GENERATE_V4(), 'United States'),
    (UUID_GENERATE_V4(), 'Canada'),
    (UUID_GENERATE_V4(), 'Mexico'),
    (UUID_GENERATE_V4(), 'Argentina'),
    (UUID_GENERATE_V4(), 'Brazil'),
    (UUID_GENERATE_V4(), 'United Kingdom'),
    (UUID_GENERATE_V4(), 'Germany'),
    (UUID_GENERATE_V4(), 'France'),
    (UUID_GENERATE_V4(), 'Spain'),
    (UUID_GENERATE_V4(), 'Italy');

INSERT INTO region (id, name, country_id) VALUES
    (UUID_GENERATE_V4(), 'California', (SELECT id FROM country WHERE name = 'United States')),
    (UUID_GENERATE_V4(), 'Ontario', (SELECT id FROM country WHERE name = 'Canada')),
    (UUID_GENERATE_V4(), 'Mexico City', (SELECT id FROM country WHERE name = 'Mexico')),
    (UUID_GENERATE_V4(), 'Buenos Aires', (SELECT id FROM country WHERE name = 'Argentina')),
    (UUID_GENERATE_V4(), 'São Paulo', (SELECT id FROM country WHERE name = 'Brazil')),
    (UUID_GENERATE_V4(), 'England', (SELECT id FROM country WHERE name = 'United Kingdom')),
    (UUID_GENERATE_V4(), 'Bavaria', (SELECT id FROM country WHERE name = 'Germany')),
    (UUID_GENERATE_V4(), 'Île-de-France', (SELECT id FROM country WHERE name = 'France')),
    (UUID_GENERATE_V4(), 'Catalonia', (SELECT id FROM country WHERE name = 'Spain')),
    (UUID_GENERATE_V4(), 'Lazio', (SELECT id FROM country WHERE name = 'Italy'));

INSERT INTO city (id, name, region_id) VALUES
    (UUID_GENERATE_V4(), 'Los Angeles', (SELECT id FROM region WHERE name = 'California')),
    (UUID_GENERATE_V4(), 'Toronto', (SELECT id FROM region WHERE name = 'Ontario')),
    (UUID_GENERATE_V4(), 'Guadalajara', (SELECT id FROM region WHERE name = 'Mexico City')),
    (UUID_GENERATE_V4(), 'La Plata', (SELECT id FROM region WHERE name = 'Buenos Aires')),
    (UUID_GENERATE_V4(), 'Campinas', (SELECT id FROM region WHERE name = 'São Paulo')),
    (UUID_GENERATE_V4(), 'London', (SELECT id FROM region WHERE name = 'England')),
    (UUID_GENERATE_V4(), 'Munich', (SELECT id FROM region WHERE name = 'Bavaria')),
    (UUID_GENERATE_V4(), 'Paris', (SELECT id FROM region WHERE name = 'Île-de-France')),
    (UUID_GENERATE_V4(), 'Barcelona', (SELECT id FROM region WHERE name = 'Catalonia')),
    (UUID_GENERATE_V4(), 'Rome', (SELECT id FROM region WHERE name = 'Lazio'));


INSERT INTO position_employee (id, title, hire_date, email, salary, time_in_position) VALUES
    (UUID_GENERATE_V4(), 'Software Engineer', '2021-06-01', 'john.doe@example.com', 75000.00, '2023-11-04'),
    (UUID_GENERATE_V4(), 'Product Manager', '2020-01-15', 'jane.smith@example.com', 90000.00, '2023-11-04'),
    (UUID_GENERATE_V4(), 'Data Scientist', '2019-09-20', 'alice.johnson@example.com', 85000.00, '2023-11-04'),
    (UUID_GENERATE_V4(), 'Sales Representative', '2022-03-10', 'bob.brown@example.com', 60000.00, '2023-11-04'),
    (UUID_GENERATE_V4(), 'HR Manager', '2021-11-30', 'charlie.white@example.com', 70000.00, '2023-11-04');


INSERT INTO employee (id, first_name, middle_name, last_name, location_city, address, date_of_birth, telephone, position_id, status) VALUES
    (UUID_GENERATE_V4(), 'John', 'M.', 'Doe',
     (SELECT id FROM city WHERE name = 'Los Angeles'),
     '1234 Sunset Blvd, Los Angeles, CA',
     '1990-05-15',
     '123-456-7890',
     (SELECT id FROM position_employee WHERE title = 'Software Engineer'),
     'ACTIVE'),

    (UUID_GENERATE_V4(), 'Jane', 'A.', 'Smith',
     (SELECT id FROM city WHERE name = 'Toronto'),
     '4321 Maple St, Toronto, ON',
     '1985-08-20',
     '098-765-4321',
     (SELECT id FROM position_employee WHERE title = 'Product Manager'),
     'ACTIVE'),

    (UUID_GENERATE_V4(), 'Alice', 'B.', 'Johnson',
     (SELECT id FROM city WHERE name = 'Guadalajara'),
     '4567 Guadalajara Ave, Guadalajara, JAL',
     '1992-12-30',
     '555-123-4567',
     (SELECT id FROM position_employee WHERE title = 'Data Scientist'),
     'ACTIVE'),

    (UUID_GENERATE_V4(), 'Bob', 'C.', 'Brown',
     (SELECT id FROM city WHERE name = 'La Plata'),
     '7890 La Plata Rd, La Plata, BA',
     '1988-02-14',
     '444-987-6543',
     (SELECT id FROM position_employee WHERE title = 'Sales Representative'),
     'ACTIVE'),

    (UUID_GENERATE_V4(), 'Charlie', 'D.', 'White',
     (SELECT id FROM city WHERE name = 'London'),
     '3210 Big Ben St, London, UK',
     '1980-03-01',
     '222-333-4444',
     (SELECT id FROM position_employee WHERE title = 'HR Manager'),
     'ACTIVE');