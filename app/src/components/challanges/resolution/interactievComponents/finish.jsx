import React from 'react';

import classes from '../resolution.module.css';

const Finish = ({back}) => {
  return (
    <div className={classes.finish}>
      <h2>Seu desafio foi registrado com sucesso!</h2>
      <p>Aguarde alguns dias enquanto avaliamos todos os projetos</p>

      <button className={classes.back} onClick={back}>
          &lt; VER NOVAMENTE
        </button>
    </div>
  );
};

export default Finish;
