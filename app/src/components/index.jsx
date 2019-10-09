import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Resolution from './challanges/resolution';
import Login from "./userManagment/login";
import Profile from "./userManagment/profile";
import Select from './challanges/select';
import SignUp from './userManagment/signup';

const App = () => (
  <Router basename="/">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={SignUp} />
      <Route path="/perfil" component={Profile} />
      <Route path="/selecionar" component={Select} />
      <Route path="/resolucao" component={Resolution} />
      <Route render={() => <Redirect to ="/login" />} />
    </Switch>
  </Router>
)

export default App;
