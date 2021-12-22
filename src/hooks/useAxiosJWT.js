import { useState, useEffect } from "react";
import axiosJWT from "../utils/axiosJWT";

const useAxiosJWT = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axiosJWT[method](url, JSON.parse(headers), JSON.parse(body))
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useAxiosJWT;
