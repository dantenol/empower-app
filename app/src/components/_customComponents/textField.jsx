import React from 'react';

import classes from './costomComponents.module.css'

const TextField = ({ type, value, onChange, label, name, horizontal }) => (
  <div className={classes.textField}>
    <p className={classes.label}>
      {label}
    </p>
    <input
      className={classes.textFieldInput}
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    />
  </div>
);

TextField.defaultProps = {
  type: 'text',
}

export default TextField;
