import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
//  Conforming to Airbnb linter here, combined with destructuring.
const ThreadComment = ({
  creator, createdAt, vote, text,
}) => (
  <div className="comment">
    <span className="comment-user">{creator} </span>
    <span>Votes: {vote} </span>
    <span className="comment-created">Created at:{moment(createdAt).fromNow()}</span>
    <div>{text}</div>
  </div>
);

ThreadComment.propTypes = {
  creator: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  vote: PropTypes.number,
  text: PropTypes.string,
};

//  These should never render because ViewThread prevents handling empty comment collections.
ThreadComment.defaultProps = {
  creator: 'Anonymous',
  createdAt: new Date(),
  vote: 0,
  text: 'This should not be rendered.',
};

export default ThreadComment;
