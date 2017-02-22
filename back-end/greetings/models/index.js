"use strict";

const Sequelize = require("sequelize");
const env       = process.env.NODE_ENV || "development";
const config    = require('../config').database(env);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Require all needed models
let modules = [
  require('./greeting.js'),
];

let models = {};

// Initialize models
modules.forEach((module) => {
  const model         = module(sequelize, Sequelize, config);
  models[model.name]  = model;
});

// Apply associations
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
