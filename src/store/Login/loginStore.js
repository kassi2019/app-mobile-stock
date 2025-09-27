import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  fetchUserProfile,
  updateUserProfile,
  changeUserPassword,
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

const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.access_token = null;
      state.user = null;
      AsyncStorage.remove("access_token");
      AsyncStorage.remove("user");
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
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
      // .addCase(loginThunk.fulfilled, (state, action) => {
      //   state.loading = false;
      //   console.log("Bonjours",action.payload);
      //   // state.access_token = action.payload.access_token;
      //   // localStorage.setItem("access_token", action.payload.access_token);
      //   // state.user = action.payload.user;
      //   // localStorage.setItem("user", JSON.stringify(action.payload.user));
      // })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearMessages } = login.actions;
export default login.reducer;
