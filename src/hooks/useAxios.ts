import { useEffect, useState, useCallback } from "react";
import useAxiosAuth from "./useAxiosAuth";

// Generic type T for inferred response type
const useAxios = (url: string) => {
  const axios = useAxiosAuth();

  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    if (!url) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/api/${url}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response || err.message);
        setError(err.response?.data?.message || err.message || "Unknown error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, axios]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxios;
