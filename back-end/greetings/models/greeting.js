'use strict';

module.exports = function(sequelize, DataTypes) {
  var Greeting = sequelize.define('Greeting', {
    'message' : DataTypes.STRING,
    'user'    : DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Greeting;
};
