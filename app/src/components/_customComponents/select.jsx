import React from 'react';

import classes from './costomComponents.module.css';

const TextField = ({
  type,
  value,
  onChange,
  label,
  name,
  horizontal,
  children,
}) => (
  <div className={classes.textField}>
    <p className={classes.label}>{label}</p>
    <select
      className={classes.textFieldInput}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    >
      <option defaultValue disabled></option>
      {children}
    </select>
  </div>
);

export default TextField;
