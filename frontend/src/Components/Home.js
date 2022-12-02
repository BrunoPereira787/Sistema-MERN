import React from "react";
import useAxios from "../Hooks/useAxios";
import Loading from "./Helper/Loading";
import PetsHome from "./Pets/PetsHome";

const Home = () => {
  const { data, error, loading, axiosGet } = useAxios();

  React.useEffect(() => {
    const load = async () => {
      await axiosGet("pets/");
    };
    load();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (data)
    return (
      <div className="container">
        <PetsHome pets={data.pets} />
      </div>
    );
};

export default Home;
