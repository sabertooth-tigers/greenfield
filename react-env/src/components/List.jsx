/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */


import React from 'react';
import PropTypes from 'prop-types';
import ThreadEntry from './threadListEntry';

// TODO:
// ThreadEntry key should be _id, none in fake data so for now use index
const List = ({ threads, clickHandler }) => (
  //  CHANGE NAME OF VARIALBE WHEN DECIDED IN App
  //  Do we need () around {} after => ?
  //  USE index if _.id doesn't work. Assumptions that we will get _.id because of mongoose
  //  CHANGE SOME_VAR to array passed in
  <div id="list">
    <h2>Trending</h2>
    {threads.map(threadEntry => (
      <div>
        <hr />
        <ThreadEntry onClickHandler={clickHandler} entry={threadEntry} key={threadEntry._id} />
      </div>
    ))}
    <hr />
  </div>
);


// ======================================
// PROP TYPE VALIDATION
// ======================================

List.defaultProps = {
  threads: [],
  clickHandler: undefined,
};

List.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object),
  clickHandler: PropTypes.func,
};
export default List;
