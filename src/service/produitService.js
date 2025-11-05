import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ajouterCodeBarreProduit = createAsyncThunk(
  "produit/ajouterCodeBarre",
  async ({ codeProd, data }, thunkAPI) => {
    try {
      const response = await api.put(
        `/produit/${codeProd}`, // ⚠️ 10.0.2.2 pour Android Emulator
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verificationCodeProduit = createAsyncThunk(
  "codeProduit/codeProduit",
  async (codeprod, thunkAPI) => {
    try {
      const res = await api.get(`/produit/verifierCodeProduit/${codeprod}`);
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

export const detailProduitParCodeBarre = createAsyncThunk(
  "codeBarreProduit/codeBarreProduit",
  async (codeprod, thunkAPI) => {
    try {
      const res = await api.get(`/produit/detailProduit/${codeprod}`);
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

export const nombreLotProduitParCodeBarre = createAsyncThunk(
  "nombreLot/nombreLot",
  async (codebarre, thunkAPI) => {
    try {
      const res = await api.get(`/produit/nombreLotProduit/${codebarre}`);
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

export const quantiteActuelProduitParCodeBarre = createAsyncThunk(
  "quantiteActuel/quantiteActuel",
  async (codebarre, thunkAPI) => {
    try {
      const res = await api.get(`/produit/quantiteProduit/${codebarre}`);
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

export const enregistrerQuantiteProduit = createAsyncThunk(
  "miseajour/miseajour",
  async ({ codeProd, codeBarre, data }, thunkAPI) => {
    try {
      // tu peux utiliser GET ou POST selon ton API
      const res = await api.post(
        `/produit/miseAjourProduit/${codeProd}/${codeBarre}`,
        data // on envoie aussi l'objet data
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'enregistrement du produit"
      );
    }
  }
);


export const ajouterProduitTemporellement = createAsyncThunk(
  "temporel/temporel",
 
  async ({ codeBarre }, thunkAPI) => {

    try {
    
       
      // tu peux utiliser GET ou POST selon ton API
      const res = await api.post(
        `/produit/ajouterProduitTemporel/${codeBarre}`
      );
      return res.data;
    } catch (err) {
      alert(err);
      return thunkAPI.rejectWithValue(
        err.response?.data || "Erreur lors de l'enregistrement du produit"
      );
    }
  }
);