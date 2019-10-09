import React, { useState } from 'react';

import { default as Dropdown } from '../../_customComponents/select';
import Footer from '../../footer';

import classes from './select.module.css';
import logo from '../../../assets/images/empower.png';

const challengesList = ['Vale do silício', 'Bolsa NEJ', 'Bolsa Arnaldo', 'Academia de pilotos LATAM'];

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

  const selectChallenge = (c) => {
    const chas = [...challenges];
    if (chas.includes(c)) {
    } else {
      chas.push(c);
    }
    setChallanges(chas);
  };

  const start = () => {
    if (!theme) {
      return alert('Você precisa selecionar um assunto para o desafio!');
    }
    if (!challenges) {
      return alert('Você precisa selecionar no mínimo um desafio!');
    }
    history.push('regras');
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
      <Dropdown value={theme} onChange={(e) => setTheme(e)}>
        <option defaultValue disabled></option>
        {themes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </Dropdown>
      <button onClick={start}>
        começar o desafio
      </button>
      <Footer />
    </div>
  );
};

export default Select;
