import React from "react";
import useFetch from "../../Hooks/UseFetch";
import useForm from "../../Hooks/UseForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./Register.module.css";

const Register = () => {
  const { request, loading, error } = useFetch();
  const { userLogin } = React.useContext(UserContext);

  const name = useForm();
  const email = useForm("email");
  const password = useForm();
  const confirmpassword = useForm();
  const phone = useForm("phone");
  const cell = useForm("phone");
  const cep = useForm();

  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [address, setAddress] = React.useState("");

  const user = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirmpassword: confirmpassword.value,
    phone: phone.value,
    cell: cell.value,
    cep: cep.value,
    city,
    state,
    district,
    address,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { response } = await request("http://localhost:5000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok)
      userLogin({ email: email.value, password: password.value });
  };

  const handleCEP = async (e) => {
    if (!e.target.value) {
      setCity("");
      setState("");
      setDistrict("");
      setAddress("");
    }
    const cep = e.target.value.replace(/\D/g, "");
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    if (data.erro) {
      return null;
    }
    setCity(data.localidade);
    setState(data.uf);
    setDistrict(data.bairro);
    setAddress(data.logradouro);
  };

  return (
    <section className={`${styles.register} container`}>
      <h1>Registrar-se</h1>
      <div className={styles.registerContainer}>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.registerPessoais}>
            <h2>Dados pessoais</h2>
            <Input name="name" text="Nome" type="text" {...name} />
            <Input name="email" text="Email" type="email" {...email} />
            <Input name="password" text="Senha" type="password" {...password} />
            <Input
              name="confirmpassword"
              text="Confirme sua senha"
              type="password"
              {...confirmpassword}
            />
            <div className={styles.registerphones}>
              <Input name="phone" text="Telefone" type="number" {...phone} />
              <Input name="cell" text="Celular" type="number" {...cell} />
            </div>
          </div>
          <div className={styles.registerResidenciais}>
            <h2>Dados residenciais</h2>
            <Input
              name="cep"
              text="CEP"
              type="number"
              value={cep.value}
              onChange={cep.onChange}
              error={cep.error}
              onBlur={handleCEP}
            />
            <Input
              name="city"
              text="Cidade"
              type="text"
              value={city}
              readOnly
            />
            <Input name="state" text="UF" type="text" value={state} readOnly />
            <Input
              name="district"
              text="Bairro"
              type="text"
              value={district}
              readOnly
            />
            <Input
              name="address"
              text="Rua"
              type="text"
              value={address}
              readOnly
            />
          </div>
          <div>
            {loading ? (
              <Button disabled>Carregando</Button>
            ) : (
              <Button>Registrar</Button>
            )}
            {error && <p className="error">{error}</p>}
            <p>Ja tem conta ? Clique aqui e faça login</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
