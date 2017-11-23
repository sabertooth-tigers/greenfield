import React from 'react';
import PropTypes from 'prop-types';

//  Conforming to Airbnb linter here, combined with destructuring.
const ThreadComment = ({
  creator, createdAt, vote, text,
}) => (
  <div>
    {console.log(createdAt())}
    <div>{creator}</div>
    <div>{vote}</div>
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
  creator: 'Nahn Existent',
  createdAt: new Date(),
  vote: 0,
  text: 'This should not be rendered.',
};

export default ThreadComment;
