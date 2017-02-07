'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

module.exports.post = (event, context, callback) => {
  const uuid = require('uuid/v4')();
  const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const params = {
    'TableName' : tableName,
    'Item': {
      'id'      : uuid,
      'message' : data.message,
      'user'    : event.principalId,
    },
  };

  dynamodb.put(params, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        'headers': {
          'Access-Control-Allow-Origin' : '*',
        },
        'statusCode': 200,
        'body'      : JSON.stringify(result),
      };

      callback(null, response);
    }
  });

};
