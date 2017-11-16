import React from 'react';

//  Need onclickHandler passed down from props
//  ES6 destructuring attempt Might need to go back to props
const ListEntry = ({ entry, onClickHandler }) => (
  <div>
    <div onClick={() => onClickHandler(entry)}>
      <h4>title {entry.title} </h4>
    </div>
    <h4>Description {entry.description}</h4>
  </div>
);

export default ListEntry;
