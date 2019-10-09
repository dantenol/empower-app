import React from 'react';

import logo from '../assets/images/ede_logo.png';

const styles = {
  container: {
    display: 'block',
    marginTop: 64,
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  img: {
    width: '70vw',
    maxWidth: 256,
  },
  text: {
    color: '#562598',
    textAlign: 'center'
  },
};

const Footer = () => {
  return (
    <footer style={styles.container}>
      <p style={styles.text}>Feito com amor e respeito por</p>
      <img src={logo} style={styles.img} alt="Embaixadores da Educação" />
    </footer>
  );
};

export default Footer;
