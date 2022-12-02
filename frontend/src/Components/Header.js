import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { UserContext } from "../UserContext";
import styles from "./Header.module.css";
import UserHeader from "./User/UserHeader";

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.headerContainer} container`}>
          <div className={styles.headerLogo}>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <nav className={styles.headerNav}>
            <ul>
              {data ? (
                <>
                  <li>
                    <Link to="/perfil">{data.name}</Link>
                  </li>
                  <li>
                    <Link onClick={userLogout} to="/login">
                      Sair
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Registrar</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      {data && <UserHeader />}
    </>
  );
};

export default Header;
