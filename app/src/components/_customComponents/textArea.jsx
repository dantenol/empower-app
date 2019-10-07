import React from 'react';

import classes from './costomComponents.module.css';

const TextArea = ({ type, value, onChange, label, name, rows, style }) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <textarea
      rows={rows}
      className={classes.textFieldInput}
      type={type}
      style={style.input}
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
    ></textarea>
  </div>
);

TextArea.defaultProps = {
  type: 'text',
  style: {},
};

export default TextArea;
