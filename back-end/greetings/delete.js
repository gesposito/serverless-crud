'use strict';

const dynamodb = require('../config/dynamodb')();

const tableName = require('./config').tableName();

module.exports.delete = (event, context, callback) => {
  const { id }  = event.path;
  const { principalId } = event;

  const read = {
    'TableName' : tableName,
    'Key': {
      'id'      : id,
    },
  };
  const params = {
    'TableName' : tableName,
    'Key': {
      'id'      : id,
    },
  };

  dynamodb.get(read, (err, result) => {
    if (err) {
      console.error(err, err.stack);

      callback(new Error(`[500] ${err}`));
    } else if (principalId !== result.Item.user) {
      console.error(403, principalId, result.Item.user);

      callback(new Error(`[403] Request has been forbidden`));
    } else {
      dynamodb.delete(params, (err, result) => {
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
    }
  });
};
