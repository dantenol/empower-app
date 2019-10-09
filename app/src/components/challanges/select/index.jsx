import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { default as Dropdown } from '../../_customComponents/select';
import Footer from '../../footer';
import { url } from '../../../connector';

import classes from './select.module.css';
import logo from '../../../assets/images/empower.png';

const challengesList = [
  'Vale do silício',
  'Bolsa NEJ',
  'Bolsa Arnaldo',
  'Academia de pilotos LATAM',
];

const themes = [
  'Valorização do profissional de educação',
  'Respeito e diversidade',
  'Inovação e tecnologia dentro de sala',
  'Meio ambiente e recursos naturais',
  'Segurança',
  'Família e comunidade',
  'Evasão escolar',
  'Vocação profissional e mercado de trabalho',
  'Cultura e arte',
  'Saúde e sexualidade',
];

const Select = ({ history }) => {
  const [theme, setTheme] = useState('');
  const [challenges, setChallanges] = useState([]);

  useEffect(() => {
    Axios(`${url}users/${localStorage.userId}/challenges`, {
      params: {
        access_token: localStorage.access_token,
      },
    })
      .then((r) => {
        console.log(r);
        if (r.data) {
          history.push('regras');
        }
      })
      .catch((e) => {
        console.log(e.response.data.error.code);
        if (e.response.data.error.code !== 'MODEL_NOT_FOUND') {
          alert('Algo deu errado');
          localStorage.clear();
          history.push('login');
        }
      });
  }, []);

  const selectChallenge = (c) => {
    const chas = [...challenges];
    if (chas.includes(c)) {
    } else {
      chas.push(c);
    }
    setChallanges(chas);
  };

  const start = async () => {
    const { name, school, phone, email, grade } = JSON.parse(
      localStorage.userProfile,
    );
    if (!theme) {
      return alert('Você precisa selecionar um assunto para o desafio!');
    }
    if (!challenges) {
      return alert('Você precisa selecionar no mínimo um desafio!');
    }

    try {
      const challenge = await Axios.post(
        `${url}users/${localStorage.userId}/challenges`,
        {
          theme: theme,
          school,
          team: [
            {
              name,
              phone,
              email,
              grade,
              challenges,
            },
          ],
        },
        {
          params: {
            access_token: localStorage.access_token,
          },
        },
      );
      console.log(challenge.data);
      history.push('regras');
    } catch (error) {}
  };

  return (
    <div className={classes.container}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <h1>Bem vindo(a) ao empower</h1>
      <h2>selecione os desafios que deseja participar</h2>
      <span>você pode participar de mais de um desafio</span>
      <div className={classes.challenge}>
        <div>
          {challengesList.map((c, i) => (
            <React.Fragment key={c}>
              <input
                id={`chal${i}`}
                hidden
                className={classes.toggle}
                type="checkbox"
                onChange={() => selectChallenge(c)}
              />
              <label htmlFor={`chal${i}`} className={classes.challengeClick}>
                {c}
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <h2>qual assunto você quer trabalhar no seu desafio?</h2>
      <Dropdown value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option defaultValue disabled></option>
        {themes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </Dropdown>
      <button onClick={start}>começar o desafio</button>
      <Footer />
    </div>
  );
};

export default Select;
