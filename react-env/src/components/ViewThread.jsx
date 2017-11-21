import React from 'react';
import PropTypes from 'prop-types';
import CreateComment from './CreateComment';

//  Expects a single thread to get passed down as props.
const ViewThread = ({ thread, username }) => (
  <div>
    <div>{thread.creatorId}</div>
    <div>{thread.createdAt}</div>
    <div>{thread.title}</div>
    <div>{thread.description}</div>
    <CreateComment username={username} />
  </div>
);

ViewThread.propTypes = {
  thread: PropTypes.shape({
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  username: PropTypes.string.isRequired,
};

ViewThread.defaultProps = {
  thread: {
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
};

export default ViewThread;
