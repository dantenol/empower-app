import React from 'react';
import classes from './resolution.module.css'

import logo from  '../../../assets/images/empower_negative.png';

const Header = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
  <>
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="Logo"/>
      <a className={classes.logout} onClick={logout}>SAIR</a>
    </header>
    <div className={classes.headerVoid} />
  </>
)}

export default Header;
