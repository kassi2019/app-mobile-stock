// export default api;

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  // baseURL: "http://192.168.1.48:4000" || "http://192.168.1.8:4000", // ton backend
  baseURL: "http://192.168.1.29:4000",
  //baseURL: "http://DESKTOP-7H09IIP:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ajouter automatiquement le token dans chaque requête
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
