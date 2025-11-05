import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { informationUtilisateur, logoutThunk } from "../service/loginService";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions, useRoute } from "@react-navigation/native";
//import { logout } from "../store/authSlice"; // <-- ton slice Redux

const statCards = [
  {
    number: 12,
    label: "Scanne Magasinier",
    color: "#F59E0B",
    icon: "📦", // boîte / stock
  },
  {
    number: 5,
    label: "Scanne Caissier",
    color: "#045d18ff",
    icon: "💵", // argent / caisse
  },
  // {
  //   number: 30,
  //   label: "Stock Initial",
  //   color: "#F59E0B",
  //   icon: "📋", // liste de contrôle
  // },
  // {
  //   number: 18,
  //   label: "Stock Actuel",
  //   color: "#EF4444",
  //   icon: "📊", // graphique
  // },
  // {
  //   number: 10,
  //   label: "Produits Expirés",
  //   color: "#F59E0B",
  //   icon: "⏳", // sablier / expiration
  // },
  // {
  //   number: 7,
  //   label: "Produits en Rupture",
  //   color: "#EF4444",
  //   icon: "❌", // indisponible / rupture
  // },
  // {
  //   number: 50,
  //   label: "Produits",
  //   color: "#F59E0B",
  //   icon: "🛒", // panier / produits
  // },
  // {
  //   number: 4,
  //   label: "Stock Bas",
  //   color: "#EF4444",
  //   icon: "⚠️", // attention / stock faible
  // },
];

export function Accueil({ navigation }) {
  const dispatch = useDispatch();
  const { stateAllUtilisateur } = useSelector((state) => state.logins); // récupère l'utilisateur connecté
  const route = useRoute();
  // const role = user?.role; // "admin" ou "caissier"

  // console.log({ user });
  useEffect(() => {
    dispatch(informationUtilisateur());

    if (route.params?.refresh) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Accueil" }],
        })
      );
    }
  }, [dispatch]);

  // console.log(stateAllUtilisateur?.role?.id);
const handleLogout = () => {
  Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
    { text: "Annuler", style: "cancel" },
    {
      text: "Oui",
      style: "destructive",
      onPress: async () => {
        await dispatch(logoutThunk());
        // ❌ Ne pas faire de navigation manuelle ici !
        // Le Stack va se recharger automatiquement car access_token devient null
      },
    },
  ]);
};
  const renderProduit = ({ item }) => {
    let statut = "En stock";
    let couleur = "green";

    if (item.quantite === 0) {
      statut = "Rupture";
      couleur = "red";
    } else if (item.quantite < 20) {
      statut = "Stock bas";
      couleur = "orange";
    }

    return (
      <View style={styles.produitCard}>
        <Text style={styles.nomProduit}>{item.nom}</Text>
        <Text style={styles.quantite}>Qté : {item.quantite}</Text>
        <Text style={[styles.statut, { color: couleur }]}>{statut}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Application de Scanne code barre</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Statistiques */}
      {/* <Text style={styles.sectionTitle}>Produits récents</Text> */}
      {/* <View style={styles.statsContainer}>
        {statCards.map((item, index) => (
          
          <TouchableOpacity
            key={index}
            style={[
              styles.statCard,
              { borderColor: item.color, borderWidth: 2 },
            ]}
            onPress={() => {
              if (index === 0) {
                navigation.navigate("ScannerAdmin");
                // les deux premières cartes
              } else {
                navigation.navigate("ScannerCaissier");
              }
            }}
          >
            <Text style={styles.statNumber}>{item.number}</Text>
            <Text style={styles.statLabel} numberOfLines={2}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View> */}
      <View style={styles.container}>
        {/* En-tête */}

        {/* Cartes */}
        <View style={styles.statsContainer}>
          {statCards.map((item, index) => {
            const isDisabled =
              (stateAllUtilisateur?.role?.id === 3 && index === 1) ||
              (stateAllUtilisateur?.role?.id === 2 && index === 0);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.statCard,
                  { borderColor: item.color, borderWidth: 2 },
                  isDisabled && styles.disabledCard,
                ]}
                disabled={isDisabled}
                onPress={() => {
                  if (index === 0) {
                    navigation.navigate("Scanner-Administrateur");
                  } else {
                    navigation.navigate("Scanner-Caissier");
                  }
                }}
              >
                <Text style={{ marginRight: 5, fontSize: 40 }}>
                  {item.icon}
                </Text>

                <Text
                  style={[styles.statLabel, isDisabled && { color: "#9CA3AF" }]}
                  numberOfLines={2}
                >
                  {/* Affichage de l'icône devant le label */}

                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {/* Bouton flottant */}
      {/* <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // statsContainer: {
  //   flexDirection: "row",
  //   flexWrap: "wrap", // permet d’aller à la ligne suivante
  //   justifyContent: "space-around", // espace entre les cartes
  //   marginVertical: 15,
  //   gap: 15, // si RN >= 0.71
  // },
  // statCard: {
  //   backgroundColor: "white",
  //   width: "46%", // deux cartes par ligne
  //   aspectRatio: 1, // carrée
  //   borderRadius: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  //   marginVertical: 8, // petit espace entre les lignes
  // },

  statsContainer: {
    flexDirection: "row",
    marginTop: 250,
    flexWrap: "wrap",
    justifyContent: "space-around", // centre les cartes au milieu
    marginVertical: 15,
    gap: 15, // fonctionne si RN >= 0.71
  },
  statCard: {
    backgroundColor: "white",
    width: "40%", // réduit un peu pour qu’elles soient bien centrées
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8, // petit espace autour
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  statLabel: {
    fontSize: 20,
    color: "#6B7280",
    textAlign: "center",
    flexShrink: 1,
    marginTop: 8,
  },
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    backgroundColor: "#1E40AF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "center", // centre horizontalement
    marginVertical: 15,
    gap: 15,
  },

  statNumber: { fontSize: 18, fontWeight: "bold", color: "#1E40AF" },
  statLabel: {
    fontSize: 20,
    color: "#6B7280",
    textAlign: "center", // centre horizontalement le texte
    flexShrink: 1, // ajuste le texte si trop long
    marginTop: 8,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
    color: "#111827",
  },
  produitCard: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  nomProduit: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  quantite: { fontSize: 14, color: "#374151", marginTop: 4 },
  statut: { fontSize: 14, fontWeight: "600", marginTop: 6 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#2563EB",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
