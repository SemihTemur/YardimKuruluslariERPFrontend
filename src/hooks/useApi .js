import apiService from "../services/apiService"; // API servis dosyanızı içe aktarın

const useApi = () => {
  const makeRequest = async (method, endpoint, values = null, id = null) => {
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
      throw err;
    }
  };

  return { makeRequest };
};

export default useApi;
