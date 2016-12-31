'use strict';

var AWS       = require('aws-sdk');
var dynamodb  = new AWS.DynamoDB();

var params = {
  "TableName": 'greetings'
};

module.exports.hello = (event, context, callback) => {

  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.error(err, err.stack);
      callback(err);
    } else {
      const response = {
        "statusCode": 200,
        "body": JSON.stringify({
          "messages": data,
        }),
      };

      callback(null, response);
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
