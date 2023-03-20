import React from "react";
import { UserContext } from "../UserContext";

const UseCep = () => {
  const { data } = React.useContext(UserContext);

  const [city, setCity] = React.useState(data ? data.city : "");
  const [state, setState] = React.useState(data ? data.state : "");
  const [district, setDistrict] = React.useState(data ? data.district : "");
  const [address, setAddress] = React.useState(data ? data.address : "");

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

  return {
    city,
    state,
    district,
    address,
    handleCEP,
  };
};

export default UseCep;
