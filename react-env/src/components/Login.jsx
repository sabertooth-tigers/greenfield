import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
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
        <br />
        <button onClick={this.submit} >Login </button>
        <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
      </div>
    );
  }
}

export default Login;
