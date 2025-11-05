import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --------------------
// 🔐 LOGIN
// --------------------
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ matricule, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { matricule, password });

      // Sauvegarde du token dans AsyncStorage
      await AsyncStorage.setItem("access_token", response.data.access_token);

      // (Optionnel) Sauvegarde des infos utilisateur
      if (response.data?.user) {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data; // { access_token, user }
    } catch (err) {
      console.log("Erreur API login:", err.response || err);
      return rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);

// --------------------
// 🚪 LOGOUT
// --------------------
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      // Supprime les données stockées
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");

      // (Optionnel) vide le store Redux
      dispatch({ type: "auth/clearUser" });

      return true;
    } catch (error) {
      console.error("Erreur pendant la déconnexion :", error);
      throw error;
    }
  }
);

// --------------------
// 🖼️ UPLOAD PHOTO
// --------------------
export const uploadProfilePhotoThunk = createAsyncThunk(
  "users/uploadProfilePhoto",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: file.uri,
        name: file.name || "photo.jpg",
        type: file.type || "image/jpeg",
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const res = await api.post("/users/profile-photo", formData, config);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur upload photo"
      );
    }
  }
);

// --------------------
// 👤 INFO UTILISATEUR
// --------------------
export const informationUtilisateur = createAsyncThunk(
  "informationUtilisateur/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/info-user");
      await AsyncStorage.setItem("user_info", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de la récupération des informations utilisateur"
      );
    }
  }
);
