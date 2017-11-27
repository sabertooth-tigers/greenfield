import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import EmailValidator from 'email-validator';
import axios from 'axios';
import PropTypes from 'prop-types';
import UserAgreement from './UserAgreement';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      statusMessage: '',
    };

    // checks if we still are in a session
    if (this.props.auth) {
      this.props.auth();
    }

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
    // all of the variables from emptyField to passwordNotLongEnough
    // are conditionals for form validation, in particular order
    // these are the conditions that they fulfill
    // 1. All fields MUST be filled to sign up
    // 2. email MUST be valid
    // 3. passwords must be at least 8 characters long and must match
    const emptyField = !this.state.email || !this.state.username
    || !this.state.password || !this.state.confirmPassword;
    const invalidEmail = !EmailValidator.validate(this.state.email);
    const passwordsDontMatch = this.state.password !== this.state.confirmPassword;
    const passwordNotLongEnough = this.state.password.length < 8;

    // these two objects are designed to make the axios requests much cleaner
    // 1. entry is for the post request if the user trying to register isn't
    //    attempting to use a duplicate email
    // 2. query is for the GET request to check the db if said email exists

    const entry = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    const query = {
      params: {
        email: this.state.email,
        username: this.state.username,
      },
    };

    // form validation conditionals, meaningful names were used to ease with the reading
    // else ifs were used to ensure that order matters in validating the form
    // this is a filter to ensure the desired state of the form be met in perfect condition
    if (emptyField) {
      this.setState({ statusMessage: 'Please fill out all the required fields' });
    } else if (invalidEmail) {
      this.setState({ statusMessage: 'Please enter a valid email' });
    } else if (passwordsDontMatch) {
      this.setState({ statusMessage: 'Please make sure both password fields match.' });
    } else if (passwordNotLongEnough) {
      this.setState({ statusMessage: 'Password must be at least 8 characters long' });
    } else {
      // GET request to check for email, if email doesn't exist then register user
      axios.get('/email', query)
        .then((response) => {
          // credentials check part 2
          // we're just making sure the email and username do not exist on the database
          const hasEmail = response.data.email;
          const hasUser = response.data.username;
          if (hasEmail) {
            this.setState({ statusMessage: 'This email already exists' });
          } else if (hasUser) {
            this.setState({ statusMessage: 'This username already exists' });
          } else {
            this.setState({ statusMessage: 'Account created' });
            axios.post('/Users', entry)
              .then(() => {
                // by the time you get here, all credentials are correct and you should be
                // logged in by then, this prop just changes the header to reflect as such
                this.props.auth();
              });
          }
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


const SignUp = props => (
  <Switch>
    <Route exact path="/signup" render={() => (<SignUpBranch state={props} />)} />
    <Route path="/signup/form" render={() => (<SignUpBranch method="form" state={props} />)} />
  </Switch>
);

// ==========================
// CONDITIONAL COMPONENTS
// ==========================

const SignUpBranch = ({ state, method }) => {
  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (method === 'form') {
    return <SignUpForm auth={state.authenticator} />;
  }

  return <UserAgreement />;
};

// ======================
// PROP TYPE VALIDATION
// ======================

SignUpForm.defaultProps = {
  auth: undefined,
};

SignUpForm.propTypes = {
  auth: PropTypes.func,
};

SignUpBranch.defaultProps = {
  state: {
    isLoggedIn: false,
    authenticator: false,
  },
  method: undefined,
};

SignUpBranch.propTypes = {
  state: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    authenticator: PropTypes.func,
  }),
  method: PropTypes.bool,
};

export default SignUp;
