import React from 'react';

const inputStyle = { 'width': 360 };

const Greeting = React.createClass({
  contextTypes: {
    'user': React.PropTypes.string.isRequired,
  },

  getInitialState() {
    const { greeting } = this.props;

    return {
      'author'  : greeting.user,
      'message' : greeting.message,
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
    const { user } = this.context;
    const { message, author } = this.state;
    const { greeting } = this.props;
    const { onCreate, onChange, onUpdate, onDelete } = this;

    const isNew = !greeting.id;
    const isLogged = !!user;
    const isAuthor = user && (user === author);
    const isEditable = isLogged && isAuthor;

    return (
      <div>
        <input
          type="text"
          value={message}
          disabled={isNew ? !isLogged : !isEditable}
          placeholder={isNew ? "Create new message" : greeting.message}
          style={inputStyle}
          onChange={onChange}
        />
        {(() => {
          if (isNew) {
            return (
              <button disabled={!isLogged} onClick={onCreate}>Add</button>
            );
          }

          return (
            <span>
              <button disabled={!isEditable} onClick={onUpdate}>Save</button>
              <button disabled={!isEditable} onClick={onDelete}>Delete</button>
            </span>
          );
        })()}
      </div>
    );
  }
});

export default Greeting;
