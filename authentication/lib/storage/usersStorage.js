'use strict';

// Common
const Promise = require('bluebird');

const cognitoUser = require('./cognitoUser');
const dynamoUser = require('./dynamoUser');

const saveDatabase = profile => new Promise((resolve, reject) => {
  if (profile) {
    dynamoUser.saveUser(profile)
      .then(resolve)
      .catch(reject);
  } else {
    reject('Invalid profile');
  }
});

const saveCognito = profile => new Promise((resolve, reject) => {
  if (profile) {
    cognitoUser.saveOrUpdateUser(profile)
      .then(resolve)
      .catch(reject);
  } else {
    reject('Invalid profile');
  }
});

const saveUser = (profile) => {
  // Here you can save the profile to DynamoDB,
  // AWS Cognito or where ever you wish,
  // just remove or replace unnecessary code
  // profile class: https://github.com/laardee/serverless-authentication/blob/master/src/profile.js

  // to use dynamo as user database enable
  // return saveDatabase(profile);

  // to use cognito user pool as user database enable
  // return saveCognito(profile);

  return true;
};

exports = module.exports = {
  saveUser
};
