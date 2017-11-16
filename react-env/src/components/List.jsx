import React from 'react';
// import listEntry from './listEntry.jsx';

const List = (props) => (
  //  CHANGE NAME OF VARIALBE WHEN DECIDED IN App
  //  Do we need () around {} after => ?
  //  USE index if _.id doesn't work. Assumptions that we will get _.id because of mongoose
  props.SOME_VAR.map((threadEntry) => {
    return (
      <div>
        <ThreadEntry entry={threadEntry} key={threadEntry._id} />
      </div>
    )
  }
)

export default List;
