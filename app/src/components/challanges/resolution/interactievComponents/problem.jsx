import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import TextField from '../../../_customComponents/textField';
import TextArea from '../../../_customComponents/textArea';
import { url } from '../../../../connector';

import classes from '../resolution.module.css';

const params = { access_token: localStorage.access_token };

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
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    Axios(`${url}users/${localStorage.userId}/challenges`, { params }).then(
      (res) => {
        if (res.data.problem) {
          setState(res.data.problem);
          setLocked(true);
          next(2);
        }
      },
    );
  }, []);

  const updateState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    for (const key in state) {
      if (state.hasOwnProperty(key)) {
        if (state[key].length < 5) {
          return alert(
            'Você deve preencher todos os campos para espeficicar o problema!',
          );
        }
      }
    }
    try {
      const res = await Axios.put(
        `${url}users/${localStorage.userId}/challenges`,
        {problem: state},
        { params },
      );
      console.log(res);
      setLocked(true);
      next();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.containter}>
      <TextField
        label="Defina o problema"
        value={state.problem}
        style={{ label: labelStyle, input: inputStyle }}
        name="problem"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Descreva o problema definido"
        value={state.description}
        style={{ label: labelStyle, input: inputStyle }}
        name="description"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Quais são as possíveis causas desse problema?"
        value={state.causes}
        style={{ label: labelStyle, input: inputStyle }}
        name="causes"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Quem é o público afetado por esse problema?"
        value={state.public}
        style={{ label: labelStyle, input: inputStyle }}
        name="public"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Em entrevista, qual é o relato do público afetado?"
        value={state.reports}
        style={{ label: labelStyle, input: inputStyle }}
        name="reports"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Qual é a frequência que esse problema acontece?"
        value={state.frequency}
        style={{ label: labelStyle, input: inputStyle }}
        name="frequency"
        onChange={(e) => updateState(e)}
        readOnly={locked}
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
