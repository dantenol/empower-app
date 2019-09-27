import React from 'react';

const TextField = ({ type }) => (
  <input type={type} />
);

TextField.defaultProps = {
  type: 'text',
}

export default TextField;
