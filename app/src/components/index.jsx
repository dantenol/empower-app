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
import Rules from './challanges/rules';
import Policy from './policy';

const App = () => (
  <Router basename="/">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={SignUp} />
      <Route path="/perfil" component={Profile} />
      <Route path="/regras" component={Rules} />
      <Route path="/selecionar" component={Select} />
      <Route path="/resolucao" component={Resolution} />
      <Route path="/politica_de_privacidade" component={Policy} />
      <Route render={() => <Redirect to ="/login" />} />
    </Switch>
  </Router>
)

export default App;
