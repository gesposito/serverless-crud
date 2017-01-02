'use strict';

const dynamodb = require('../config/dynamodb')();

module.exports.delete = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    "TableName" : 'greetings',
    "Key": {
      "id"      : id,
    },
  };

  dynamodb.delete(params, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        "statusCode": 200,
        "body"      : JSON.stringify(result),
      };

      callback(null, response);
    }
  });

};
