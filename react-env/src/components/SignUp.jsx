import React from 'react';
import { Switch, Route } from 'react-router-dom';
import $ from 'jquery';
import EmailValidator from 'email-validator';
import UserAgreement from './UserAgreement';


class SignUpForm extends React.Component {
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
    const emptyField = !this.state.email || !this.state.username
    || !this.state.password || !this.state.confirmPassword;
    const invalidEmail = !EmailValidator.validate(this.state.email);
    const passwordsDontMatch = this.state.password !== this.state.confirmPassword;
    const passwordNotLongEnough = this.state.password.length < 8;

    if (emptyField) {
      this.setState({ statusMessage: 'Please fill out all the required fields' });
    } else if (invalidEmail) {
      this.setState({ statusMessage: 'Please enter a valid email' });
    } else if (passwordsDontMatch) {
      this.setState({ statusMessage: 'Please make sure both password fields match.' });
    } else if (passwordNotLongEnough) {
      this.setState({ statusMessage: 'Password must be at least 8 characters long' });
    } else {
      $.ajax({
        method: 'GET',
        url: '/email',
        data: {
          email: this.state.email,
          username: this.state.username,
        },
        success: (hasEmail) => {
          if (hasEmail) {
            this.setState({ statusMessage: 'This email already exists' });
          } else {
            console.log('hellooooo');
            this.setState({ statusMessage: 'Account created' });
            $.post('/Users', {
              email: this.state.email,
              username: this.state.username,
              password: this.state.password,
            });
          }
        },
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

        Email: <input
          placeholder=" ex. admin@gs-warriors.com"
          onChange={this.emailQuery}
          type="text"
        /><br />

        Username: <input
          placeholder=" ex. StephenCurry30"
          onChange={this.usernameQuery}
          type="text"
        /><br />

        Password: <input
          placeholder=" ex. P@ssw0rd"
          onChange={this.passwordQuery}
          type="password"
        /><br />

        Confirm Password: <input onChange={this.confirmPasswordQuery} type="password" /><br />
        <button onClick={this.submit} >Sign Me Up!</button><br />
        <div className="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />
      </div>
    );
  }
}


const SignUp = () => (
  <Switch>
    <Route exact path="/signup" component={UserAgreement} />
    <Route path="/signup/form" component={SignUpForm} />
  </Switch>
);

export default SignUp;
