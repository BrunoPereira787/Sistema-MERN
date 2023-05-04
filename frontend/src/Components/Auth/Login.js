import React from "react";
import { UserContext } from "../../UserContext";
import UseForm from "../../Hooks/UseForm";
import Input from "../Forms/Input";
import styles from "./Login.module.css";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const email = UseForm("email");
  const password = UseForm();
  const { userLogin, loading, error } = React.useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.validate() && password.validate()) {
      userLogin({ email: email.value, password: password.value });
    }
  };

  return (
    <section className={`${styles.login} container`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <Input text="Email" name="email" type="email" {...email} />
        <Input text="Senha" name="password" type="password" {...password} />
        {loading ? (
          <Button disabled>Carregando</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        {error && <p className="error">{error}</p>}
        <p>
          não tem conta ainda ? <Link to="/register">Clique aqui</Link> e se
          cadastre
        </p>
      </form>
    </section>
  );
};

export default Login;
