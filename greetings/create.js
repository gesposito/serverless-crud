'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

module.exports.create = (event, context, callback) => {
  const uuid = require('uuid/v4')();
  const data = JSON.parse(event.body);

  const params = {
    "TableName" : tableName,
    "Item": {
      "id"      : uuid,
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
