import dotenv from 'dotenv'

dotenv.config();

export  const {
    DB_DEV,
    DB_TEST,
    DB_HOST,
    DB_PORT,
    DB_USER,
    PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    SECRET,
    ENV
} = process.env;
