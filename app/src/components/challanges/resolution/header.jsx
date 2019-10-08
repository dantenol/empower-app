import React from 'react';
import classes from './resolution.module.css'

import logo from  '../../../assets/images/empower_negative.png';

const Header = ({ profilePic }) => (
  <>
    <header className={classes.header}>
      <img src={logo} className={classes.logo} alt="Logo"/>
      <p className={classes.avatar}>pp</p>
    </header>
    <div className={classes.headerVoid} />
  </>
)

export default Header;
