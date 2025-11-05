import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import {
  detailProduitParCodeBarre,
  ajouterProduitTemporellement,
} from "../../service/produitService";
import {
  messageErreur,
  messageSucces,
} from "../../composantGlobal/Notification";

export function BarreCodeCaissier() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [dataCodeBarre, setDataCodeBarre] = useState("");
  const { stateAllUtilisateur } = useSelector((state) => state.logins);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  if (!permission) return <Text>Chargement...</Text>;
  if (!permission.granted)
    return (
      <View style={styles.center}>
        <Text>Permission caméra refusée</Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </View>
    );

  const handleScan = async (codeBarre) => {
    try {
      // 1️⃣ Récupérer le produit depuis backend
      const produit = await dispatch(
        detailProduitParCodeBarre(codeBarre)
      ).unwrap();

      if (!produit) {
        messageErreur("Produit introuvable !");
        return;
      }

      // 2️⃣ Préparer les données pour l'enregistrement dans la nouvelle table
      // const formData = {
      //   produit_id: produit.id,
      // };
      //alert(codeBarre);
      // 3️⃣ Enregistrer directement en base
      await dispatch(
        ajouterProduitTemporellement({
          codeBarre: codeBarre,
        })
      ).unwrap();
      setDataCodeBarre("");
      messageSucces(`Produit enregistré avec succès !`);
    } catch (error) {
      messageErreur("Erreur lors de l'enregistrement du produit !");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input affichage du code barre */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valeur Code Barre</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#E5E7EB" }]}
          value={dataCodeBarre}
          editable={false}
        />
      </View>

      {/* Scanner */}
      {scanning && !scanned ? (
        <View style={{ flex: 1 }}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "ean13", "code128"],
            }}
            onBarcodeScanned={({ data }) => {
              setScanned(true);
              setDataCodeBarre(data);
              setScanning(false);
              handleScan(data); // enregistrement direct
            }}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setScanning(false)}
          >
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.scanButton]}
            onPress={() => {
              setScanning(true);
              setScanned(false);
            }}
            disabled={stateAllUtilisateur?.role?.id !== 2}
          >
            <Text style={styles.buttonText}>📷 Scanner</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#374151" },
  inputContainer: { marginBottom: 20, width: "100%" },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    fontSize: 16,
    color: "#111827",
    marginBottom: 15,
  },
  camera: { flex: 1, borderRadius: 12, overflow: "hidden", marginTop: 10 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
    paddingHorizontal: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  scanButton: { backgroundColor: "#3B82F6" },
  buttonText: { color: "white", fontWeight: "bold" },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  closeText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
