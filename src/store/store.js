import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import loginReducer from "../store/Login/loginStore";
import produitReducer from "../store/Produit/produitStore";
import fournisseurReducer from "../store/Fournisseur/fournisseurStore";

// Configuration de la persistance
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["logins"], // seules ces slices seront persistées
};

// Combine tous les reducers
const rootReducer = combineReducers({
  logins: loginReducer,
  produits: produitReducer,
  fournisseurs1: fournisseurReducer,
});

// Applique la persistance
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Création du store avec middleware configuré directement
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Export du persistor
export const persistor = persistStore(store);
