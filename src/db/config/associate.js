import * as models from '../models/index.js';

export default () => {
  const modelList = Object.values(models);

  for (const model of modelList) model.associate();
};
