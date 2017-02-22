'use strict';

const models = require('./models');

module.exports.list = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  models.Greeting.findAll({
  })
  .then((data) => {
    const response = {
      'headers': {
        'Access-Control-Allow-Origin' : '*',
      },
      'statusCode': 200,
      'body'      : JSON.stringify(data),
    };

    callback(null, response);
  })
  .catch((err) => {
    console.error(err, err.stack);

    callback(new Error(`[500] ${err}`));
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
