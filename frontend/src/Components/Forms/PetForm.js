import React from "react";
import Input from "./Input";
import styles from "./Form.module.css";
import Button from "./Button";

const PetForm = ({ handleSubmit, loading, petData, error, btnText }) => {
  const [pet, setPet] = React.useState(petData || {});
  const [preview, setPreview] = React.useState(null);

  const handleImgChange = (e) => {
    setPet({ ...pet, [e.target.id]: e.target.files });
    setPreview(Array.from(e.target.files));
  };

  const onChange = (e) => {
    setPet({ ...pet, [e.target.id]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className={styles.formContainer}>
      {preview
        ? preview.map((image, index) => (
            <div className={styles.formPreview}>
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            </div>
          ))
        : pet.images &&
          pet.images.map((image, index) => (
            <div className={styles.formPreview}>
              <img
                src={`http://localhost:5000/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            </div>
          ))}
      <Input
        text="Nome"
        name="name"
        type="text"
        onChange={onChange}
        value={pet.name || ""}
      />
      <Input
        text="Idade"
        name="age"
        type="number"
        onChange={onChange}
        value={pet.age || ""}
      />
      <Input
        text="Peso"
        name="weight"
        type="number"
        onChange={onChange}
        value={pet.weight || ""}
      />
      <Input
        text="Descrição"
        name="description"
        type="text"
        onChange={onChange}
        value={pet.description || ""}
      />
      <input
        className={styles.file}
        type="file"
        name="images"
        id="images"
        onChange={handleImgChange}
        multiple
      />
      {loading ? (
        <Button disabled>Enviando</Button>
      ) : (
        <Button>{btnText}</Button>
      )}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default PetForm;
