import axios from "axios";

const API_URL = "http://localhost:8080/rest/api/"; // API URL'inizi buraya ekleyin

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axios.get(`${API_URL}${endpoint}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, data, id) => {
    try {
      const response = await axios.put(`${API_URL}${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (endpoint, id) => {
    try {
      const response = await axios.delete(`${API_URL}${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
