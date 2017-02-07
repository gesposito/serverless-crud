'use strict';

const table   = process.env.CACHE_DB_NAME;
const config  = { 'region': process.env.REGION };

if (process.env.LOCAL_DDB_ENDPOINT) config.endpoint = process.env.LOCAL_DDB_ENDPOINT;

// Common
const AWS       = require('aws-sdk');
const dynamodb  = new AWS.DynamoDB.DocumentClient(config);
const crypto    = require('crypto');
const Promise   = require('bluebird');

function hash() {
  return crypto.randomBytes(48).toString('hex');
}

/**
 * Creates OAuth State
 */
const createState = () => {
  const state = hash();
  const params = {
    'TableName' : table,
    'Item': {
      'token'   : state,
      'type'    : 'STATE',
      'expired' : false
    }
  };

  return dynamodb
    .put(params).promise()
    .then(() => state);
};

/**
 * Revokes OAuth State
 * @param state
 */
const revokeState = state => new Promise((resolve, reject) => {
  const queryToken = () => {
    const params = {
      'TableName': table,
      'ProjectionExpression'  : '#token, #type, Expired',
      'KeyConditionExpression': '#token = :token and #type = :type',
      'ExpressionAttributeNames': {
        '#token': 'token',
        '#type' : 'type'
      },
      'ExpressionAttributeValues': {
        ':token': state,
        ':type' : 'STATE'
      }
    };

    return dynamodb
      .query(params).promise();
  };

  const insertToken = (data) => {
    const item = data.Items[0];
    if (item.expired) {
      throw new Error('State expired');
    } else {
      const params = {
        'TableName' : table,
        'Item': {
          'token'   : state,
          'type'    : 'STATE',
          'expired' : true
        }
      };

      return dynamodb
        .put(params).promise()
        .then(() => item.token);
    }
  };

  queryToken()
    .then(insertToken)
    .then((token) => {
      if (state !== token) {
        reject('State mismatch');
      }
      resolve(token);
    })
    .catch(reject);
});

/**
 * Creates and saves refresh token
 * @param user
 */
const saveRefreshToken = (user) => {
  const token = hash();
  const params = {
    'TableName' : table,
    'Item': {
      token,
      'type'    : 'REFRESH',
      'expired' : false,
      'userId'  : user
    }
  };

  return dynamodb
    .put(params).promise()
    .then(() => token);
};

/**
 * Revokes old refresh token and creates new
 * @param oldToken
 */
const revokeRefreshToken = oldToken => new Promise((resolve, reject) => {
  if (oldToken.match(/[A-Fa-f0-9]{64}/)) {
    const token = hash();

    const queryToken = () => {
      const params = {
        'TableName': table,
        'ProjectionExpression'  : '#token, #type, #userId',
        'KeyConditionExpression': '#token = :token and #type = :type',
        'ExpressionAttributeNames': {
          '#token'  : 'token',
          '#type'   : 'type',
          '#userId' : 'userId'
        },
        'ExpressionAttributeValues': {
          ':token'  : oldToken,
          ':type'   : 'REFRESH'
        }
      };

      return dynamodb
        .query(params).promise();
    };

    const newRefreshToken = (data) => {
      const userId = data.Items[0].userId;
      const params = {
        'TableName' : table,
        'Item': {
          token,
          'type'    : 'REFRESH',
          'expired' : false,
          userId
        }
      };

      return dynamodb
        .put(params).promise()
        .then(() => userId);
    };

    const expireRefreshToken = (userId) => {
      const params = {
        'TableName' : table,
        'Item': {
          'token'   : oldToken,
          'type'    : 'REFRESH',
          'expired' : true,
          userId
        }
      };

      return dynamodb
        .put(params).promise()
        .then(() => userId);
    };

    queryToken()
      .then(newRefreshToken)
      .then(expireRefreshToken)
      .then(id => resolve({ id, token }))
      .catch(reject);
  } else {
    reject('Invalid token');
  }
});

exports = module.exports = {
  createState,
  revokeState,
  saveRefreshToken,
  revokeRefreshToken
};
