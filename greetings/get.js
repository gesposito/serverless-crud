'use strict';

const dynamodb = require('../config/dynamodb')();

module.exports.get = (event, context, callback) => {
  const { id }  = event.pathParameters;

  const params = {
    "TableName" : 'greetings',
    "Key": {
      "id"      : id,
    },
  };

  dynamodb.get(params, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        "statusCode": 200,
        "body"      : JSON.stringify(result.Item),
      };

      callback(null, response);
    }
  });

};
