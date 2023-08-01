import httpServer from './src/app.js';
import env from './src/config.env.js';

httpServer.listen(env.PORT, () => {
  console.log(`SERVER RUNNING ON`, httpServer.address());

  // if (env.NODE_ENV !== 'test') {
  //   sequelize
  //     .authenticate()
  //     .then(() => {
  //       associate();
  //       console.log('DB CONNECTED');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       console.log('DB CONNECTION FAIL');

  //       process.exit(0);
  //     });
  // }
});
