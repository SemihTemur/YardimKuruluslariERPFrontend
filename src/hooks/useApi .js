import { useState } from "react";
import apiService from "../services/apiService"; // API servis dosyanızı içe aktarın

const useApi = () => {
  const [error, setError] = useState(null);

  const makeRequest = async (method, endpoint, values = null, id = null) => {
    setError(null);
    try {
      let response;
      if (method === "get") {
        response = await apiService.get(endpoint);
      } else if (method === "post") {
        response = await apiService.post(endpoint, values);
      } else if (method === "put") {
        response = await apiService.put(endpoint, values, id);
      } else if (method === "delete") {
        response = await apiService.delete(endpoint, id);
      }
      return response;
    } catch (err) {
      setError(err);
    }
  };

  return { error, makeRequest };
};

export default useApi;
