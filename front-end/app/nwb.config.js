const config = require('../config/config');

module.exports = {
  'type': 'react-app',
  'webpack': {
    'define': {
      'API' : JSON.stringify(config.apiGateway()),
      'AUTH': JSON.stringify(config.apiAuthentication())
    }
  }
}
