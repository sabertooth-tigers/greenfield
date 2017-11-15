import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Link } from 'react-router-dom';
// import $ from 'jquery';

const Home = () => (
  <div>
  But why
  </div>
);

const Header = () => (
  <Link to="/">Home</Link>
);

const Main = () => (
  <Switch>
    <Route exact path="/home" component={Home} />
  </Switch>
);


const App = () => (
  <div>
    <Header />
    <Main />

  </div>
);

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('root'),
);

// app will have header and main
