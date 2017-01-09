import './App.css';

import React from 'react';
import { connect, PromiseState } from 'react-refetch';

import Greeting from './components/greeting/Greeting';

const App = React.createClass({
  onCreate(greeting) {
    this.props.greetingsCreate(greeting);
  },

  onUpdate(greeting) {
    this.props.greetingsPut(greeting);
  },

  onDelete(greeting) {
    this.props.greetingsDelete(greeting);
  },

  render() {
    const { greetingsFetch } = this.props;
    const { onCreate, onUpdate, onDelete } = this;

    if (greetingsFetch.pending) {
      return (
        <div>
          loading
        </div>
      );
    } else if (greetingsFetch.rejected) {
      return (
        <div>
          error
        </div>
      );
    }

    // greetingsFetch.fulfilled
    const greetings = greetingsFetch.value;
    return (
      <div>
        {greetings.map((greeting) => {
          return (
            <Greeting key={greeting.id} greeting={greeting} onUpdate={onUpdate} onDelete={onDelete} />
          );
        })}

        <Greeting greeting={{ 'message': '' }} onCreate={onCreate} />
      </div>
    );
  }
});

export default connect(props => {
  const refresh = {
    'greetingsFetch': {
      'url'       : `${API}/greetings`,
      'force'     : true,
      'refreshing': true,
    }
  };

  return {
    'greetingsFetch': {
      'url'       : `${API}/greetings`,
    },
    'greetingsCreate': greeting => ({
      'greetingCreateResponse': {
        'url'     : `${API}/greetings`,
        'method'  : 'POST',
        'body'    : JSON.stringify(greeting),
        'andThen' : () => (refresh)
      }
    }),
    'greetingsPut': greeting => ({
      'greetingPutResponse': {
        'url'     : `${API}/greetings/${greeting.id}`,
        'method'  : 'PUT',
        'body'    : JSON.stringify(greeting),
        'andThen' : () => (refresh)
      }
    }),
    'greetingsDelete': greeting => ({
      'greetingDeleteResponse': {
        'url'     : `${API}/greetings/${greeting.id}`,
        'method'  : 'DELETE',
        'andThen' : () => (refresh)
      }
    }),

  };
})(App)
