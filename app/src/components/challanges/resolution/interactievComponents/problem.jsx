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

const Problem = ({ next, back }) => {
  const [state, setState] = useState({
    problem: '',
    description: '',
    causes: '',
    public: '',
    reports: '',
    frequency: '',
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
        if (state[key].length < 5) {
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
        label="Defina o problema"
        value={state.problem}
        style={{ label: labelStyle, input: inputStyle }}
        name="problem"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Descreva o problema definido"
        value={state.description}
        style={{ label: labelStyle, input: inputStyle }}
        name="description"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Quais são as possíveis causas desse problema?"
        value={state.causes}
        style={{ label: labelStyle, input: inputStyle }}
        name="causes"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Quem é o público afetado por esse problema?"
        value={state.public}
        style={{ label: labelStyle, input: inputStyle }}
        name="public"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Em entrevista, qual é o relato do público afetado?"
        value={state.reports}
        style={{ label: labelStyle, input: inputStyle }}
        name="reports"
        onChange={(e) => updateState(e)}
      />

      <TextArea
        rows={3}
        label="Qual é a frequência que esse problema acontece?"
        value={state.frequency}
        style={{ label: labelStyle, input: inputStyle }}
        name="frequency"
        onChange={(e) => updateState(e)}
      />
      <div>
        <button className={classes.next} onClick={save}>
          avançar &gt;
        </button>
        <button className={classes.back} onClick={back}>
          &lt; VOLTAR
        </button>
      </div>
    </div>
  );
};

export default Problem;
