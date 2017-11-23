import React from 'react';
import PropTypes from 'prop-types';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props
const ListEntry = ({ entry, id }) => (
  <div className="thread-entry">
    <div className="title"> {entry.title} </div>
    <div> id: {id} </div>
    <div> views: 9001 </div>
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
