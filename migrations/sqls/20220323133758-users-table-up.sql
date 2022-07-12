CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) UNIQUE,
    firstname VARCHAR(32),
    lastname VARCHAR(48),
    password VARCHAR(255)
);