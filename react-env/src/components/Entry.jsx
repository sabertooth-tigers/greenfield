import axios from 'axios';
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
      threadComments: [],
    };

    this.toggleCreateThread = this.toggleCreateThread.bind(this);
  }

  //  For the selected thread, fetch an array of associated comments.
  componentDidMount() {
    axios
      .get(`/Comments?threadId=${this.props.thread.threadId}`)
      .then((comments) => {
        this.setState({ threadComments: comments });
      })
      .catch((reason) => {
        console.error(reason);
      });
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
        <ViewThread username={username} thread={thread} comments={this.state.threadComments} />
        <button onClick={this.toggleCreateThread}>
          {buttonLabel}
        </button>
        {!this.state.isCreateThreadDisplayed && <CreateThread username={username} />}
      </div>
    );
  }
}

//  Not sure about mongoose threadId type (assuming number for now)
Entry.propTypes = {
  thread: PropTypes.shape({
    threadId: PropTypes.number.isRequired,
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string.isRequired,
};

Entry.defaultProps = {
  thread: {
    threadId: 999999999,
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
};


export default Entry;
