import React, { useState } from 'react';

import TextField from '../../_customComponents/textField';
import Footer from '../../footer';

import empower from '../../../assets/images/empower.png';
import classes from '../user.module.css';
import NumberFormat from 'react-number-format';

const styles = {
  label: {
    color: 'white',
  },
  input: {
    borderColor: 'white',
  },
};
const validator = {
  phone: /^\(([0-9]{2})\)\s?[4-9]{1}[0-9]{4}[-\s]?[0-9]{4}$/i,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

const SignUp = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const submit = () => {
    if (!name || !email || !phone || !password) {
      return alert('Preencha todos os campos');
    }
    if (!email.match(validator.email)) {
      return alert('Use um email válido');
    }
    if (!phone.match(validator.phone)) {
      return alert('Use um número de celular válido');
    }
    if (password !== repeatPassword) {
      return alert('Ops, parece que suas senhas não conferem');
    }
    history.push('perfil');
  };

  const handleChangePhone = (e) => {
    if (!e.target.value.match(/[a-z]/gi)) {
      setPhone(e.target.value);
    }
  };
  return (
    <main className={classes.container}>
      <img src={empower} alt="logo" className={classes.logo} />
      <div className={classes.info}>
        <h3>CADASTRAR</h3>
        <br />
        <TextField
          label="Nome e sobrenome"
          value={name}
          style={styles}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="email"
          value={email}
          type="email"
          style={styles}
          onChange={(e) => setEmail(e.target.value)}
        />
        <NumberFormat
          value={phone}
          autocomplete="off"
          style={styles}
          onChange={(e) => handleChangePhone(e)}
          type="tel"
          label="celular"
          format="(##) #####-####"
          customInput={TextField}
        />
        <TextField
          label="senha"
          value={password}
          type="password"
          style={styles}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="confirme a senha"
          value={repeatPassword}
          type="password"
          style={styles}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <button className={classes.white} onClick={submit}>
          finalizar
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default SignUp;
