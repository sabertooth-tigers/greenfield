import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import CreateThread from './CreateThread';
import ViewThread from './ViewThread';

//  Contains the CreateThread button, that conditionally shows the CreateThread component.

const fakeComment = {
  userId: '2313123213213',
  createdAt: new Date(),
  vote: 0,
  text: 'hello world',
};

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreateThreadDisplayed: false,
      threadComments: [],
    };

    this.toggleCreateThread = this.toggleCreateThread.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
  }

  //  For the selected thread, fetch an array of associated comments.
  componentDidMount() {
    this.refreshComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.thread._id !== this.props.thread._id) {
      this.refreshComments();
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

  //  Expects a single selected thread to be passed down from a collection.
  render() {
    const { username, thread, refreshData } = this.props;
    let buttonLabel = null;
    if (!this.state.isCreateThreadDisplayed) {
      buttonLabel = 'I have a problem';
    } else {
      buttonLabel = 'Never mind!';
    }
    console.log('this.props.thread._ID: ', this.props.thread._id);
    return (
      <div id="entry">
        <ViewThread
          username={username}
          thread={thread}
          comments={this.state.threadComments}
          refreshComments={this.refreshComments}
        />
        <br />
        <br />
        <button onClick={this.toggleCreateThread}>
          {buttonLabel}
        </button>
        {this.state.isCreateThreadDisplayed &&
        <CreateThread username={username} refreshData={refreshData} />}
      </div>
    );
  }
}

//  Not sure about mongoose threadId type (assuming number for now)
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
};

Entry.defaultProps = {
  thread: {
    _id: '999999999',
    creatorId: 'A. Nonymous',
    description: 'This is a default thread description',
    title: 'This is a default thread title',
    createdAt: new Date(),
  },
  username: undefined,
  refreshData: () => {},
};


export default Entry;
