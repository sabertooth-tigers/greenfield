import React from 'react';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props
const ListEntry = ({ entry, onClickHandler, id }) => (
  <div className="thread-entry">
    <div className="title"> {entry.title} </div>
    <div> id: {id} </div>
    <div> views: 9001 </div>
  </div>
);

export default ListEntry;
