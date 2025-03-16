import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as GymGenius } from "../Assets/gg.svg";
import { UserContext } from "../UserContext";
import useMedia from "../Hooks/useMedia";

const Header = () => {
  const { data } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");

  // Função para truncar o email em dispositivos móveis
  const formatEmail = (email) => {
    if (!email) return "";

    if (mobile) {
      const [username, domain] = email.split("@");
      if (username.length > 8) {
        return `${username.substring(0, 8)}...@${domain}`;
      }
    }

    return email;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.logo} to="/" aria-label="GymGenius - Home">
          <GymGenius />
        </Link>
        {data ? (
          <Link
            className={`${styles.login} ${mobile ? styles.hideMobile : ""}`}
            to="/profile"
            title={data.email}
          >
            <span className={styles.emailText}>{formatEmail(data.email)}</span>
          </Link>
        ) : (
          <Link
            className={`${styles.login} ${mobile ? styles.hideMobile : ""}`}
            to="/login"
          >
            <span className={styles.emailText}>Login/Register</span>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
