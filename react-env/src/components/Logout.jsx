import React from 'react';
import axios from 'axios';

const Logout = (props) => {
  axios.post('/logout');
  props.auth();

  return (
    <div>
      <h1>You have successfully logged out</h1>
    </div>
  );
};

export default Logout;
