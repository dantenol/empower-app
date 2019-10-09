import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Resolution from './challanges/resolution';
import Login from "./userManagment/login";
import Select from './challanges/select';

const App = () => (
  <Router basename="/">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/resolucao" component={Resolution} />
      <Route path="/selecionar" component={Select} />
      <Route render={() => <Redirect to ="/login" />} />
    </Switch>
  </Router>
)

export default App;
