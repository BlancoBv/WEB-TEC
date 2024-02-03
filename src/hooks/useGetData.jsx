import { useState, useEffect } from "react";
import Axios from "../axios/Axios";

function useGetData(url, actualizador) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [dataError, setDataError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    consultar(url)
      .then((res) => {
        console.log(res);
        const { success, response } = res;
        if (success && response.length === 0) {
          setData(res);
          setIsPending(false);
          setError(true);
        } else {
          setData(res);
          setIsPending(false);
          setError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setDataError(err.data);
        setError(true);
        setIsPending(false);
      });
  }, [url, actualizador /* , stateAuth */]);

  return { data, error, dataError, isPending };
}

export default useGetData;

const consultar = async (url) => {
  try {
    const response = await Axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
