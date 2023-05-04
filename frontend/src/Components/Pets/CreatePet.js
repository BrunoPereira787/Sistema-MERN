import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import PetForm from "../Forms/PetForm";
import { POST_PET } from "../../Api";

const CreatePet = () => {
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async (pet) => {
    const formData = new FormData();

    if (pet.images) {
      const images = Array.from(pet.images);
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    formData.append("name", pet.name || "");
    formData.append("weight", pet.weight || "");
    formData.append("age", pet.age || "");
    formData.append("description", pet.description || "");

    const token = window.localStorage.getItem("token");
    const { url, options } = POST_PET(token, formData);

    const { json } = await request(url, options);

    if (json) {
      navigate("/");
    }
  };

  return (
    <section className="container">
      <PetForm
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        btnText="Cadastrar"
      />
    </section>
  );
};

export default CreatePet;
