import React from 'react';

const inputStyle = { 'width': 360 };

const Greeting = React.createClass({
  getInitialState() {
    const { greeting } = this.props;

    return {
      'message': greeting.message,
    };
  },

  onChange(e) {
    this.setState({
      'message': e.target.value,
    });
  },

  onCreate() {
    const { onCreate } = this.props;
    const { message } = this.state;

    this.setState({
      'message': '',
    });
    onCreate({ message });
  },

  onUpdate() {
    const { greeting, onUpdate } = this.props;
    const { message } = this.state;

    onUpdate(Object.assign({}, greeting, { message }));
  },

  onDelete() {
    const { greeting, onDelete } = this.props;

    onDelete(greeting);
  },

  render() {
    const { message } = this.state;
    const { greeting } = this.props;
    const { onCreate, onChange, onUpdate, onDelete } = this;

    const isNew = !greeting.id;

    return (
      <div>
        <input
          type="text"
          value={message}
          placeholder={isNew ? "Create new message" : greeting.message}
          style={inputStyle}
          onChange={onChange}
        />
        {(() => {
          if (isNew) {
            return (
              <button onClick={onCreate}>Add</button>
            );
          }

          return (
            <span>
              <button onClick={onUpdate}>Save</button>
              <button onClick={onDelete}>Delete</button>
            </span>
          );
        })()}
      </div>
    );
  }
});

export default Greeting;
