import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { url } from '../../../../connector';

import TextField from '../../../_customComponents/textField';
import Select from '../../../_customComponents/select';

import classes from '../resolution.module.css';
import trash from '../../../../assets/images/garbage.svg';
import Axios from 'axios';

const phoneNumber = /^\(([0-9]{2})\)\s?[0-9]{5}[-\s]?[0-9]{4}$/i;

const challengesList = [
  'Academia de Pilotos LATAM',
  ' Bolsa Faculdade Arnaldo',
  'Mentoria Sympla'  ,
  'Intercâmbio para os Estados Unidos',
  "Curso de inglês Must Language Center",
  "Inovalab Student Conference",
  "Aceleração de negócio – Friends Labs"
];

const Team = ({ next, history }) => {
  const [locked, setLocked] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    phone: '',
    email: '',
    grade: '',
    shift: '',
    challenges: [],
    show: false,
  });

  useEffect(() => {
    Axios(`${url}users/${localStorage.userId}/challenges`, {
      params: { access_token: localStorage.access_token },
    })
      .then((res) => {
        if (res.data.team.length) {
          setStudents(res.data.team);
        }
        if (res.data.team.length > 1) {
          setLocked(true);
          next(1);
        }
      })
      .catch((err) => {
        alert('Oops, algo deu errado!');
        localStorage.clear();
        history.push('login');
      });
  }, []);

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
        console.log(p);
        return alert(
          'Oops, parece que você esqueceu de preencher alguma coisa',
        );
      }
    }

    setStudents([...students, newS]);
    setNewStudent({
      name: '',
      phone: '',
      grade: '',
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
    try {
      const changes = await Axios.put(
        `${url}users/${localStorage.userId}/challenges`,
        {
          team: students,
        },
        {
          params: { access_token: localStorage.access_token },
        },
      );
      setLocked(true);
      console.log(changes);
      next();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.container}>
      <p>A equipe deve ter no mínimo duas pessoas</p>
      {students.map((s, i) => {
        const n = students.length;
        return (
          <div key={s.phone} className={classes.wrap_collabsible}>
            <input id={s.phone} className={classes.toggle} type="checkbox" />
            <label htmlFor={s.phone} className={classes.lbl_toggle}>
              {s.name}
            </label>
            <div className={classes.collapsible_content}>
              <div className={classes.content_inner}>
                <p>
                  <b>Telefone:&nbsp;</b>
                  {s.phone}
                </p>
                <p>
                  <b>Turma:&nbsp;</b>
                  {s.grade}
                </p>
                <p>
                  <b>Turno:&nbsp;</b>
                  {s.shift}
                </p>
                <p>
                  <b>Desafios:&nbsp;</b>
                  {s.challenges.join(', ')}
                </p>
                {!locked && i !== 0 && (
                  <button onClick={() => deleteStudent(n)}>
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
            label="Nome e sobrenome"
          />
          <NumberFormat
            value={newStudent.phone}
            name="phone"
            onChange={(e) => newStudentChange(e)}
            label="celular"
            format="(##) #####-####"
            customInput={TextField}
            type="tel"
          />
          <TextField
            value={newStudent.grade}
            name="grade"
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
            <span>
              Só poderão concorrer aos desafios os alunos que estiveram
              presentes no evento. Porém isso não impede que o mesmo participe
              da equipe. <br /> Você pode participar de mais de um desafio.
            </span>
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
          <button onClick={addStudent}>salvar</button>
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
