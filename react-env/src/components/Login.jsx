import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      statusMessage: '',
    };

    this.usernameQuery = this.usernameQuery.bind(this);
    this.passwordQuery = this.passwordQuery.bind(this);
    this.submit = this.submit.bind(this);
  }

  usernameQuery(e) {
    this.setState({ username: e.target.value });
  }

  passwordQuery(e) {
    this.setState({ password: e.target.value });
  }

  submit() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password,
    })
      .then(() => {
        this.props.auth();
      });
  }

  render() {
    return (
      <div id="Login">
        <h2>Login</h2>
        <p>{this.state.statusMessage}</p>
        Username: <input onChange={this.usernameQuery} type="text" />
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
