CREATE DATABASE firstapi;

\l

\c firstapi;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users (name, email)
    VALUES ('ivan', 'ivan@gmail.com'),
    ('alberto', 'alberto@gmail.com');

select * from users;
