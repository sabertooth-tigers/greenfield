import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <nav>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          {
            // Renders Link based on whether or not you're logged in
            // Ternary was used because logical operators aren't most favorable here
            this.props.isLoggedIn ?
              // If already logged in
              <Link to="/logout">Logout </Link> :
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
  }
}


export default Header;
