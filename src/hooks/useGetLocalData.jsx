import { useEffect, useState } from "react";

const useGetLocalData = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    consultar(url)
      .then((res) => {
        setData(res);
        setIsPending(false);
      })
      .catch(() => setError(true));
  }, [url]);
  return { data, isPending, error };
};
const consultar = async (url) => {
  return fetch(url).then((res) => res.json());
};

export default useGetLocalData;
