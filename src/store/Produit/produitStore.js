import { createSlice } from "@reduxjs/toolkit";
import {
  ajouterCodeBarreProduit,
  verificationCodeProduit,
  detailProduitParCodeBarre,
  nombreLotProduitParCodeBarre,
  quantiteActuelProduitParCodeBarre
} from "../../service/produitService";
const initialState = {
  produit: [],
  stateVerificationProduit: [],
  stateDetailProduit: [],
  stateNombreLotProduit: [],
  stateQuantiteActuelProduit: [],
  loading: false,
  error: null,
  success: null,
};

const produit = createSlice({
  name: "produit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ajouterCodeBarreProduit.pending, (state) => {
        state.loading = true;
      })
      .addCase(ajouterCodeBarreProduit.fulfilled, (state, action) => {
        state.loading = false;
        // Mettre à jour le state si besoin
      })
      .addCase(ajouterCodeBarreProduit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //  .addCase(verificationCodeProduit.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(verificationCodeProduit.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.stateVerificationProduit = action.payload; // ✅ stocker la réponse
    //   })
    //   .addCase(verificationCodeProduit.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
    
    .addCase(detailProduitParCodeBarre.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailProduitParCodeBarre.fulfilled, (state, action) => {
        state.loading = false;
        state.stateDetailProduit = action.payload; // ✅ stocker la réponse
      })
      .addCase(detailProduitParCodeBarre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
    .addCase(nombreLotProduitParCodeBarre.pending, (state) => {
        state.loading = true;
      })
      .addCase(nombreLotProduitParCodeBarre.fulfilled, (state, action) => {
        state.loading = false;
        state.stateNombreLotProduit = action.payload; // ✅ stocker la réponse
      })
      .addCase(nombreLotProduitParCodeBarre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
    
    .addCase(quantiteActuelProduitParCodeBarre.pending, (state) => {
        state.loading = true;
      })
      .addCase(quantiteActuelProduitParCodeBarre.fulfilled, (state, action) => {
        state.loading = false;
        state.stateQuantiteActuelProduit = action.payload; // ✅ stocker la réponse
      })
      .addCase(quantiteActuelProduitParCodeBarre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
  },
});

export default produit.reducer;
