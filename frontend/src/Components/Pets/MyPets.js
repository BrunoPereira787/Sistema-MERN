import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";
import Loading from "../Helper/Loading";
import styles from "./MyPets.module.css";
import { CONCLUDES_ADOPTIONS, DELETE_PET, GET_MY_PETS } from "../../Api";

const MyPets = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    const { url, options } = GET_MY_PETS(token);

    const load = async () => {
      await request(url, options);
    };
    load();
  }, [request]);

  const removePet = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { url, options } = DELETE_PET(token, id);

      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  const concludesAdoptions = async (id) => {
    const confirm = window.confirm("Tem certeza que deseja concluir Adoção");
    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { url, options } = CONCLUDES_ADOPTIONS(token, id);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (!data) return <p>Não há pets Cadastrados</p>;
  if (data)
    return (
      <section className={`${styles.pet} container`}>
        {data &&
          data.pets.map((pet) => (
            <div key={pet._id}>
              <div className={styles.petContainer}>
                <div className={styles.petInfo}>
                  <img
                    src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                    alt=""
                  />
                  <p>
                    <span>{pet.name}</span>
                    <span>{pet.age} anos</span>
                    <span>{pet.weight} kg</span>
                  </p>
                </div>
                <div className={styles.actions}>
                  {pet.available ? (
                    <>
                      <button
                        onClick={() => concludesAdoptions(pet._id)}
                        className={styles.conclude_btn}
                      >
                        Concluir adoção
                      </button>
                      <button onClick={() => removePet(pet._id)}>
                        Excluir
                      </button>
                      <Link to={`/pet/${pet._id}`}>Editar</Link>
                    </>
                  ) : (
                    <>
                      <button onClick={() => removePet(pet._id)}>
                        Excluir
                      </button>
                      <p>Pet ja adotado</p>
                    </>
                  )}
                </div>
              </div>
              <div className={styles.line}></div>
            </div>
          ))}
        {data.pets.length === 0 && <p>Nõ há pets cadastrados</p>}
      </section>
    );
};

export default MyPets;
