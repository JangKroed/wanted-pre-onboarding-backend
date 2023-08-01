import dotenv from 'dotenv';
dotenv.config();

class dBConnection {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV
      ? process.env.NODE_ENV.trim().toLowerCase()
      : 'development';

    const DB = {
      test: 'TEST',
      development: 'DEV',
      production: 'PRD',
    };

    this.DB_HOST = process.env[`${DB[this.NODE_ENV]}_HOST`];
    this.DB_NAME = process.env[`${DB[this.NODE_ENV]}_NAME`];
    this.DB_USER = process.env[`${DB[this.NODE_ENV]}_USER`];
    this.DB_PASSWORD = process.env[`${DB[this.NODE_ENV]}_PASSWORD`];
  }
}

class Env extends dBConnection {
  constructor() {
    super();

    this.HTTP = process.env.HTTP || 'http';
    this.PORT = Number(process.env.PORT);

    this.HOST = this.NODE_ENV === 'production' ? process.env.HOST || 'localhost' : 'localhost';
  }
}

export default new Env();
