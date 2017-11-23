import React from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';
import ThreadComment from './ThreadComment';

//  Expects a single thread to get passed down as props.
//  For now, iterates through a collection of comments, and renders each comment.

class ViewThread extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <CreateComment username={this.props.username} threadId={this.props.thread._id} />
        <div>{this.props.thread.creatorId}</div>
        <div>{this.props.thread.title}</div>
        <div>{this.props.thread.description}</div>
        {
          this.props.comments.map(comment =>
            (<ThreadComment
              creator={comment.userId}
              key={comment.userId + '' + comment.createdAt.toString()}
              createdAt={comment.createdAt}
              vote={comment.vote}
              text={comment.text}
            />))}
      </div>
    );
  }
}

//  Set comments propType to be generic node in order to conform to Airbnb.
ViewThread.propTypes = {
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
};

ViewThread.defaultProps = {
  thread: {
    _id: '999999999',
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
  username: undefined,
  comments: [],
};

export default ViewThread;
