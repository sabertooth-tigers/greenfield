/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CreateComment from './CreateComment';
import ThreadComment from './ThreadComment';

//  Expects a single thread to get passed down as props.
//  Iterates through a collection of comments, and renders each comment.
const ViewThread = ({
  username, thread, comments, refreshComments, currentUser,
}) => (
  <div>
    <div id="view-thread">
      <h1>{thread.title}</h1>
      <div>Author: {username || 'Anonymous'}</div>
      <div>Created at:{moment(thread.createdAt).fromNow()}</div>
      <br />
      <div>{thread.description}</div>
    </div>
    {
      currentUser ?
        <CreateComment
          username={currentUser}
          threadId={thread._id}
          refreshComments={refreshComments}
        /> :
        <h3>You must be logged in to post comments</h3>
    }

    {
      comments ?
      comments.map(comment =>
        (<ThreadComment
          creator={comment.username}
          key={`${comment.username} ${comment.createdAt.toString()}`}
          createdAt={comment.createdAt}
          vote={comment.vote}
          text={comment.text}
        />)) :
        'no comments here'
    }
  </div>
);

//  Set comments propType to be generic node in order to conform to Airbnb.
ViewThread.propTypes = {
  thread: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    creatorId: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }),
  currentUser: PropTypes.string,
  username: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
  refreshComments: PropTypes.func,
};

ViewThread.defaultProps = {
  thread: {
    _id: '999999999',
    creatorId: 'A. Nonymous',
    description: 'Explain all your problems in a new thread...',
    title: 'There are no problems in the world!',
    createdAt: new Date(),
  },
  currentUser: undefined,
  username: undefined,
  comments: [],
  refreshComments: () => {},
};

export default ViewThread;
