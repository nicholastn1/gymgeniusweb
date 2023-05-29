import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as Logout } from '../../Assets/logout.svg';
import { ReactComponent as Exercises } from '../../Assets/exercises.svg';
import { ReactComponent as Workouts } from '../../Assets/workouts.svg';
import { ReactComponent as Statistics } from '../../Assets/statistics.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  return (
    <>
      {mobile && (
        <button
          aria-label="menu"
          className={`${styles.mobileBtn} ${
            mobileMenu && styles.mobileBtnActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end>
          <Workouts />
          {mobile && 'Workouts'}
        </NavLink>
        <NavLink to="exercises">
          <Exercises />
          {mobile && 'Exercises'}
        </NavLink>
        <NavLink to="statistics">
          <Statistics />
          {mobile && 'Statistics'}
        </NavLink>
        <button onClick={handleLogout}>
          <Logout />
          {mobile && 'Logout'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
