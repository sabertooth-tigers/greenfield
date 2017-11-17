import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

const Header = () => (
  <nav>
    <div>
      <Link to="/">Home</Link>
    </div>
    <div>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  </nav>

);

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
const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/signup" component={SignUp} />
    <Route path="/login" component={Login} />
  </Switch>
);


const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);

// app will have header and main
