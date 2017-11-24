/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ isLoggedIn, user }) => (
  <nav>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      {
        // Renders Link based on whether or not you're logged in
        // Ternary was used because logical operators aren't most favorable here
        isLoggedIn ?
          // If already logged in
          <div>
            <span>{`Logged in as: ${user.username} ID: ${user._id}`}</span>
            <Link to="/logout"> Logout </Link>
          </div>
          :
          // If not logged in at all
          <div>
            <Link to="/login">Login</Link>
            {' '}
            <Link to="/signup">Sign Up </Link>
          </div>
      }
    </div>
  </nav>

);

// ================================
// PROP TYPE VALIDATION
// ================================

Header.defaultProps = {
  isLoggedIn: false,
  user: {
    username: undefined,
    _id: undefined,
  },
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default Header;
