'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

const params = {
  'TableName': tableName
};

module.exports.list = (event, context, callback) => {

  dynamodb.scan(params, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        'headers': {
          'Access-Control-Allow-Origin' : '*',
        },
        'statusCode': 200,
        'body'      : JSON.stringify(result.Items),
      };

      callback(null, response);
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
