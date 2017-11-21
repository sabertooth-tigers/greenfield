import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';


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
    };

    this.authenticator();
    this.authenticator = this.authenticator.bind(this);
  }

  authenticator() {
    axios.get('/login')
      .then((res) => {
        this.setState(res.data);
      });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} isLoggedIn={this.state.isLoggedIn} />
        <Main isLoggedIn={this.state.isLoggedIn} authenticator={this.authenticator} />
        <Footer />
      </div>
    );
  }
}

const Main = props => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      path="/signup"
      render={() => (<SignUp isLoggedIn={props.isLoggedIn} auth={props.authenticator} />)} 
    />
    <Route path="/login" component={Login} />
    <Route path="/logout" render={() => (<Logout auth={props.authenticator} />)} />
  </Switch>
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);
