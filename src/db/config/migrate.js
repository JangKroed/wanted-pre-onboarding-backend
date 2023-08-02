const sequelize = require('./connection');
const models = require('../models');

(async () => {
  const modelList = Object.values(models);

  for (const model of modelList) await model.drop();

  modelList.reverse();

  for (const model of modelList) await model.sync();

  await sequelize.close();
})();
