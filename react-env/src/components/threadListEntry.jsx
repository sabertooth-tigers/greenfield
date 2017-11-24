import React from 'react';
import PropTypes from 'prop-types';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props
const ListEntry = ({ entry, onClickHandler }) => (
  <div className="thread-entry">
    <div onClick={() => onClickHandler({ thread: entry })} className="title"> {`${entry.title.slice(0, 21)}...`} </div>
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
  id: undefined,
};

ListEntry.propTypes = {
  entry: PropTypes.shape({
    title: PropTypes.string,
  }),
  id: PropTypes.string,
};
export default ListEntry;
