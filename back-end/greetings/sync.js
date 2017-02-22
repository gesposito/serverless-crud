'use strict';

const models = require('./models');

module.exports.sync = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  models.sequelize.sync().then(() => {
    console.info('DB is synced');

    callback(null, {});
  }).catch((err) => {
    console.error(err, err.stack);

    callback(new Error(`[500] ${err}`));
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
