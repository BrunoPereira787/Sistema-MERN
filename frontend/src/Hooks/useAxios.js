import React from "react";
import Api from "../Api";

const useAxios = () => {
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const axiosGet = async (url, options) => {
    let response;
    try {
      setError(null);
      setLoading(true);
      response = await Api.get(url, options).then((resp) => {
        return resp.data;
      });
    } catch (error) {
      response = null;
      setError(error.message);
    } finally {
      setData(response);
      setLoading(false);
      return { response };
    }
  };

  const axiosPost = async (url, options, object) => {
    let response;
    try {
      setError(null);
      setLoading(true);
      response = await Api.post(url, options, object).then((resp) => {
        //return resp.data;
        console.log(resp.data);
      });
      console.log(response);
    } catch (error) {
      /*response = null;
      setError(error.response.data.message);*/
      console.log(error);
    } finally {
      setData(response);
      setLoading(false);
      return { response };
    }
  };

  return {
    error,
    data,
    loading,
    axiosGet,
    axiosPost,
  };
};

export default useAxios;
