import React, { useState } from 'react';

import TextArea from '../../../_customComponents/textArea';
import TextField from '../../../_customComponents/textField';
import classes from '../resolution.module.css';

import file from '../../../../assets/images/file.svg';

const inputStyle = {
  width: '100%',
};

const Submission = ({ back, next }) => {
  const [state, setState] = useState({
    url: '',
    description: '',
    files: [],
  });

  const updateState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    console.log(e.target.files);
    const fs = state.files;
    fs.push(e.target.files[0]);
    updateState({
      target: {
        name: 'files',
        value: fs,
      },
    });
  };

  const deleteFile = (i) => {
    const fs = state.files;
    fs.splice(i, 1);
    updateState({
      target: {
        name: 'files',
        value: fs,
      },
    });
  };

  const save = () => {
    if (state.url.length < 4 && !state.files.length) {
      return alert('Você precisa enviar um vídeo!');
    } else if (state.description.length < 5) {
      return alert('Você deve escrever sua experiência!');
    }

    alert('Salvo com sucesso!');
    next();
  };

  return (
    <div style={{ display: 'contents' }}>
      <input
        onChange={(e) => handleUpload(e)}
        type="file"
        hidden
        id="file"
        multiple
      />
      <label htmlFor="file" className={classes.upload}>
        UPLOAD DE ARQUIVO
      </label>
      {state.files.map((f, i) => (
        <div key={f.name} className={classes.files}>
          <img src={file} alt="file" />
          <p>{f.name}</p>
          <button onClick={() => deleteFile(i)}>&times;</button>
        </div>
      ))}
      <br />
      <TextField
        name="url"
        label="link do vídeo"
        value={state.url}
        onChange={(e) => updateState(e)}
        style={{ input: inputStyle }}
      />
      <TextArea
        rows={5}
        name="description"
        label="descreva sua jornada como empower"
        value={state.description}
        onChange={(e) => updateState(e)}
        style={{ input: inputStyle }}
      />
      <div>
        <button
          className={classes.next}
          onClick={save}
        >
          enviar &gt;
        </button>
        <button className={classes.back} onClick={back}>
          &lt; VOLTAR
        </button>
      </div>
    </div>
  );
};

export default Submission;
