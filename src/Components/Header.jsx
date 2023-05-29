import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as GymGenius } from '../Assets/gg.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data } = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="GymGenius - Home">
          <GymGenius />
        </Link>
        {data ? (
          <Link className={styles.login} to="/account">
            {data.email}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login/Register
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
