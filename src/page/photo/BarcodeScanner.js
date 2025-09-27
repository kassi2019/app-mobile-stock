import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  ajouterCodeBarreProduit,
  enregistrerQuantiteProduit,
  detailProduitParCodeBarre,
  nombreLotProduitParCodeBarre,
  quantiteActuelProduitParCodeBarre,
} from "../../service/produitService";
import {
  messageErreur,
  messageSucces,
} from "../../composantGlobal/Notification";
import { useDispatch, useSelector } from "react-redux";
export function BarcodeScanner() {
  const {
    stateDetailProduit,
    stateNombreLotProduit,
    stateQuantiteActuelProduit,
  } = useSelector((state) => state.produits);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false); // état du scanner
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();
  const [dataCodeBarre, setDataCodeBarre] = useState("");
  const [codeProduit, setCodeProduit] = useState("");
  const [codeLot, setCodeLot] = useState("");
  const [quantiteLot1, setQuantiteLot1] = useState("0");
  const [prixAchat, setPrixAchat] = useState("0");
  const [quantiteTotal, setQuantiteTotal] = useState("");
  const [dateExpiration, setDateExpiration] = useState("");
  const [date, setDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [quantiteActuelle, setquantiteActuelle] = useState(false);
  //const [NumeroCodeLot, setNumeroCodeLot] = useState(0);
  const handleChangeQuantite = (text) => {
    // si l'utilisateur tape, on remplace le 0 initial
    if (quantiteLot1 === "0" && text !== "") {
      setQuantiteLot1(text);
    } else {
      setQuantiteLot1(text);
    }
  };
  const handleChangePrixAchat = (text) => {
    // si l'utilisateur tape, on remplace le 0 initial
    if (prixAchat === "0" && text !== "") {
      setPrixAchat(text);
    } else {
      setPrixAchat(text);
    }
  };
  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const onChange = (_event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);
  useEffect(() => {
    if (dataCodeBarre) {
      dispatch(detailProduitParCodeBarre(dataCodeBarre));
      dispatch(nombreLotProduitParCodeBarre(dataCodeBarre));
      dispatch(quantiteActuelProduitParCodeBarre(dataCodeBarre));
      // dispatch(verificationCodeProduit(stateDetailProduit?.code));
      setCodeProduit(stateDetailProduit?.code);
      //setNumeroCodeLot(stateNombreLotProduit);
      return setquantiteActuelle(stateQuantiteActuelProduit);
    }
    return setCodeProduit("");
  }, [
    dispatch,
    dataCodeBarre,
    stateDetailProduit?.code,
    stateQuantiteActuelProduit,
  ]);

  if (!permission) {
    return <Text>Chargement...</Text>;
  }
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Permission caméra refusée</Text>
        <Button title="Autoriser la caméra" onPress={requestPermission} />
      </View>
    );
  }
  const CodeLotProduit =
    "LOT" + "-" + "000000" + (parseInt(stateNombreLotProduit) + 1);

  const totalQuantite =
    parseInt(stateQuantiteActuelProduit) + parseInt(quantiteLot1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codeProduit || !dataCodeBarre) {
      messageErreur("Veuillez remplir tous les champs");
      return;
    }

    const formData = {
      code_barre: dataCodeBarre,
      code_lot: CodeLotProduit,
      expiration_date: formatDate(date), // ⚠️ doit être ISO ou Date
      quantite: Number(quantiteLot1),
      prix_achat: Number(prixAchat),
    };
    
    try {
      await dispatch(
        enregistrerQuantiteProduit({
          codeProd: codeProduit,
          codeBarre: dataCodeBarre,
          data: formData,
        })
      ).unwrap();

      messageSucces("Modification effectuée avec succès");
      setDataCodeBarre("");
      setCodeProduit("");
      setCodeLot("");
      setQuantiteLot1(0);
      setQuantiteTotal(0);
      setDateExpiration("");
    } catch (error) {
      messageErreur("Une erreur est survenue !");
      console.log("Erreur API :", error);
    }
  };

  return (
    <View style={styles.container}>
      {codeProduit && (
        <Text style={styles.innerText}>
          Ce code barre existe déja Veuillez enreigner les info sur le lot
        </Text>
      )}
      {/* Champ input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valeur Code Barre</Text>
        <TextInput
          style={[styles.input, { backgroundColor: "#E5E7EB" }]}
          value={dataCodeBarre}
          editable={false}
        />

        {dataCodeBarre && (
          <View style={styles.separator}>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Code produit</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrer le code produit"
                  value={codeProduit}
                  onChangeText={setCodeProduit}
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Code du lot</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#E5E7EB" }]}
                  placeholder="Entrer Code du lot"
                  value={CodeLotProduit}
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Nouvelle Quantité du lot </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrer Nouvelle Quantité"
                  keyboardType="numeric"
                  value={quantiteLot1}
                  onChangeText={handleChangeQuantite}
                />
              </View>

              <View style={styles.col}>
                <Text style={styles.label}>Quantité Actuel du lot</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#E5E7EB" }]}
                  placeholder="Quantité Actuel du lot"
                  value={
                    quantiteActuelle !== null ? String(quantiteActuelle) : ""
                  }
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Quantité Total du Produit</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#E5E7EB" }]}
                  placeholder="Entrer la quantité"
                  value={totalQuantite !== null ? String(totalQuantite) : ""}
                  editable={false}
                />
              </View>
              <View style={styles.col}>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                  <Text style={styles.label}>Date d'expiration du lot</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrer la Date d'expiration du lot"
                    value={formatDate(date)}
                    editable={false} // empêcher la saisie manuelle
                  />
                </TouchableOpacity>
                {date && (
                  <TouchableOpacity
                    onPress={() => setDate(null)}
                    style={{ marginLeft: 10 }}
                  >
                    <Text style={{ fontSize: 12, color: "red" }}>
                      ✖Retirer date
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Prix d'achat du lot{prixAchat}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Entrer Prix d'achat du lot"
                  keyboardType="numeric"
                  value={prixAchat}
                  onChangeText={handleChangePrixAchat}
                />
              </View>
            </View>
            {showPicker && (
              <DateTimePicker
                value={date ?? new Date()}
                mode="date" // 👈 tu peux mettre "datetime" si tu veux aussi l'heure
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        )}
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
              setScanning(false); // éteindre après détection
            }}
          />

          {/* Croix en haut à droite */}
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
          >
            <Text style={styles.buttonText}>📷 Scanner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Mise à jour</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
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
  camera: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
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
  scanButton: {
    backgroundColor: "#3B82F6",
  },
  saveButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  closeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  innerText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(237, 152, 14, 0.23)",
    textAlign: "center",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  col: {
    flex: 1, // chaque colonne prend la moitié
    marginHorizontal: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  legend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  fieldset: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  legendWrapper: {
    position: "absolute",
    top: -10,
    left: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
  },
  legend: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "600",
  },
});
