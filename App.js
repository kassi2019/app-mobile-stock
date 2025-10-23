import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // ✅ à ajouter
import { store, persistor } from "./src/store/store"; // ✅ le nouveau store persistant
import { AppNavigation } from "./src/navigation/AppNavigation";
import Toast from "react-native-toast-message";
import { toastConfig } from "./src/composantGlobal/toast";
import "react-native-gesture-handler";
import "react-native-reanimated";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNavigation />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
