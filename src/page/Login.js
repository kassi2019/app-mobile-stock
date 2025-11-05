import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Icon from "react-native-vector-icons/FontAwesome";
import { loginThunk } from "../service/loginService";
import { useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { messageErreur } from "../composantGlobal/Notification";

export function Login({ navigation }) {
  const [matricule, setMatricule] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // 👁️ ajout
  const dispatch = useDispatch();

  const validateInput = (value) => /^[a-zA-Z0-9._]+$/.test(value);

  const handleLogin = () => {
    if (!validateInput(matricule)) {
      messageErreur(`Veuillez entrer un matricule valide`);
      //Alert.alert("Erreur", "Veuillez entrer un matricule valide");
      return;
    }
    if (password.length < 4) {
      // Alert.alert("Erreur", "Mot de passe trop court");
      messageErreur(`Mot de passe trop court`);
      return;
    }

    setLoading(true);
    dispatch(loginThunk({ matricule, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        navigation.replace("Accueil");
      })
      .catch((err) => {
        setLoading(false);
        messageErreur(`Matricule ou mot de passe incorrect`, err);
        // const msg =
        //   typeof err === "string"
        //     ? err
        //     : err?.message || "Matricule ou mot de passe incorrect";
        // Alert.alert("Erreur de connexion", msg);
        // console.log("Erreur login:", err);
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
        {/* Matricule */}
        <TextInput
          style={styles.input}
          placeholder="Matricule"
          value={matricule}
          onChangeText={setMatricule}
        />

        {/* Mot de passe + œil */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} // 👁️ cacher/montrer
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <FontAwesome
              name={passwordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

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

        {/* Bouton Connexion */}
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginText}>Connexion</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E40AF",
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
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 12,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
