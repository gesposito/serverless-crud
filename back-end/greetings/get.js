'use strict';

const models = require('./models');

module.exports.read = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id }  = event.pathParameters;

  models.Greeting.findOne({
    'where': {
      'id': id,
    }
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

};
