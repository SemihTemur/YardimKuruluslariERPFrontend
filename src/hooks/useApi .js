import { useState } from "react";
import apiService from "../services/apiService"; // API servis dosyanızı içe aktarın

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const makeRequest = async (method, endpoint, data = null, id = null) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (method === "get") {
        response = await apiService.get(endpoint);
      } else if (method === "post") {
        response = await apiService.post(endpoint, data);
      } else if (method === "put") {
        response = await apiService.put(endpoint, data, id);
      } else if (method === "delete") {
        response = await apiService.delete(endpoint, id);
      }
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, setData, makeRequest };
};

export default useApi;
