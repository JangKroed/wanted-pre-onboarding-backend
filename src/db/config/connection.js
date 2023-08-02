import { Sequelize } from 'sequelize';
import env from '../../config.env.js';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, NODE_ENV } = env;

const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  logging: NODE_ENV === 'development' ? true : false,
  timezone: '+09:00',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    dateStrings: true,
    typeCast: true,
  },
});

export default sequelize;
