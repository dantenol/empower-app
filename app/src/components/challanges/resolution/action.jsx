import React from 'react';
import classes from './resolution.module.css';

const Action = ({ title, children, back, next }) => {
  const Children = React.cloneElement(children, { next: next, back: back });

  return (
    <div className={classes.action} id="acao">
      <p className={classes.actoinTitle}>{title}</p>
      {Children}
    </div>
  );
};

export default Action;
