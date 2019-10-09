import React from 'react';

import classes from './costomComponents.module.css';

const Select = ({
  type,
  value,
  onChange,
  label,
  name,
  horizontal,
  children,
  style,
}) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <select
      className={classes.textFieldInput}
      name={name}
      style={style.input}
      value={value}
      onChange={(e) => onChange(e)}
    >
      <option defaultValue disabled></option>
      {children}
    </select>
  </div>
);

export default Select;
