'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

module.exports.put = (event, context, callback) => {
  const { id }  = event.pathParameters;
  const data    = JSON.parse(event.body);

  const params = {
    "TableName" : tableName,
    "Item": {
      "id"      : id,
      "message" : data.message,
    },
  };

  dynamodb.put(params, (err, result) => {
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
