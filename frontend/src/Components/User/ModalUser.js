import React from "react";
import useFetch from "../../Hooks/UseFetch";
import Userform from "../Forms/Userform";
import styles from "./ModalUser.module.css";

const ModalUser = ({ user, setUserModal }) => {
  const { error, loading, request } = useFetch();

  const handleClick = (e) => {
    if (e.target === e.currentTarget) setUserModal(null);
  };

  const handleSubmit = async (data) => {
    const token = window.localStorage.getItem("token");
    const { response } = await request("http://localhost:5000/users/edit", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) window.location.reload();
  };

  return (
    <div className={styles.modal} onClick={handleClick}>
      <div className={styles.modalUser}>
        <Userform
          data={user}
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          btnText={"editar"}
        />
      </div>
    </div>
  );
};

export default ModalUser;
