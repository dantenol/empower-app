import React, { useState } from 'react';
import Axios from 'axios';

import Select from '../../_customComponents/select';
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

const Profile = ({ history, location }) => {
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [state, setState] = useState('');

  const submit = async () => {
    if (!school || !grade || !state) {
      return alert('Preencha todos os campos');
    }
    try {
      const res = await Axios.patch(
        `${url}users/${localStorage.userId}`,
        {
          school,
          grade,
          state,
        },
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
        <Select
          label="Estado"
          style={styles}
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="MG">MG</option>
          <option value="SP">SP</option>
        </Select>
        <button className={classes.white} onClick={submit}>
          finalizar
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Profile;
