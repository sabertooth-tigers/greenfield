import React from 'react';
import { Redirect } from 'react-router-dom';
// import isLoggedIn from '../helpers/index.js';
import $ from 'jquery';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      statusMessage: '',
    };

    this.emailQuery = this.emailQuery.bind(this);
    this.passwordQuery = this.passwordQuery.bind(this);
    this.submit = this.submit.bind(this);
  }

  emailQuery(e) {
    this.setState({ email: e.target.value });
  }

  passwordQuery(e) {
    this.setState({ password: e.target.value });
  }

  submit() {
    $.ajax({
      type: 'GET',
      url: '/Users',
      data: {
        email: this.state.email,
        password: this.state.password,
      },
      success: () => {
        this.setState({ statusMessage: 'Password Matched' });
      },
      error: () => {
        this.setState({ statusMessage: 'The password you entered was incorrect. Please try again.' });
      },
    })
      .on('success', (response) => {
        if (response) {
          return <Redirect to="/" />;
        }
        return <Redirect to="/login" />;
      })
      .on('error', (error) => {
        this.setState({ statusMessage: error });
      });
  }

  render() {
    return (
      <div id="Login">
        <h2>Login</h2>
        <p>{this.state.error}</p>
        email: <input onChange={this.emailQuery} type="text" />
        <br />
        Password: <input onChange={this.passwordQuery} type="password" />
        <p>{this.state.statusMessage ? this.statusMessage : <br />}</p>
        <br />
        <button onClick={this.submit} >Login </button>
        <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
      </div>
    );
  }
}

export default Login;
