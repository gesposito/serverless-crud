'use strict';

const table = process.env.USERS_DB_NAME;
const config = { region: process.env.REGION };

if (process.env.LOCAL_DDB_ENDPOINT) config.endpoint = process.env.LOCAL_DDB_ENDPOINT;

// Common
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient(config);

const saveUser = (profile) => {
  const params = {
    'TableName' : table,
    'Item'      : profile
  };
  return dynamodb.put(params).promise();
};

module.exports = {
  saveUser
};
