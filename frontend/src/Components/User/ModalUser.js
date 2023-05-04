import React from "react";
import useFetch from "../../Hooks/UseFetch";
import Userform from "../Forms/Userform";
import styles from "./ModalUser.module.css";
import { UPDATE_USER } from "../../Api";

const ModalUser = ({ user, setUserModal }) => {
  const { error, loading, request } = useFetch();

  const handleClick = (e) => {
    if (e.target === e.currentTarget) setUserModal(null);
  };

  const handleSubmit = async (data) => {
    const token = window.localStorage.getItem("token");
    const { url, options } = UPDATE_USER(token, data);
    const { response } = await request(url, options);

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
