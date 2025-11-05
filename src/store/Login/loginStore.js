import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  uploadProfilePhotoThunk,
  informationUtilisateur,
} from "../../service/loginService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  status: "idle",
  error: null,
  access_token: null,
  user: null,
  profile: null,
  loading: false,
  success: null,
  stateAllUtilisateur: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.access_token = null;
      state.user = null;
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("user");
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔐 LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        AsyncStorage.setItem("access_token", action.payload.access_token);
        AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🚪 LOGOUT
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.access_token = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👤 INFO UTILISATEUR
      .addCase(informationUtilisateur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(informationUtilisateur.fulfilled, (state, action) => {
        state.loading = false;
        state.stateAllUtilisateur = action.payload.data || action.payload;
      })
      .addCase(informationUtilisateur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser, clearMessages } = authSlice.actions;
export default authSlice.reducer;
