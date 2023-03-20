import React from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Whats } from "../../assets/whats.svg";
import useFetch from "../../Hooks/UseFetch";
import Loading from "../Helper/Loading";
import styles from "./PetDetails.module.css";

const PetDetails = () => {
  const [pet, setPet] = React.useState(null);
  const { id } = useParams();
  const { request, error, loading } = useFetch();

  React.useEffect(() => {
    const loadApi = async () => {
      const token = window.localStorage.getItem("token");
      const { json } = await request(`http://localhost:5000/pets/pet/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPet(json.pet);
    };
    loadApi();
  }, [id, request]);

  if (loading) return <Loading />;

  if (pet) {
    const tel = pet.user.cell.replace(/[^0-9]*/g, "");

    return (
      <section className="container">
        <div className={styles.detailContainer}>
          <div className={styles.detailImg}>
            <img
              src={`http://localhost:5000/images/pets/${pet.images[0]}`}
              alt=""
            />
          </div>
          <div className={styles.detailInfo}>
            <h1>Informações do pet</h1>
            <ul>
              <li>{pet.name}</li>
              <li>{pet.age} anos</li>
              <li>{pet.weight} kg</li>
              <li>{pet.description}</li>
            </ul>
            <h1>Informações do responsavel</h1>
            <ul>
              <li>{pet.user.name}</li>
              <li>
                {pet.user.state} - {pet.user.city}
              </li>
              <li>{pet.user.district}</li>
              <li>{pet.user.phone}</li>
              <li>{pet.user.cell}</li>
            </ul>
          </div>
          <a
            target={"_blank"}
            rel="noreferrer"
            href={`http://api.whatsapp.com/send?1=pt_BR&phone=55${tel}`}
          >
            <Whats />
          </a>{" "}
          {error && <p className="error">{error}</p>}
        </div>
      </section>
    );
  }
};

/* <p>

          <p>Falar com {pet.user.name}</p>
        </p> */

export default PetDetails;
