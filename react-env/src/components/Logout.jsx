import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Logout extends React.Component {
  constructor({ auth }) {
    super({ auth });
    axios.post('/logout')
      .then(() => {
        auth();
      });
  }
  render() {
    return (
      <div>
        <h1>You have successfully logged out</h1>
      </div>
    );
  }
}

Logout.propTypes = {
  auth: PropTypes.func,
};

Logout.defaultProps = {
  auth: undefined,
};

export default Logout;
