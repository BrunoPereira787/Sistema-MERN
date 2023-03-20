import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UseMedia from "../../Hooks/UseMedia";
import styles from "../Header.module.css";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const { pathname } = useLocation();

  const mobile = UseMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  React.useEffect(() => {
    switch (pathname) {
      case "/createpet":
        setTitle("CADASTRAR PET");
        setSubtitle("Cadastre aqui o seu pet para adoção");
        break;
      case "/mypets":
        setTitle("MEUS PETS");
        setSubtitle("Veja aqui seus pets cadastrados");
        break;
      case "/perfil":
        setTitle("MEU PERFIL");
        setSubtitle("Veja aqui seus dados pessoais ");
        break;
      case "/":
        setTitle("ADOTE UM PET");
        setSubtitle("veja mais detalhes do pet e maque uma visita ");
        break;
      default:
        setTitle("DETALHES DO PET");
        setSubtitle("Veja aqui os detalhes do pet ");
    }
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      <header className={styles.userHeader}>
        <div className={`${styles.userHeaderContainer} container`}>
          <div className={styles.info}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {mobile && (
            <button
              className={`${styles.mobileButton} ${
                mobileMenu && styles.mobileButtonActive
              }`}
              onClick={() => setMobileMenu(!mobileMenu)}
            ></button>
          )}
          <nav
            className={`${mobile ? styles.navMobile : styles.headerNav} ${
              mobileMenu && styles.navMobileActive
            }`}
          >
            <ul>
              <li>
                <Link to="/createpet">Cadastrar Pet</Link>
              </li>
              <li>
                <Link to="/mypets">Ver meus pets</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default UserHeader;
