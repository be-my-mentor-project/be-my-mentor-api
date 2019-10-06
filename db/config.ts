import { dbConfig } from '../typings/dbConfig';

const config: dbConfig = {
  development: {
    database: process.env.DB_NAME_DEV,
    username: process.env.DB_USERNAME_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
    dialect: 'postgres'
  },
  test: {
    database: process.env.DB_NAME_TEST,
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
    dialect: 'postgres'
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  },
};

export default config;

