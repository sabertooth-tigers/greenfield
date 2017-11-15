import React from 'react';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    this.emailQuery = this.emailQuery.bind(this);
    this.usernameQuery = this.usernameQuery.bind(this);
    this.passwordQuery = this.passwordQuery.bind(this);
    this.confirmPasswordQuery = this.confirmPasswordQuery.bind(this);
  }

  emailQuery(event) {
    this.setState({ email: event.target.value });
  }

  usernameQuery(event) {
    this.setState({ username: event.target.value });
  }

  passwordQuery(event) {
    this.setState({ password: event.target.value });
  }

  confirmPasswordQuery(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div id="SignUp">
        Email: <input type="text" />
        Username: <input type="text" />
        Password: <input type="password" />
        Confirm Password: <input type="password" />
      </div>
    );
  }
}


export default SignUp;
