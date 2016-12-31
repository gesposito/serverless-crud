const AWS = require('aws-sdk');

const offlineOptions = {
  "region"  : "localhost",
  "endpoint": "http://localhost:8000"
};
const isOffline = () => process.env.IS_OFFLINE;

module.exports = () => {
  return isOffline() ? new AWS.DynamoDB.DocumentClient(offlineOptions) :  new AWS.DynamoDB.DocumentClient();
}
