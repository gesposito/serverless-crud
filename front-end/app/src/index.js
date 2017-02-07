import './index.css';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

(function() {
  const query = getQueryParams(document.location.search);
  if (query.error) {
    localStorage.clear();
  } else {
    saveResponse(query);
    window.history.replaceState({'authorization_token': ''}, '', '/');
  }

  render(
    <App/>, document.querySelector('#app')
  );
}());

function getQueryParams(qs) {
  qs = qs.split('+').join(' ');
  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

function saveResponse(query) {
  const { authorization_token, refresh_token, user_id } = query;
  // Save token to local storage for later use
  if (authorization_token) {
    localStorage.setItem('authorization_token', authorization_token);
  }
  if (refresh_token) {
    localStorage.setItem('refresh_token', refresh_token);
  }
  if (user_id) {
    localStorage.setItem('user_id', user_id);
  }
}
