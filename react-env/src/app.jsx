import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import fakeThreadData from '../../fakeThreadsData';

const Footer = () => (
  <div>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>

);


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      user: null,
      threads: fakeThreadData, // is an Array
      // NOTE: authenticator is NOT a state
      // the reason why i put this here is to make it easier to pass props
      // and make it look cleaner on the components
      // thanks -justin
      authenticator: this.authenticator.bind(this),
    };

    this.authenticator();
    this.authenticator = this.authenticator.bind(this);
  }

  authenticator() {
    // checks if a session is actives
    // returns a user if session is active as well as confirming an active session
    axios.get('/login')
      .then((res) => {
        this.setState(res.data);
      });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
        <Main state={this.state} />
        <Footer />
      </div>
    );
  }
}


const Main = props => (
  <Switch>
    <Route exact path="/" render={() => <Home state={props.state} />} />
    <Route path="/signup" render={() => (<SignUp state={props.state} />)} />
    <Route path="/login" render={() => (<LoginWithCheck state={props.state} />)} />
    <Route path="/logout" render={() => (<Logout auth={props.state.authenticator} />)} />
  </Switch>
);

// =============================
// Conditional Paths
// =============================


// This redirects us to home page if we try to access the login page when we're logged in
const LoginWithCheck = (props) => {
  if (props.state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Login auth={props.state.authenticator} />;
};


ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);
