import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import $ from 'jquery';


let Mike = () => (
  <div>
    <Link to='/mike2'>mike</Link>
    mike is cool
  </div>
);


let Mike2 = () => (
  <div>
    mike is cool 2.0
  </div>
);

let Kevin = () => (
  <div>
i hate kevin
  </div>
);

let MikeRouter = () => (
  <Switch>
    <Route exact path='/mike' component={Mike} />
    <Route path='/mike2' component={Mike2} />
  </Switch>
);

let Main = () => (
  <Switch>
    <Route exact path='/' component={Kevin} />
    <Route path='/mike' component={MikeRouter} />
  </Switch>
);


let App = () => (
  <div>
    <Link to='/mike'>mike</Link>
    <Main/>
  </div>
);

ReactDOM.render(
  <HashRouter>
    <App/>
  </HashRouter>
, document.getElementById('root'));