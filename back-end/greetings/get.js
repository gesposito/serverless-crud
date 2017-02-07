'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

module.exports.read = (event, context, callback) => {
  const { id }  = event.pathParameters;

  const params = {
    'TableName' : tableName,
    'Key': {
      'id'      : id,
    },
  };

  dynamodb.get(params, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        'headers': {
          'Access-Control-Allow-Origin' : '*',
        },
        'statusCode': 200,
        'body'      : JSON.stringify(result.Item),
      };

      callback(null, response);
    }
  });

};
