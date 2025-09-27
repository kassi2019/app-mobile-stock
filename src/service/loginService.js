import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ matricule, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", { matricule, password });

      // Sauvegarde du token dans AsyncStorage
      await AsyncStorage.setItem("token", response.data.access_token);

      return response.data; // { token, user }
    } catch (err) {
      console.log("Erreur API login:", err.response || err);
      return rejectWithValue(err.response?.data || "Erreur serveur");
    }
  }
);
// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const res = await api.post("/auth/login", credentials);

//       // Sauvegarde du token et de l'utilisateur
//       if (res.data?.token) {
//         await AsyncStorage.setItem("access_token", res.data.token);
//       }
//       if (res.data?.user) {
//         await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
//       }

//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || "Erreur login");
//     }
//   }
// );
// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async ({ matricule, password }, { rejectWithValue }) => {
//     try {
//       const response = await api.post("/auth/login", { matricule, password });
//       return response.data; // doit contenir { token, user }
//     } catch (err) {
      
//       return rejectWithValue(err.response?.data || "Erreur serveur");
//     }
//   }
// );
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  await api.post("/auth/logout");
  await AsyncStorage.removeItem("access_token");
  await AsyncStorage.removeItem("user");
  return true;
});

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
export const informationUtilisateur = createAsyncThunk(
  "informationUtilisateur/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/info-user"); // Assure-toi que la route existe dans NestJS

      // Optionnel : sauvegarde dans AsyncStorage
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
