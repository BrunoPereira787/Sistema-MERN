import React from "react";
import UseCep from "../../Hooks/UseCep";
import Button from "./Button";
import Input from "./Input";

const Userform = ({ data, handleSubmit, error, loading, btnText }) => {
  const [user, setUser] = React.useState(data || {});

  const { handleCEP, address, city, district, state } = UseCep();

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    user.address = address;
    user.city = city;
    user.district = district;
    user.state = state;
    handleSubmit(user);
  };

  return (
    <form onSubmit={submit}>
      <Input
        name="name"
        text="Nome"
        type="text"
        onChange={onChange}
        value={user.name || ""}
      />
      <Input
        name="email"
        text="Email"
        type="email"
        onChange={onChange}
        value={user.email || ""}
      />
      <Input
        name="phone"
        text="Telefone"
        type="text"
        onChange={onChange}
        value={user.phone || ""}
      />
      <Input
        name="cell"
        text="Celular"
        type="text"
        onChange={onChange}
        value={user.cell || ""}
      />

      <Input
        name="cep"
        text="CEP"
        type="number"
        onChange={onChange}
        value={user.cep || ""}
        onBlur={(e) => handleCEP(e)}
      />
      <Input
        name="city"
        text="Cidade"
        type="text"
        value={city || ""}
        readOnly
      />
      <Input name="state" text="UF" type="text" value={state || ""} readOnly />
      <Input
        name="district"
        text="Bairro"
        type="text"
        value={district || ""}
        readOnly
      />
      <Input
        name="address"
        text="Rua"
        type="text"
        value={address || ""}
        readOnly
      />
      {loading ? (
        <Button disabled>Enviando</Button>
      ) : (
        <Button>{btnText}</Button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Userform;
