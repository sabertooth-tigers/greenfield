/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';


class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      user: null,
      threads: [], // eslint-disable-line react/no-unused-state
      firstThread: undefined, // eslint-disable-line react/no-unused-state
      // NOTE: authenticator is NOT a state
      // the reason why i put this here is to make it easier to pass props
      // and make it look cleaner on the components
      // thanks -justin
      authenticator: this.authenticator.bind(this),

    };

    this.state.authenticator();
    this.refreshData = this.refreshData.bind(this);
  }

  componentDidMount() {
    this.refreshData();
  }

  //  Passed down as props through the CreateThread component in order for
  //  the List component to re-render upon POST.
  refreshData() {
    axios
      .get('/Threads')
      .then(res => this.setState({
        /* eslint-disable */
        threads: res.data,
        firstThread: res.data[0],
        /* esline-enable */
      }));
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
        <Main state={this.state} refreshData={this.refreshData}/>
      </div>
    );
  }
}


const Main = ({ state, refreshData }) => (
  <Switch>
    <Route exact path="/" render={() => <Home appState={state} refreshData={refreshData} />} />
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

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

