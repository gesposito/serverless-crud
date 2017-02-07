'use strict';

const signinHandler     = require('./lib/handlers/signinHandler');
const callbackHandler   = require('./lib/handlers/callbackHandler');
const refreshHandler    = require('./lib/handlers/refreshHandler');
const authorizeHandler  = require('./lib/handlers/authorizeHandler');

module.exports.signin     = (event, context) => signinHandler(event, context);
module.exports.callback   = (event, context) => callbackHandler(event, context);
module.exports.refresh    = (event, context, cb) => refreshHandler(event, cb);
module.exports.authorize  = (event, context, cb) => authorizeHandler(event, cb);
