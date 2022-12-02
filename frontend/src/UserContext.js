import React from "react";
import Api from "./Api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const getUser = React.useCallback(async (token) => {
    const response = await Api.get("users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data);
    setLogin(true);
  }, []);

  const userLogin = async (user) => {
    try {
      setError(null);
      setLoading(true);
      const response = await Api.post("users/login", user);
      window.localStorage.setItem("token", response.data.token);
      await getUser(response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = React.useCallback(() => {
    setError(null);
    setData(null);
    setLoading(false);
    setLogin(null);
    window.localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  React.useEffect(() => {
    const load = async () => {
      const token = window.localStorage.getItem("token");
      if (token) {
        try {
          setError(null);
          setLoading(true);
          await getUser(token);
        } catch (error) {
          setError(error);
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    };
    load();
  }, [getUser, userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, error, loading, login, data }}
    >
      {children}
    </UserContext.Provider>
  );
};
