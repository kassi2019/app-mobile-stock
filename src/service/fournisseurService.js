import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const listeFournisseur = createAsyncThunk(
  "listeFournisseur/listeFournisseur",
  async (thunkAPI) => {
    try {
      const res = await api.get(`/entreprise/liste`);
      //   alert(res);
      return res.data; // on ne garde que le tableau des utilisateurs
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data ||
          "Erreur lors de l'affichage des utilisateurs par niveau structure"
      );
    }
  }
);
