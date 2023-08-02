import mysql2 from 'mysql2';
import env from '../../config.env';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = env;

const connection = mysql2.createConnection({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
});

(() => {
  connection.query(`
        DROP DATABASE IF EXISTS ${env.DB_NAME};
    `);
  connection.query(`
        CREATE DATABASE IF NOT EXISTS ${env.DB_NAME};
    `);

  connection.end();
})();
