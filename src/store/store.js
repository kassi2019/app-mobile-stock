import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../store/Login/loginStore';
import produitReducer from '../store/Produit/produitStore';
export const store = configureStore({
  reducer: {
    logins: loginReducer,
    produits: produitReducer
  },
});
