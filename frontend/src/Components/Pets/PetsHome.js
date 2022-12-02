import React from "react";
import { Link } from "react-router-dom";
import styles from "./PetsHome.module.css";

const PetsHome = ({ pets }) => {
  return (
    <div className={styles.petContainer}>
      {pets.length > 0 &&
        pets.map((pet) => (
          <div className={styles.petCard} key={pet._id}>
            <div
              style={{
                backgroundImage: `url(http://localhost:5000/images/pets/${pet.images[0]})`,
              }}
              className={styles.petImage}
            ></div>
            <div className={styles.petInfo}>
              <p>
                Nome: <span>{pet.name}</span>
              </p>
              <p>
                Idade: <span>{pet.age} anos</span>
              </p>
              <p>
                De: <span>{pet.user.state}</span>
              </p>
            </div>
            <div className={styles.petAdopter}>
              {pet.available ? (
                <Link to={`/petdetails/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p>Adotado!</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PetsHome;
