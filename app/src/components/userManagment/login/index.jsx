import React, { useState } from 'react';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import TextField from '../../_customComponents/textField';

import empower from '../../../assets/images/empower.png';
import classes from './login.module.css';

const styles = {
  label: {
    color: 'white',
  },
  input: {
    borderColor: 'white',
  },
};

const Login = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    history.push('bemvindo');
  };

  return (
    <main className={classes.container}>
      <img src={empower} alt="logo" className={classes.logo} />
      <div className={classes.info}>
        <p>ENTRAR</p>
        <TextField
          label="email"
          value={username}
          type="email"
          style={styles}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="senha"
          value={password}
          type="password"
          style={styles}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={classes.white} onClick={login}>
          entar
        </button>
        <p>OU</p>
        <GoogleLoginButton className={classes.social}>
          <span>Entrar com Google</span>
        </GoogleLoginButton>
        <FacebookLoginButton className={classes.social}>
          <span>Entrar com facebook</span>
        </FacebookLoginButton>
      </div>
    </main>
  );
};

export default Login;
