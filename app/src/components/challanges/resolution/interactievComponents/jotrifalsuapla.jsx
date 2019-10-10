import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import TextField from '../../../_customComponents/textField';
import TextArea from '../../../_customComponents/textArea';
import { url } from '../../../../connector';

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
  const [locked, setLocked] = useState(false);
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

  useEffect(() => {
    Axios(`${url}users/${localStorage.userId}/challenges`, {
      params: { access_token: localStorage.access_token },
    }).then((res) => {
      if (res.data.jotrifalsuapla) {
        setState(res.data.jotrifalsuapla);
        setLocked(true);
        next(3);
      }
    });
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
        if (state[key].length < 4) {
          return alert(
            'Você deve preencher todos os campos para espeficicar o problema!',
          );
        }
      }
    }
    try {
      const res = await Axios.put(
        `${url}users/${localStorage.userId}/challenges`,
        { jotrifalsuapla: state },
        {
          params: { access_token: localStorage.access_token },
        },
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
        label="Nome do projeto"
        value={state.name}
        style={{ label: labelStyle, input: inputStyle }}
        name="name"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Descreva o que será feito para resolver esse problema"
        value={state.resolution}
        style={{ label: labelStyle, input: inputStyle }}
        name="resolution"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Para quem é essa solução?"
        value={state.target}
        style={{ label: labelStyle, input: inputStyle }}
        name="target"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Como você irá entregar essa solução?"
        value={state.deliver}
        style={{ label: labelStyle, input: inputStyle }}
        name="deliver"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Qual é o passo a passo para chegar nessa solução?"
        value={state.steps}
        style={{ label: labelStyle, input: inputStyle }}
        name="steps"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Quais recursos serão necessários para tirar a ideia do papel?"
        value={state.resources}
        style={{ label: labelStyle, input: inputStyle }}
        name="resources"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Quem irá promover os recursos?"
        value={state.sponsor}
        style={{ label: labelStyle, input: inputStyle }}
        name="sponsor"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="Quem são as pessoas que vão ajudar a executar o projeto?"
        value={state.team}
        style={{ label: labelStyle, input: inputStyle }}
        name="team"
        onChange={(e) => updateState(e)}
        readOnly={locked}
      />

      <TextArea
        rows={3}
        label="O que você espera de resultado?"
        value={state.expectations}
        style={{ label: labelStyle, input: inputStyle }}
        name="expectations"
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

export default JOTRIFALSUAPLA;
