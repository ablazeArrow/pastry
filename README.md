# egy_sweets

this project required by udacity nano degree full stack web development.

## Getting Started

I have grouped each feature in a separate folder for example users folder contain all users related files: types, model, routes, and handler files in addition, there is a services folde contain dashbord files, configs folder contain database connection file, environment file, and jasmine reporter, and the api files that holds index routes and route guard middleware for endpoint protection.

> to start the programm follow these steps.

## database setup

### enironment variables used

- ENV=dev
- DB_HOST=localhost
- DB_PORT=5432
- DB_DEV=egy_sweets_dev
- DB_TEST=egy_sweets_test
- DB_USER=postgres
- PASSWORD=simple123
- BCRYPT_PASSWORD=add-this-string
- SALT_ROUNDS=10
- SECRET=add-this-token

### CREATE DATABASE

    psql postgres -h localhost -U postgres;

    CREATE DATABASE egy_sweets_dev;

    CREATE DATABASE egy_sweets_test;

    \password postgres press return

    simple123 (twice)

### Install packages

    npm install

### Create migrations

    db-migrate create users-table --sql-file
    db-migrate create products-table --sql-file
    db-migrate create orders-table --sql-file
    db-migrate create purchases-table --sql-file

### Fill sql files up and down with schema provided in `REQUIREMENTS.md`

> example users table up file

    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(64),
        firstname VARCHAR(32),
        lastname VARCHAR(48),
        password VARCHAR(255)
    );

> example users table down file

    DROP TABLE IF EXISTS users;

## ready to go!? use these scripts from package json file

### The app will run on localhost:8000

> production mode

    npm start

> development mode

    npm run watch

> testing mode will reset database first to start clean then run migration finaly run test suites.

    npm run test

## testing

I have group all endpoint tests in file called endpoint Spec.ts, I believe we do not need to test model methods, since they will be invoked with associated handler when routes being tested, so I haven't created tests for them. there are four test suites in this file as follow

1. A test suite, It have 4 scpecs to test `'/users'` endpoints

2. B test suite, It have 3 scpecs to test `'/products'` endpoints

3. C test suite, It have 4 scpecs to test `'/orders'` endpoints

4. D test suite, It have 1 scpecs to test dashboard endpoints

in addition there is a test for main endpoint `'/'` in separate file.

Thanks,
Feel good be optimistic.

### Done Saber
