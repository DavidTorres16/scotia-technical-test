CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla position_employee primero
CREATE TABLE IF NOT EXISTS position_employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    salary DECIMAL(15, 2) NOT NULL,
    time_in_position DATE NOT NULl
);

-- Luego crear la tabla employee
CREATE TABLE IF NOT EXISTS employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    location_city VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    date_of_birth DATE NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    position_id UUID NOT NULL,
    status VARCHAR(100) NOT NULL,
    CONSTRAINT fk_position FOREIGN KEY (position_id) REFERENCES position_employee(id)
);