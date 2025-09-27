import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
//import { logout } from "../store/authSlice"; // <-- ton slice Redux

const statCards = [
  { number: 120, label: "Scanner Produit Entrant", color: "#1E40AF" },
  { number: 5, label: "Scanner Produit Sortant", color: "#10B981" },
  { number: 30, label: "Stock Initial", color: "#F59E0B" },
  { number: 18, label: "Stock Actuel", color: "#EF4444" },
  { number: 30, label: "Produits Expiré", color: "#F59E0B" },
  { number: 18, label: "Produit en Rupture", color: "#EF4444" },
  // { number: 30, label: "Produits", color: "#F59E0B" },
  // { number: 18, label: "Stock bas", color: "#EF4444" },
];

export function Accueil({ navigation }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          navigation.replace("Login"); // retour page login
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
        <Text style={styles.headerTitle}>Tableau de bord</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* Statistiques */}
      <Text style={styles.sectionTitle}>Produits récents</Text>
      <View style={styles.statsContainer}>
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
      </View>

      {/* Bouton flottant */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // permet d’aller à la ligne suivante
    justifyContent: "space-around", // espace entre les cartes
    marginVertical: 15,
    gap: 15, // si RN >= 0.71
  },
  statCard: {
    backgroundColor: "white",
    width: "46%", // deux cartes par ligne
    aspectRatio: 1, // carrée
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8, // petit espace entre les lignes
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E40AF",
  },
  statLabel: {
    fontSize: 16,
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
    fontSize: 16,
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
