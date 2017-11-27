/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import CreateThread from './CreateThread';
import ViewThread from './ViewThread';

//  Form displays when a user decides to create a new thread. Toggled in state via button.
class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateThreadDisplayed: false,
      threadComments: [],
      username: undefined,
    };

    if (this.props.username) {
      this.currentUser = this.props.username.username;
    }

    this.toggleCreateThread = this.toggleCreateThread.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
  }

  //  For the selected thread, fetch an array of associated comments.
  componentDidMount() {
    this.refreshComments();
  }

  //  React lifecycle method triggered by new comment creation.
  componentDidUpdate(prevProps) {
    if (prevProps.thread._id !== this.props.thread._id) {
      this.getUser();
      this.refreshComments();
    }
  }

  //  Handles getting all comments for a given thread.
  //  Updates as different List threads are clicked.


  getUser() {
    if (this.props.thread.creatorId) {
      axios.get(`/Users?id=${this.props.thread.creatorId}`)
        .then(({ data }) => {
          this.setState({ username: data.username });
        });
    } else {
      this.setState({ username: undefined });
    }
  }

  refreshComments() {
    axios
      .get(`/Comments?threadId=${this.props.thread._id}`)
      .then(({ data }) => this.setState({ threadComments: data }))
      .catch(reason => console.error(reason));
  }

  toggleCreateThread() {
    this.setState({
      isCreateThreadDisplayed: !this.state.isCreateThreadDisplayed,
    });
  }

  toggleEntryDisplay() {
    const { username, thread, refreshData } = this.props;
    let buttonLabel = null;

    if (!this.state.isCreateThreadDisplayed) {
      buttonLabel = 'Click me!';
    } else {
      buttonLabel = 'Never mind!';
    }

    if (this.state.isCreateThreadDisplayed) {
      return (
        <div id="entry">
          <div className="entry-header">
            <h3 style={{ display: 'inline' }}>So...no problem at all? </h3>
            <button onClick={this.toggleCreateThread}>
              {buttonLabel}
            </button>
            <CreateThread
              username={username}
              refreshData={refreshData}
              clickThread={this.props.threadClick}
              toggle={this.toggleCreateThread}
            />
          </div>
        </div>


      );
    }

    return (
      <div id="entry">
        {
          this.currentUser ?
            <div className="entry-header">
              <h3 style={{ display: 'inline' }}>Have a problem? </h3>
              <button onClick={this.toggleCreateThread}>
                {buttonLabel}
              </button>
            </div> :
            <div className="entry-header">
              <h3>Have a problem? Register to get help</h3>
            </div>
        }

        <ViewThread
          currentUser={this.currentUser}
          username={this.state.username}
          thread={thread}
          comments={this.state.threadComments}
          refreshComments={this.refreshComments}
        />
      </div>
    );
  }
  //  Form for submitting a new problem is not displayed by default in order
  //  to keep the UI clean. When the user clicks on a button, the form is shown.
  render() {
    return this.toggleEntryDisplay();
  }
}

Entry.propTypes = {
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string,
  refreshData: PropTypes.func,
  threadClick: PropTypes.func,
};

Entry.defaultProps = {
  thread: {
    _id: undefined,
    creatorId: 'A. Nonymous',
    description: 'This is a default thread description',
    title: 'This is a default thread title',
    createdAt: new Date(),
  },
  username: 'A. Nonymous',
  refreshData: () => {},
  threadClick: () => {},
};


export default Entry;
