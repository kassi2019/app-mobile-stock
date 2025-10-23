import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk, informationUtilisateur } from "../service/loginService";

import { Login } from "../page/Login";
import { Accueil } from "../page/Accueil";
import { BarcodeScanner } from "../page/photo/BarcodeScanner";
import { BarreCodeCaissier } from "../page/photo/BarreCodeCaissier";
import api from "../service/axios";
import { useNavigation } from "@react-navigation/native";
// import { CategorieProduit } from "../page/CategorieProduit";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ Déconnexion avec confirmation, loader et redirection automatique
function DeconnexionScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const access_token = useSelector((state) => state.logins?.access_token);
  const [loading, setLoading] = React.useState(false);
  const { stateAllUtilisateur } = useSelector((state) => state.logins);

  useEffect(() => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler",
          style: "cancel",
          onPress: () => {
            // Retour à l'accueil si annulation
            navigation.navigate("Accueil");
            navigation.navigate("Accueil", { refresh: Date.now() });
          },
        },
        {
          text: "Oui",
          style: "destructive",
          onPress: async () => {
            try {
              await dispatch(logoutThunk());
              // Après logout, redirige vers Login ou page publique
              navigation.replace("Login");
            } catch (err) {
              console.error(err);
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [dispatch, navigation]);

 
}

// ✅ Contenu personnalisé du Drawer (photo + nom utilisateur)
function CustomDrawerContent(props) {
  const { stateAllUtilisateur } = useSelector((state) => state.logins);

  const photoSrc = stateAllUtilisateur?.photoUrl
    ? `${api.defaults.baseURL}${stateAllUtilisateur.photoUrl}`
    : "../../assets/icon.png";

  console.log(photoSrc);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          src={photoSrc}
          // source={
          //   stateAllUtilisateur?.photo
          //     ? { uri: stateAllUtilisateur.photo } // image dynamique depuis une URL
          //     : require("../../assets/icon.png") // image par défaut
          // }
          style={styles.userImage}
        />
        {/* <Text style={styles.userName}>
          {stateAllUtilisateur?.nom || "Utilisateur"}
        </Text>

        <Text style={styles.userRole}>
          {stateAllUtilisateur?.role?.nom || "Utilisateur"}
        </Text> */}

        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {stateAllUtilisateur?.noms_prenoms || "Utilisateur"}
          </Text>
          <Text style={styles.userRole}>
            {" "}
            {stateAllUtilisateur?.role?.libelle || "pas de role"}
          </Text>
        </View>
      </View>

      {/* ✅ Liste des items du Drawer */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

// ✅ Drawer Navigation
function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Accueil"
      drawerContent={(props) => <CustomDrawerContent {...props} />} // <-- ici on injecte le drawer personnalisé
    >
      <Drawer.Screen name="Accueil" component={Accueil} />
      {/* <Drawer.Screen name="Catégories" component={CategorieProduit} /> */}
      <Drawer.Screen name="Scanner-Administrateur" component={BarcodeScanner} />
      <Drawer.Screen name="Scanner-Caissier" component={BarreCodeCaissier} />
      <Drawer.Screen name="Déconnexion" component={DeconnexionScreen} />
    </Drawer.Navigator>
  );
}

// ✅ Stack principal
export function AppNavigation() {
  const access_token = useSelector((state) => state.logins?.access_token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!access_token ? (
        <Stack.Screen name="Login" component={Login} />
      ) : (
        <Stack.Screen name="Accueil" component={DrawerNavigation} />
      )}
    </Stack.Navigator>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 14,
    color: "#666",
  },
});
