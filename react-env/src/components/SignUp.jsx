import React from 'react';
import $ from 'jquery';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      statusMessage: '',
    };

    // this is here simply so i don't have to use .bind for every call. (also render looks cleaner)
    this.emailQuery = this.emailQuery.bind(this);
    this.usernameQuery = this.usernameQuery.bind(this);
    this.passwordQuery = this.passwordQuery.bind(this);
    this.confirmPasswordQuery = this.confirmPasswordQuery.bind(this);
    this.submit = this.submit.bind(this);
  }

  // queries are here to change whenever a field changes
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
    this.setState({ confirmPassword: event.target.value });
  }

  // will error and do nothing if passwords dont match
  // otherwise removes error (or doesnt really setstate if no error) and invokes post request
  submit() {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ statusMessage: 'Please make sure both password fields match.' });
    } else {
      this.setState({ statusMessage: 'Account created' });

      $.post('/Users', {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      });
    }
  }

  // header and error message elements added to top
  // inputs for queries follow afterwards with a submit button
  // captcha is only test for now (the data-sitekey is made for that)
  render() {
    return (
      <div id="SignUp">
        <h2> Create A New Account</h2>
        <p>{this.state.statusMessage ? this.state.statusMessage : <br />}</p>
        Email: <input onChange={this.emailQuery} type="text" />
        <br />
        Username: <input onChange={this.usernameQuery} type="text" />
        <br />
        Password: <input onChange={this.passwordQuery} type="password" />
        <br />
        Confirm Password: <input onChange={this.confirmPasswordQuery} type="password" />
        <br />
        <button onClick={this.submit} >Sign Me Up!</button>
        <br />
        <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
      </div>
    );
  }
}


export default SignUp;
