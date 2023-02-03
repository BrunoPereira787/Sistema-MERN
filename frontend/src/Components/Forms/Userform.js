import React from "react";
import Button from "./Button";
import Input from "./Input";

const Userform = ({ data, handleSubmit, error, loading, btnText }) => {
  const [user, setUser] = React.useState(data || {});

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
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
      />
      <Input
        name="city"
        text="Cidade"
        type="text"
        value={user.city || ""}
        readOnly
      />
      <Input
        name="state"
        text="UF"
        type="text"
        value={user.state || ""}
        readOnly
      />
      <Input
        name="district"
        text="Bairro"
        type="text"
        value={user.district || ""}
        readOnly
      />
      <Input
        name="address"
        text="Rua"
        type="text"
        value={user.address || ""}
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
