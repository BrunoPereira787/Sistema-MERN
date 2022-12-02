import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";
import PetForm from "../Forms/PetForm";

const PetEdit = () => {
  const { error, loading, request } = useFetch();
  const { id } = useParams();
  const [pet, setPet] = React.useState(null);
  const navigate = useNavigate();

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

  const handleSubmit = async (pet) => {
    const formData = new FormData();

    const images = Array.from(pet.images);
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", pet.name);
    formData.append("age", pet.age);
    formData.append("weight", pet.weight);
    formData.append("description", pet.description);

    const token = window.localStorage.getItem("token");

    const { json } = await request(
      `http://localhost:5000/pets/updatepet/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (json) {
      navigate("/mypets");
    }
  };

  if (pet)
    return (
      <section className="container">
        <PetForm
          handleSubmit={handleSubmit}
          loading={loading}
          petData={pet}
          error={error}
          btnText="Editar"
        />
      </section>
    );
};

export default PetEdit;
