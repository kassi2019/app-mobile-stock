import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import { loginThunk } from "../service/loginService";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
export function Login({ navigation }) {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // 🔹 Vérification simple maticule
  const validateInput = (value) => {
    // Email
    //const emailRegex = /\S+@\S+\.\S+/;

    // Numéro (8 à 15 chiffres)
    //const phoneRegex = /^[0-9]{8,15}$/;

    // Alphanumérique (lettres + chiffres, autorise underscore `_` et point `.`)
    const alphaNumRegex = /^[a-zA-Z0-9._]+$/;

    return (
      //   emailRegex.test(value) ||
      //   phoneRegex.test(value) ||
      alphaNumRegex.test(value)
    );
  };

  //   const handleLogin = async () => {
  //     if (!validateInput(maticule)) {
  //       Alert.alert("Erreur", "Veuillez entrer un maticule valide");
  //       return;
  //     }
  //     if (password.length < 4) {
  //       Alert.alert("Erreur", "Mot de passe trop court");
  //       return;
  //     }

  //     setLoading(true);

  //     try {
  //       // 🔹 Appel API vers ton backend NestJS
  //       const response = await fetch("http://10.0.2.2:3000/auth/login", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ maticule, password }),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error(data.message || "Identifiants invalides");
  //       }

  //       // 🔹 Exemple : data = { access_token: "xxxx.yyy.zzz" }
  //       Alert.alert("Succès", "Connexion réussie !");

  //       // Ici tu peux sauvegarder le token (AsyncStorage)
  //       // import AsyncStorage from '@react-native-async-storage/async-storage';
  //       // await AsyncStorage.setItem('token', data.access_token);

  //       // 🔹 Redirection vers l’accueil
  //       navigation.replace("Home");
  //     } catch (error) {
  //       Alert.alert("Erreur", error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  // const handleLogin = async () => {

  //   if (!validateInput(matricule)) {
  //     Alert.alert("Erreur", "Veuillez entrer un matricule valide");
  //     return;
  //   }
  //   if (password.length < 4) {
  //     Alert.alert("Erreur", "Mot de passe trop court");
  //     return;
  //   }

  //   setLoading(true);

  //   const messageErreur = (msg) => {
  //     Alert.alert("Erreur", msg);
  //   };

  //   try {
  //    alert("ok");
  //     const res = await dispatch(loginThunk({ matricule, password })).unwrap();
  //     alert(res);
  //     // Sauvegarder dans AsyncStorage
  //     await AsyncStorage.setItem("shouldReloadHome", "true");
  //     await AsyncStorage.setItem("access_token", res.token); // si ton API renvoie un token
  //     await AsyncStorage.setItem("user", JSON.stringify(res.user));

  //     // Naviguer vers la page d'accueil
  //     navigation.replace("Accueil");
  //   } catch (err) {
  //     setLoading(false);
  //     messageErreur("Échec de la connexion");
  //     console.error(err);
  //   }
  // };

  const handleLogin = () => {
    if (!validateInput(matricule)) {
      Alert.alert("Erreur", "Veuillez entrer un matricule valide");
      return;
    }
    if (password.length < 4) {
      Alert.alert("Erreur", "Mot de passe trop court");
      return;
    }

    setLoading(true);

    dispatch(loginThunk({ matricule, password }))
      .unwrap()
      .then((res) => {
        setLoading(false);
        navigation.replace("Accueil");
      })
      .catch((err) => {
        setLoading(false);

        // si ton backend renvoie { message: "Identifiants incorrects" }
        const msg =
          typeof err === "string"
            ? err
            : err?.message || "Matricule ou mot de passe incorrect";

        Alert.alert("Erreur de connexion", msg);
        console.log("Erreur login:", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Haut bleu */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Bienvenue</Text>
        </View>
        <Text style={styles.title}>sur E-stock</Text>
        <Text style={styles.subtitle}>
          Entrez votre matricule et votre mot de passe
        </Text>
      </View>

      {/* Bas blanc (formulaire) */}
      <View style={styles.formContainer}>
        {/* Bouton Google */}
        {/*  */}

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Matricule"
          value={matricule}
          onChangeText={setMatricule}
          keyboardType="Matricule-address"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Options */}
        <View style={styles.row}>
          <View style={styles.remember}>
            <Checkbox value={rememberMe} onValueChange={setRememberMe} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Bouton login */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Connexion</Text>
        </TouchableOpacity>

        {/* Sign Up */}
        {/* <View style={styles.footer}>
          <Text>Don’t have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.link}> Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E40AF", // haut bleu
  },
  header: {
    alignItems: "center",
    paddingVertical: 150,
  },
  logo: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 12,
    color: "#E0E7FF",
    marginTop: 5,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  googleBtn: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  googleText: {
    marginLeft: 10,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 5,
    color: "#111827",
  },
  link: {
    color: "#2563EB",
    fontWeight: "500",
  },
  loginBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
