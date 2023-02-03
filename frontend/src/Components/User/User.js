import React from "react";
import UseFetch from "../../Hooks/UseFetch";
import { UserContext } from "../../UserContext";
import Loading from "../Helper/Loading";
import ModalUser from "./ModalUser";
import styles from "./User.module.css";

const User = () => {
  const { data, loading, request } = UseFetch();
  const { userLogout } = React.useContext(UserContext);
  const [userModal, setUserModal] = React.useState(null);

  React.useEffect(() => {
    const loadApi = async () => {
      const token = window.localStorage.getItem("token");
      await request("http://localhost:5000/users/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    };
    loadApi();
  }, [request]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar seu perfil ?"
    );
    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { response } = await request("http://localhost:5000/users/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) userLogout();
    }
  };

  if (loading) return <Loading />;
  if (data)
    return (
      <section className={`${styles.userContainer} container`}>
        {userModal && (
          <ModalUser user={userModal} setUserModal={setUserModal} />
        )}
        <div className={styles.userStatus}>
          <div className={styles.userImg}>
            {data.img ? (
              <p>Com image</p>
            ) : (
              <img src="/anonimo.jpg" alt="imagem anonima" />
            )}
          </div>
          <div className={styles.buttons}>
            <button onClick={() => setUserModal(data)}>Editar Perfil</button>
            <button onClick={handleDelete}>Deletar Perfil</button>
          </div>
        </div>
        <div className={styles.userInfoContainer}>
          <h1>Dados Cadastrados</h1>
          <div className={styles.userInfo}>
            <p>{data.name}</p>
            <p>{data.email}</p>
            <div>
              <p>{data.cep}</p>
              <p>{data.state}</p>
            </div>
            <div>
              <p>{data.city}</p>
              <p>{data.district}</p>
            </div>
          </div>
        </div>
      </section>
    );
};

export default User;
