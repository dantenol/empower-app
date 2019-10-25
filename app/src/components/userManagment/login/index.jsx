import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import FacebookLogin from 'react-facebook-login';

import TextField from '../../_customComponents/textField';
import Footer from '../../footer';
import { url } from '../../../connector';

import empower from '../../../assets/images/empower.png';
import classes from '../user.module.css';

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

  useEffect(() => {
    if (
      localStorage.access_token &&
      localStorage.userId &&
      localStorage.userProfile
    ) {
      const profile = JSON.parse(localStorage.userProfile);
      if (profile.school) {
        history.push('selecionar');
      } else {
        history.push('perfil');
      }
    }
  }, []);

  const login = async () => {
    try {
      const usr = await Axios.post(`${url}users/login?include=user`, {
        email: username,
        password,
      });
      localStorage.setItem('access_token', usr.data.id);
      localStorage.setItem('userId', usr.data.userId);
      localStorage.setItem('userProfile', JSON.stringify(usr.data.user));
      if (usr.data.user.school) {
        history.push('selecionar');
      } else {
        history.push('perfil');
      }
    } catch (error) {
      alert('Usuário ou senha inválido');
      setPassword('');
    }
  };

  const responseFacebook = async (response) => {
    try {
      const usr = await Axios.post(`${url}users/fbLogin`, response);
      localStorage.setItem('access_token', usr.data.token.id);
      localStorage.setItem('userId', usr.data.token.userId);
      localStorage.setItem('userProfile', JSON.stringify(usr.data.user));
      if (usr.data.user.school) {
        history.push('/selecionar');
      } else if (!usr.data.user.phone) {
        history.push('/perfil?celular');
      } else {
        history.push('/perfil');
      }
    } catch (error) {
      console.log(error.response.data.error.message);
      if (error.response.data.error.message.includes("Facebook")) {
        alert(error.response.data.error.message)
      }
    }
  };

  return (
    <main className={classes.container}>
      <img src={empower} alt="logo" className={classes.logo} />
      <div className={classes.info}>
        <h3>ENTRAR</h3>
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
        <button className={classes.green} onClick={login}>
          entrar
        </button>
        <Link className={classes.signup} to="cadastro">
          ainda não tenho conta
        </Link>
        <p>OU</p>
        <FacebookLogin
          appId="447517959200845"
          language="pt_BR"
          fields="name,email,picture"
          callback={responseFacebook}
          size="metro"
          autoLoad={false}
          textButton=" Entrar com facebook"
          icon="fa-facebook"
        />
      </div>
      <Footer />
    </main>
  );
};

export default Login;
