import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "inspector";

function useFetch<PayLoad>(url: string): {
  data: PayLoad | undefined;
  loading: boolean | undefined;
  error: boolean | undefined;
} {
  const [data, setData] = useState<PayLoad | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  console.log(url);
  const getData = async () => {
    setLoading(true);
    console.log(localStorage.getItem("id_token"));
    let requestInstance = axios.create({
      headers: {
        Authorization: `${localStorage.getItem("id_token")}`,
      },
    });
    try {
      const response = await requestInstance.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  console.log(data);
  return { data, loading, error };
}

export default useFetch;
