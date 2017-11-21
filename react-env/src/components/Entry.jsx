import React from 'react';
import PropTypes from 'prop-types';
import CreateThread from './CreateThread';
import ViewThread from './ViewThread';

//  Contains the CreateThread button, that conditionally shows the CreateThread component.
class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateThreadDisplayed: false,
    };

    this.toggleCreateThread = this.toggleCreateThread.bind(this);
  }

  toggleCreateThread() {
    this.setState({
      isCreateThreadDisplayed: !this.state.isCreateThreadDisplayed,
    });
  }

  //  Expects a single selected thread to be passed down from a collection.
  render() {
    const { username, thread } = this.props;
    let buttonLabel = null;
    if (!this.state.isCreateThreadDisplayed) {
      buttonLabel = 'I have a problem';
    } else {
      buttonLabel = 'Never mind!';
    }
    return (
      <div>
        <ViewThread username={username} thread={thread} />
        <button onClick={this.toggleCreateThread}>
          {buttonLabel}
        </button>
        {!this.state.isCreateThreadDisplayed && <CreateThread username={username} />}
      </div>
    );
  }
}

Entry.propTypes = {
  thread: PropTypes.shape({
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string.isRequired,
};

Entry.defaultProps = {
  thread: {
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
};


export default Entry;
