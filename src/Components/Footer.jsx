import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as GymGenius } from '../Assets/gg.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <GymGenius />
      <p>GymGenius. Some rights reserved.</p>
    </footer>
  );
};

export default Footer;
