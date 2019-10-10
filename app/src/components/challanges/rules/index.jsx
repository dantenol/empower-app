import React from 'react';
import { Link } from 'react-router-dom';

import Footer from '../../footer';

import classes from './rules.module.css';
import logo from '../../../assets/images/empower.png';

const Rules = () => (
  <div className={classes.container}>
    <img className={classes.logo} src={logo} alt="empower" />
    <h3>REGRAS DOS DESAFIOS</h3>
    <p>Você deverá percorrer todas as etapas do desafio. O preenchimento correto das informações é classificatório para vencer os prêmios.</p>
    <p>Só poderão concorrer aos prêmios pessoas que estiveram presentes no evento Crie o Impossível. Porém isso não impede a participação de mais colegas na execução.</p>
    <p>Cada desafio será avaliado por uma banca de realizadores e apoiadores do Embaixadores da Educação. Após a entrega dos desafios online, poderão existir desafios presenciais, como entrevistas e provas.</p>
    <p>Fique atento ao prazo final para o envio dos desafios.</p>
    <p>Após o vencimento dos dessfios os projetos e alunos ganhadores serão submetidos a uma auditoria para verififar a existência e qualidade dos projetos criados.</p>
    <p>Só poderão compor o time de execução alunos matriculados em escolas públicas de ensino médio.</p>

    <a href="https://google.com">Ver regulamento completo</a>
    <Link to="resolucao" className={classes.button}>Entendi</Link>
    <Footer />
  </div>
);

export default Rules;
