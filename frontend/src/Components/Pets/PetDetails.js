import React from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as Whats } from "../../assets/whats.svg";
import useFetch from "../../Hooks/UseFetch";
import Loading from "../Helper/Loading";
import styles from "./PetDetails.module.css";
import { GET_PET_DETAILS } from "../../Api";

const PetDetails = () => {
  const { id } = useParams();
  const { request, error, loading, data } = useFetch();

  React.useEffect(() => {
    const load = async () => {
      const { url, options } = GET_PET_DETAILS(id);
      await request(url, options);
    };
    load();
  }, [id, request]);

  if (loading) return <Loading />;
  if (data) {
    const tel = data.pet.user.cell.replace(/[^0-9]*/g, "");

    return (
      <section className="container">
        <div className={styles.detailContainer}>
          <div className={styles.detailImg}>
            <img
              src={`http://localhost:5000/images/pets/${data.pet.images[0]}`}
              alt=""
            />
          </div>
          <div className={styles.detailInfo}>
            <h1>Informações do pet</h1>
            <ul>
              <li>{data.pet.name}</li>
              <li>{data.pet.age} anos</li>
              <li>{data.pet.weight} kg</li>
              <li>{data.pet.description}</li>
            </ul>
            <h1>Informações do responsavel</h1>
            <ul>
              <li>{data.pet.user.name}</li>
              <li>
                {data.pet.user.state} - {data.pet.user.city}
              </li>
              <li>{data.pet.user.district}</li>
              <li>{data.pet.user.phone}</li>
              <li>{data.pet.user.cell}</li>
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

export default PetDetails;
