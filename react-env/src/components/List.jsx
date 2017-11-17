import React from 'react';
import ListEntry from './threadListEntry.jsx';

const List = ({ SOME_VAR }) => (
  //  CHANGE NAME OF VARIALBE WHEN DECIDED IN App
  //  Do we need () around {} after => ?
  //  USE index if _.id doesn't work. Assumptions that we will get _.id because of mongoose
  //  CHANGE SOME_VAR to array passed in
  props.SOME_VAR.map(threadEntry => (
    <div>
      <ThreadEntry entry={threadEntry} key={threadEntry._id} />
    </div>
  ))
);
export default List;
