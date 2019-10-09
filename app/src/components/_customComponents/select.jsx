import React from 'react';

import classes from './costomComponents.module.css';

const Select = ({ onChange, label, children, style, ...props }) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <select
      {...props}
      className={classes.textFieldInput}
      style={style.input}
      onChange={(e) => onChange(e)}
    >
      <option defaultValue disabled></option>
      {children}
    </select>
  </div>
);

Select.defaultProps = {
  style: {},
};

export default Select;
