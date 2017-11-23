import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Entry from './Entry';


const Home = ({ state }) => (
  <div id="home">
    {console.log(state)}
    {console.log('hello world', state.threads)}
    <List threads={state.threads} />
    <Entry username="hello world" thread={state.threads[0]} />
  </div>
);

// ======================
// PROP TYPE VALIDATION
// ======================

Home.defaultProps = {
  state: {
    isLoggedIn: false,
    authenticator: undefined,
    threads: [],
    user: undefined,
  },
};

Home.propTypes = {
  state: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    authenticator: PropTypes.func,
    threads: PropTypes.array,
    user: PropTypes.string,
  }),
};

export default Home;
