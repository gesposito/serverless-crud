import './App.css';

// import 'whatwg-fetch';

import React from 'react';
import { connect, PromiseState } from 'react-refetch';

import GreetingsView from './components/greeting/GreetingsView';

const App = React.createClass({
  childContextTypes: {
    'user': React.PropTypes.string,
  },

  getInitialState() {
    return {
      'user': localStorage.getItem('user_id'),
    }
  },

  getChildContext() {
    const { user } = this.state;

    return {
      user,
    };
  },

  onLogout() {
    localStorage.clear();
    window.location.href = window.location.href;
  },

  render() {
    const { user } = this.state;
    const { onLogout } = this;

    const isLogged = !!user;

    return (
      <div>
        {(() => {
          if (isLogged) {
            return (
              <div>
                Logged as {user.substring(0,9)}
                <button onClick={onLogout}>
                  Logout
                </button>
              </div>
            );
          }
          return (
            <div>
              <button onClick={() => {
                const provider = 'facebook';
                window.location.href = `${AUTH}/authentication/signin/${provider}`;
              }}>
                Facebook
              </button>
            </div>
          );
        })()}
        <GreetingsView isLogged={isLogged} />
      </div>
    );
  }
});

export default App;
