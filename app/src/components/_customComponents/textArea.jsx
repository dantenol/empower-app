import React from 'react';

import classes from './costomComponents.module.css';

const TextArea = ({ onChange, label, style, ...props }) => (
  <div>
    <p className={classes.label} style={style.label}>
      {label}
    </p>
    <textarea
      {...props}
      className={classes.textFieldInput}
      style={style.input}
      onChange={(e) => onChange(e)}
    ></textarea>
  </div>
);

TextArea.defaultProps = {
  type: 'text',
  style: {},
};

export default TextArea;
