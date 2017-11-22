import React from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';
import ThreadComment from './ThreadComment';

//  Expects a single thread to get passed down as props.
//  For now, iterates through a collection of comments, and renders each comment.
const ViewThread = ({ thread, username, comments }) => {
  const threadComments = comments.map(comment => (
    <ThreadComment
      creator={comment.userId}
      createdAt={comment.createdAt}
      vote={comment.vote}
      text={comment.text}
    />
  ));
  return (
    <div>
      <CreateComment username={username} threadId={thread.threadId} />
      <div>{thread.creatorId}</div>
      <div>{thread.createdAt}</div>
      <div>{thread.title}</div>
      <div>{thread.description}</div>
      {threadComments.length > 0 && threadComments}
    </div>
  );
};

//  Set comments propType to be generic node in order to conform to Airbnb.
ViewThread.propTypes = {
  thread: PropTypes.shape({
    threadId: PropTypes.number.isRequired,
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string.isRequired,
  comments: PropTypes.node,
};

ViewThread.defaultProps = {
  thread: {
    threadId: 999999999,
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
  comments: [],
};

export default ViewThread;
