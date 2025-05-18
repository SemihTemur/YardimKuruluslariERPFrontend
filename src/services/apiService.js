import axios from "axios";

const API_URL = "http://localhost:8080/rest/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const tokenExcludedEndpoints = ["login", "password-reset"];

    // login endpoint'ini hariç tutmak için kontrol
    const shouldExclude = tokenExcludedEndpoints.some((endpoint) => {
      return config.url.includes(endpoint);
    });

    if (!shouldExclude) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const apiService = {
  get: async (endpoint) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  put: async (endpoint, data, id) => {
    try {
      const response = await axiosInstance.put(`${endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  putWithNoId: async (endpoint, data) => {
    try {
      const response = await axiosInstance.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (endpoint, id) => {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
