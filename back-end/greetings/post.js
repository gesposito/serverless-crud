'use strict';

const models = require('./models');

module.exports.post = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const uuid = require('uuid/v4')();
  const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  models.Greeting.create({
    'id'      : uuid,
    'message' : data.message,
    'user'    : event.principalId,
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
