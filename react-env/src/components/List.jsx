import React from 'react';
import ThreadEntry from './threadListEntry.jsx';

// TODO:
// ThreadEntry key should be _id, none in fake data so for now use index
const List = (props) => (
  //  CHANGE NAME OF VARIALBE WHEN DECIDED IN App
  //  Do we need () around {} after => ?
  //  USE index if _.id doesn't work. Assumptions that we will get _.id because of mongoose
  //  CHANGE SOME_VAR to array passed in
  <div id="list">
  	<h2>Trending</h2>
    {props.threads.map((threadEntry, index) => (
      <ThreadEntry entry={threadEntry} id={index} key={index} />
    ))}
  </div>
);

export default List;
