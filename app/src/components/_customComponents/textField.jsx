import React from 'react';

import classes from './costomComponents.module.css';

const TextField = ({ onChange, label, style, ...props }) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <input
      {...props}
      className={classes.textFieldInput}
      style={style.input}
      onChange={(e) => onChange(e)}
    />
  </div>
);

TextField.defaultProps = {
  type: 'text',
  style: {},
};

export default TextField;
