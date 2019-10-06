import { Sequelize } from 'sequelize-typescript';

import config from './config';

const env = process.env.NODE_ENV || 'development';

// @ts-ignore
const dbConfig = config[env];

export default new Sequelize({
  database: dbConfig.database,
  dialect: dbConfig.dialect,
  username: dbConfig.username,
  password: dbConfig.password,
  models: [__dirname + '/../models/**/*.ts']
});
