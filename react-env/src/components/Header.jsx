import React from 'react';
import { Link } from 'react-router-dom';


const Header = props => (
  <nav>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      {
        // Renders Link based on whether or not you're logged in
        // Ternary was used because logical operators aren't most favorable here
        props.isLoggedIn ?
          // If already logged in
          <div>
            <span>{`Logged in as: ${props.user.username} ID: ${props.user._id}`}</span>
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

export default Header;
