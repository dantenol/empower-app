import React from 'react';

import classes from './costomComponents.module.css';

const TextField = ({ type, value, onChange, label, name, style, autocomplete }) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <input
      className={classes.textFieldInput}
      style={style.input}
      type={type}
      autoComplete={autocomplete}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    />
  </div>
);

TextField.defaultProps = {
  type: 'text',
  style: {},
};

export default TextField;
