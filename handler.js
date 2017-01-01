'use strict';

const dynamodb = require('./config/dynamodb')();

const params = {
  "TableName": 'greetings'
};

module.exports.hello = (event, context, callback) => {

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.error(err, err.stack);
      
      callback(new Error(`[500] ${err}`));
    } else {
      const response = {
        "statusCode": 200,
        "body": JSON.stringify({
          "messages": data.Items,
        }),
      };

      callback(null, response);
    }
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
