import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import PetForm from "../Forms/PetForm";

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
    console.log(formData.get("name"));
    const token = window.localStorage.getItem("token");

    const { json } = await request("http://localhost:5000/pets/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });

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
