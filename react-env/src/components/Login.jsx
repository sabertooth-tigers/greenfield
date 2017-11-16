import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <p>{this.state.error}</p>
        Username: <input onChange={this.usernameQuery} type="text" />
        <br />
        Password: <input onChange={this.passwordQuery} type="text" />
      </div>
    );
  }
}

export default Login;
