import React, { useState } from 'react';

import TextField from '../../../_customComponents/textField';
import TextArea from '../../../_customComponents/textArea';

import classes from '../resolution.module.css';

const labelStyle = {
  marginBottom: 4,
  fontWeight: 'normal',
  textTransform: 'initial',
};

const inputStyle = {
  width: '100%',
};

const JOTRIFALSUAPLA = ({ next, back }) => {
  const [state, setState] = useState({
    name: '',
    resolution: '',
    target: '',
    deliver: '',
    steps: '',
    resources: '',
    sponsor: '',
    team: '',
    expectations: '',
  });

  const updateState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = () => {
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        if (state[key].length < 4) {
          return alert(
            'Você deve preencher todos os campos para espeficicar o problema!',
          );
        }
      }
    }
    next();
  };

  return (
    <div className={classes.containter}>
      <TextField
        label="Nome do projeto"
        value={state.name}
        style={{ label: labelStyle, input: inputStyle }}
        name="name"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Descreva o que será feito para resolver esse problema"
        value={state.resolution}
        style={{ label: labelStyle, input: inputStyle }}
        name="resolution"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Para quem é essa solução?"
        value={state.target}
        style={{ label: labelStyle, input: inputStyle }}
        name="target"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Como você irá entregar essa solução?"
        value={state.deliver}
        style={{ label: labelStyle, input: inputStyle }}
        name="deliver"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Qual é o passo a passo para chegar nessa solução?"
        value={state.steps}
        style={{ label: labelStyle, input: inputStyle }}
        name="steps"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Quais recursos serão necessários para tirar a ideia do papel?"
        value={state.resources}
        style={{ label: labelStyle, input: inputStyle }}
        name="resources"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Quem irá promover os recursos?"
        value={state.sponsor}
        style={{ label: labelStyle, input: inputStyle }}
        name="sponsor"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Quem são as pessoas que vão ajudar a executar o projeto?"
        value={state.team}
        style={{ label: labelStyle, input: inputStyle }}
        name="team"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="O que você espera de resultado?"
        value={state.expectations}
        style={{ label: labelStyle, input: inputStyle }}
        name="expectations"
        onChange={(e) => updateState(e)}
      />
      <div>
        <button
          // disabled={students.length < 2}
          className={classes.next}
          onClick={save}
        >
          avançar &gt;
        </button>
        <button className={classes.back} onClick={back}>
          &lt; VOLTAR
        </button>
      </div>
    </div>
  );
};

export default JOTRIFALSUAPLA;
