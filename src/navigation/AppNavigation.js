import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Login } from "../page/Login";
import { Accueil } from "../page/Accueil";
import { BarcodeScanner } from "../page/photo/BarcodeScanner";
import { BarreCodeCaissier } from "../page/photo/BarreCodeCaissier";
import { CategorieProduit } from "../page/CategorieProduit";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Exemple de page Produits
function ProduitsScreen() {
  return (
    <View style={styles.center}>
      <Text>📦 Liste des Produits</Text>
    </View>
  );
}

// Déconnexion : retourne au login avec reset
function DeconnexionScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>👋 Vous êtes déconnecté</Text>
      <Button
        title="Retour au login"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }], // <-- Stack screen Login
          })
        }
      />
    </View>
  );
}

// Drawer qui contient Accueil et autres pages
function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Accueil">
      <Drawer.Screen name="Accueil" component={Accueil} />
      <Drawer.Screen name="Produits" component={ProduitsScreen} />
      <Drawer.Screen name="Catégories" component={CategorieProduit} />
      <Drawer.Screen name="ScannerAdmin" component={BarcodeScanner} />
      <Drawer.Screen name="ScannerCaissier" component={BarreCodeCaissier} />
      <Drawer.Screen name="Déconnexion" component={DeconnexionScreen} />
    </Drawer.Navigator>
  );
}

// Navigation principale avec Stack
export function AppNavigation() {
  const access_token = useSelector((state) => state.logins?.access_token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!access_token ? (
        // ✅ Écran public si pas de token
        <Stack.Screen name="Login" component={Login} />
      ) : (
        // ✅ Écrans privés si token présent
        <Stack.Screen name="Accueil" component={DrawerNavigation} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});
