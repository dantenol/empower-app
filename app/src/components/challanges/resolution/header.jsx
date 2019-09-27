import React from 'react';
import classes from './resolution.module.css'

const Header = ({ profilePic }) => (
  <>
    <header className={classes.header}>
      <span>
        EMPOWER
      </span>
      <p className={classes.avatar}>pp</p>
    </header>
    <div className={classes.headerVoid} />
  </>
)

export default Header;
