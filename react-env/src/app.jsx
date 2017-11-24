/* eslint-env browser */

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
      threads: [], // is an Array
      // NOTE: authenticator is NOT a state
      // the reason why i put this here is to make it easier to pass props
      // and make it look cleaner on the components
      // thanks -justin
      authenticator: this.authenticator.bind(this),

    };

    this.state.authenticator();
  }

  componentWillMount() {
    // this will be an axios invocation, but for now we use fake data

    axios.get('/Threads')
      .then((res) => {
        this.setState({ threads: res.data });
      });
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


const Main = ({ state }) => (
  <Switch>
    <Route exact path="/" render={() => <Home appState={state} />} />
    <Route path="/signup" render={() => (<SignUp state={state} />)} />
    <Route path="/login" render={() => (<LoginWithCheck state={state} />)} />
    <Route path="/logout" render={() => (<Logout auth={state.authenticator} />)} />
  </Switch>
);

// =============================
// Conditional Paths
// =============================


// This redirects us to home page if we try to access the login page when we're logged in
const LoginWithCheck = ({ state }) => {
  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Login auth={state.authenticator} />;
};

Main.defaultProps = {
  state: {
    isLoggedIn: false,
    authenticator: undefined,
    threads: [],
    user: undefined,
  },
};

Main.propTypes = {
  state: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    authenticator: PropTypes.func,
    threads: PropTypes.array,
    user: PropTypes.string,
  }),
};

LoginWithCheck.defaultProps = {
  state: {
    isLoggedIn: false,
    authenticator: undefined,
    threads: [],
    user: undefined,
  },
};

LoginWithCheck.propTypes = {
  state: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
    authenticator: PropTypes.func,
    threads: PropTypes.array,
    user: PropTypes.string,
  }),
};

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);
