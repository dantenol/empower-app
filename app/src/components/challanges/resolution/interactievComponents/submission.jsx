import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import TextArea from '../../../_customComponents/textArea';
import TextField from '../../../_customComponents/textField';
import classes from '../resolution.module.css';
import { url } from '../../../../connector';

import file from '../../../../assets/images/file.svg';

const params = { access_token: localStorage.access_token };

const inputStyle = {
  width: '100%',
};

const Submission = ({ back, next }) => {
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    Axios(`${url}users/${localStorage.userId}/challenges`, { params }).then(
      (res) => {
        if (res.data.submission) {
          setVideoUrl(res.data.submission.videoUrl);
          setDescription(res.data.submission.description);
          setLocked(true);
          next(4);
        }
      },
    );
  }, []);

  const handleProgress = (file, progress, cancel) => {
    const fs = files;
    const idx = fs.findIndex((a) => a.file.name === file.name);

    fs[idx] = {
      file,
      progress,
      cancel,
    };
    console.log(fs);
    setFiles(fs);
  };

  const handleUpload = async (e) => {
    const CancelToken = Axios.CancelToken;
    e.persist();
    const fs = [...files];
    let cancel;
    fs.push({
      file: e.target.files[0],
      progress: 0,
    });
    setFiles(fs);
    const data = new FormData();
    data.append('file', e.target.files[0]);

    console.log(e.target.files);
    const config = {
      cancelToken: new CancelToken(function executor(c) {
        cancel = c;
      }),
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 95) / progressEvent.total,
        );
        handleProgress(e.target.files[0], percentCompleted, cancel);
      },
      params,
    };

    try {
      const upload = await Axios.post(`${url}users/uploadFile`, data, config);
      handleProgress(e.target.files[0], 100);
      console.log(upload);
      setFileUrls([...fileUrls, upload.Key]);
    } catch (error) {
      deleteFile(e.target.files[0].name);
    }
    e.target.value = null;
  };

  const deleteFile = (n) => {
    const fs = files;
    const idx = fs.findIndex((a) => n === a.file.name);
    if (idx >= 0 && fs[idx].cancel) {
      fs[idx].cancel();
    }
    fs.splice(idx, 1);

    setFiles(fs);
  };

  const save = async () => {
    if (videoUrl.length < 4 && !files.length) {
      return alert('Você precisa enviar um vídeo!');
    } else if (description.length < 5) {
      return alert('Você deve escrever sua experiência!');
    }
    const st = {
      videoUrl,
      description,
      fileUrls,
    };

    try {
      const res = await Axios.put(
        `${url}users/${localStorage.userId}/challenges`,
        { submission: st },
        { params },
      );
      console.log(res);
      setLocked(true);
      alert('Salvo com sucesso!');
      next();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'contents' }}>
      {/* <input
        onChange={(e) => handleUpload(e)}
        type="file"
        hidden
        id="file"
        multiple
        disabled={locked}
      />
      <label htmlFor="file" className={classes.upload}>
        UPLOAD DE ARQUIVO
      </label>
      {files.map((f, i) => {
        console.log(f);
        return (
          <div key={f.file.name} className={classes.files}>
            <img src={file} alt="file" />
            <div className={classes.fileUpload}>
              <p>{f.file.name}</p>
              {f.progress < 100 && (
                <div className={classes.path}>
                  <div
                    className={classes.progress}
                    style={{ width: `${f.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
            <button onClick={() => deleteFile(f.file.name)}>&times;</button>
          </div>
        );
      })} */}
      <br />
      <TextField
        name="url"
        label="link do vídeo"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ input: inputStyle }}
        readOnly={locked}
      />
      <TextArea
        rows={5}
        name="description"
        label="descreva sua jornada como empower"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ input: inputStyle }}
        readOnly={locked}
      />
      <div>
        <button className={classes.next} onClick={save}>
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
