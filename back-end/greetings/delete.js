'use strict';

const models = require('./models');

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id }  = event.path;
  const { principalId } = event;

  models.Greeting.findOne({
    'where': {
      'id': id,
    }
  })
  .then((data) => {
    if (principalId !== data.user) {
      console.error(403, principalId, data.user);

      callback(new Error(`[403] Request has been forbidden`));
    } else {
      return models.Greeting.destroy({
        'where': {
          'id': id,
        }
      });
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
