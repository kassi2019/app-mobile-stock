import { createSlice } from "@reduxjs/toolkit";
import { listeFournisseur } from "../../service/fournisseurService";
const initialState = {
  stateFournisseur: [],
  loading: false,
  error: null,
  success: null,
};

const fournisseur = createSlice({
  name: "fournisseur",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(listeFournisseur.pending, (state) => {
        state.loading = true;
      })
      .addCase(listeFournisseur.fulfilled, (state, action) => {
        state.loading = false;

        state.stateFournisseur = action.payload.data.map((item) => ({
          value: item.id, // ou item.niveau
          label: item.nom_fournisseur,
        }));
      })
      .addCase(listeFournisseur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fournisseur.reducer;
