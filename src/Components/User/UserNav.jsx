import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as Logout } from "../../Assets/logout.svg";
import { ReactComponent as Exercises } from "../../Assets/exercises.svg";
import { ReactComponent as Workouts } from "../../Assets/workouts.svg";
import { ReactComponent as Statistics } from "../../Assets/statistics.svg";
import { ReactComponent as User } from "../../Assets/user.svg";
import styles from "./UserNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserNav = () => {
  const { userLogout, data } = React.useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  React.useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  // Função para fechar o menu quando clicar fora dele
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileMenu &&
        !event.target.closest(`.${styles.navMobile}`) &&
        !event.target.closest(`.${styles.mobileBtn}`)
      ) {
        setMobileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenu]);

  if (mobile) {
    return (
      <>
        <button
          aria-label="Menu"
          title="Menu"
          className={`${styles.mobileBtn} ${
            mobileMenu && styles.mobileBtnActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <div className={styles.mobileBtnIconContainer}>
            <span className={styles.mobileBtnIcon}></span>
          </div>
        </button>

        {mobileMenu && (
          <button
            className={styles.mobileMenuOverlay}
            onClick={() => setMobileMenu(false)}
            aria-label="Fechar menu"
          ></button>
        )}

        <nav
          className={`${styles.navMobile} ${
            mobileMenu && styles.navMobileActive
          }`}
        >
          {data && (
            <div className={styles.userEmailContainer}>
              <User />
              <span className={styles.userEmail}>{data.email}</span>
            </div>
          )}
          <NavLink
            to="/workouts"
            end
            className={styles.navItem}
            onClick={() => setMobileMenu(false)}
          >
            <Workouts />
            <span>Treinos</span>
          </NavLink>
          <NavLink
            to="/exercises"
            className={styles.navItem}
            onClick={() => setMobileMenu(false)}
          >
            <Exercises />
            <span>Exercícios</span>
          </NavLink>
          <NavLink
            to="/statistics"
            className={styles.navItem}
            onClick={() => setMobileMenu(false)}
          >
            <Statistics />
            <span>Estatísticas</span>
          </NavLink>
          <NavLink
            to="/profile"
            className={styles.navItem}
            onClick={() => setMobileMenu(false)}
          >
            <User />
            <span>Perfil</span>
          </NavLink>
          <button onClick={handleLogout} className={styles.navItem}>
            <Logout />
            <span>Sair</span>
          </button>
        </nav>

        <div className={styles.bottomNav}>
          <NavLink to="/workouts" end className={styles.bottomNavItem}>
            <Workouts />
            <span>Treinos</span>
          </NavLink>
          <NavLink to="/exercises" className={styles.bottomNavItem}>
            <Exercises />
            <span>Exercícios</span>
          </NavLink>
          <NavLink to="/statistics" className={styles.bottomNavItem}>
            <Statistics />
            <span>Estatísticas</span>
          </NavLink>
          <NavLink to="/profile" className={styles.bottomNavItem}>
            <User />
            <span>Perfil</span>
          </NavLink>
        </div>
      </>
    );
  }

  return (
    <nav className={styles.nav}>
      <NavLink to="/workouts" end title="Treinos" className={styles.navLink}>
        <Workouts className={styles.navIcon} />
      </NavLink>
      <NavLink to="/exercises" title="Exercícios" className={styles.navLink}>
        <Exercises className={styles.navIcon} />
      </NavLink>
      <NavLink to="/statistics" title="Estatísticas" className={styles.navLink}>
        <Statistics className={styles.navIcon} />
      </NavLink>
      <NavLink to="/profile" title="Perfil" className={styles.navLink}>
        <User className={styles.navIcon} />
      </NavLink>
      <button onClick={handleLogout} title="Sair">
        <Logout className={styles.navIcon} />
      </button>
    </nav>
  );
};

export default UserNav;
