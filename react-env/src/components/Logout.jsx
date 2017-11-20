import React from 'react';
import axios from 'axios';

const Logout = () => {
  axios.post('/logout');
  return (
    <div>
      <h1>You have successfully logged out</h1>
    </div>
  );
};

export default Logout;
