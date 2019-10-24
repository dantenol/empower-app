import React, { useState } from 'react';
import Axios from 'axios';

import TextField from '../../_customComponents/textField';
import Footer from '../../footer';
import { url } from '../../../connector';

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
  phone: /^$|^\(([0-9]{2})\)\s?[4-9]{1}[0-9]{4}[-\s]?[0-9]{4}$/i,
};

const Profile = ({ history, location }) => {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [phone, setPhone] = useState('');

  const handleChangePhone = (e) => {
    if (!e.target.value.match(/[a-z]/gi)) {
      setPhone(e.target.value);
    }
  };

  const submit = async () => {
    const data = {
      school,
      grade,
    };
    
    if (location.search.includes('celular')) {
      data.phone = phone;
    }

    if (!school || !grade) {
      return alert('Preencha todos os campos');
    }
    if (location.search.includes('celular') && !phone.match(validator.phone)) {
      return alert('Preencha seu celular corretamente')
    }

    try {
      const res = await Axios.patch(
        `${url}users/${localStorage.userId}`,
        data,
        {
          params: {
            access_token: localStorage.access_token,
          },
        },
      );
      localStorage.setItem('userProfile', JSON.stringify(res.data))
      history.push('selecionar');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={classes.container}>
      <img src={empower} alt="logo" className={classes.logo} />
      <div className={classes.info}>
        <h3>Falta pouco! Complete seu cadastro</h3>
        <br />
        {location.search.includes('celular') && (
        <NumberFormat
          value={phone}
          autoComplete="off"
          style={styles}
          onChange={(e) => handleChangePhone(e)}
          type="tel"
          label="celular"
          format="(##) #####-####"
          customInput={TextField}
        />
        )}
        <TextField
          label="Escola"
          value={school}
          style={styles}
          onChange={(e) => setSchool(e.target.value)}
        />
        <TextField
          label="série/ano"
          value={grade}
          style={styles}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button className={classes.white} onClick={submit}>
          finalizar
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;
