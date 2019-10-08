import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

import TextField from '../../../_customComponents/textField';
import Select from '../../../_customComponents/select';

import classes from '../resolution.module.css';
import trash from '../../../../assets/images/garbage.svg';

const phoneNumber = /^\(([0-9]{2})\)\s?[4-9]{1}[0-9]{4}[-\s]?[0-9]{4}$/i;

const Team = ({ next }) => {
  const [locked, setLocked] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    class: '',
    shift: '',
    challenges: [],
    show: false,
  });
  const [challenges] = useState([
    'Vale do silício',
    'Bolsa NEJ',
    'Bolsa Arnaldo',
  ]);

  const newStudentChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAddStudent = () => {
    setNewStudent({
      ...newStudent,
      show: !newStudent.show,
    });
  };

  const addStudent = () => {
    const newS = { ...newStudent };
    delete newS.show;

    if (!newS.phone.match(phoneNumber)) {
      return alert('Oops, parece que você preencheu o celular inválido');
    }
    for (const p in newS) {
      if (!newS[p].length) {
        return alert(
          'Oops, parece que você esqueceu de preencher alguma coisa',
        );
      }
    }

    setStudents([...students, newS]);
    setNewStudent({
      name: '',
      lastName: '',
      phone: '',
      class: '',
      shift: '',
      challenges: [],
      show: false,
    });
  };

  const deleteStudent = (i) => {
    const sure = window.confirm(
      'Você realmente quer tirar essa pessoa da equipe?',
    );
    if (sure) {
      const sts = students;
      sts.splice(i, 1);
      console.log(sts);
      setStudents([...sts]);
    }
  };

  const selectChallenge = (c) => {
    const newS = { ...newStudent };
    if (newS.challenges.includes(c)) {
    } else {
      newS.challenges.push(c);
    }
    setNewStudent(newS);
  };

  const save = async () => {
    next();
  };

  return (
    <div className={classes.containter}>
      {students.map((s, i) => {
        return (
          <div key={s.phone} className={classes.wrap_collabsible}>
            <input id={s.phone} className={classes.toggle} type="checkbox" />
            <label
              htmlFor={s.phone}
              className={classes.lbl_toggle}
            >{`${s.name} ${s.lastName}`}</label>
            <div className={classes.collapsible_content}>
              <div className={classes.content_inner}>
                <p>
                  <b>Telefone:&nbsp;</b>
                  {s.phone}
                </p>
                <p>
                  <b>Turma:&nbsp;</b>
                  {s.class}
                </p>
                <p>
                  <b>Turno:&nbsp;</b>
                  {s.shift}
                </p>
                <p>
                  <b>desafios:&nbsp;</b>
                  {s.challenges.join(', ')}
                </p>
                {!locked && (
                  <button onClick={() => deleteStudent(i)}>
                    <img src={trash} alt="delete" />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {!locked && newStudent.show ? (
        <div>
          <hr />
          <TextField
            value={newStudent.name}
            name="name"
            onChange={(e) => newStudentChange(e)}
            label="Nome"
          />
          <TextField
            value={newStudent.lastName}
            name="lastName"
            onChange={(e) => newStudentChange(e)}
            label="sobrenome"
          />
          <NumberFormat
            value={newStudent.phone}
            name="phone"
            onChange={(e) => newStudentChange(e)}
            label="celular"
            format="(##) #####-####"
            customInput={TextField}
          />
          <TextField
            value={newStudent.class}
            name="class"
            onChange={(e) => newStudentChange(e)}
            label="turma/sala"
          />
          <TextField
            value={newStudent.email}
            name="email"
            type="email"
            onChange={(e) => newStudentChange(e)}
            label="email"
          />
          <Select
            value={newStudent.shift}
            name="shift"
            onChange={(e) => newStudentChange(e)}
            label="Turno"
          >
            <option value="Manhã">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
            <option value="integral">Integral</option>
          </Select>
          <div className={classes.challenge}>
            <p>desafios</p>
            <div>
              {challenges.map((c, i) => (
                <React.Fragment key={c}>
                  <input
                    id={`chal${i}`}
                    hidden
                    className={classes.toggle}
                    type="checkbox"
                    onChange={() => selectChallenge(c)}
                  />
                  <label
                    htmlFor={`chal${i}`}
                    className={classes.challengeClick}
                  >
                    {c}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <button onClick={addStudent}>
            salvar
          </button>
        </div>
      ) : (
        <button
          className={classes.newStudentButton}
          onClick={toggleAddStudent}
          hidden={students.length >= 4 || locked}
        >
          + Adicionar integrante
        </button>
      )}
      <div>
        <button
          disabled={students.length < 2}
          className={classes.next}
          onClick={save}
        >
          avançar &gt;
        </button>
      </div>
    </div>
  );
};

export default Team;
