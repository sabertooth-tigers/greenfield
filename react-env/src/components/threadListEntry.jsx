import React from 'react';
import PropTypes from 'prop-types';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props
const ListEntry = ({ entry, onClickHandler }) => (
  <div className="thread-entry">
    {/* eslint-disable */}
    <div 
      onClick={() => onClickHandler({ thread: entry })}
      className="title"
    >
      {`${entry.title.slice(0, 21)}...`}
    </div>
    {/* eslint-enable */}
    <div> views: {entry.views} </div>
  </div>
);

// ========================
// PROP TYPE VALIDATION
// ========================

ListEntry.defaultProps = {
  entry: {
    title: undefined,
  },
  onClickHandler: undefined,
};

ListEntry.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string,
  }),
  onClickHandler: PropTypes.func,
};

export default ListEntry;
