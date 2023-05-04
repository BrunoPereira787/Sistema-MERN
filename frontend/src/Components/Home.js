import React from "react";
import UseFetch from "../Hooks/UseFetch";
import Loading from "./Helper/Loading";
import PetsHome from "./Pets/PetsHome";
import { GET_PETS } from "../Api";

const Home = () => {
  const { data, error, loading, request } = UseFetch();

  React.useEffect(() => {
    const { url, options } = GET_PETS();
    const load = async () => {
      await request(url, options);
    };
    load();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Não há pets Cadastrados</p>;
  if (data)
    return (
      <div className="container">
        <PetsHome pets={data.pets} />
      </div>
    );
};

export default Home;
