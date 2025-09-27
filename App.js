import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux"; 
import { store } from "./src/store/store";  // Assure-toi que le chemin est correct
import { AppNavigation } from "./src/navigation/AppNavigation";
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/composantGlobal/toast"; 
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
}
