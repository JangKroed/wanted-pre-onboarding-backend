const models = require('../models');

module.exports = () => {
  const modelList = Object.values(models);

  for (const model of modelList) {
    model.associate();
  }
};
