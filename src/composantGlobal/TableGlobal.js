// compo.js
import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export  function TableGlobal({ data, onEdit, onDelete }) {
  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <TouchableOpacity onPress={() => onEdit(item)} style={styles.button}>
        <Text style={styles.buttonText}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item)} style={[styles.button, { backgroundColor: "red" }]}>
        <Text style={styles.buttonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nom</Text>
        <Text style={styles.cell}>Catégorie</Text>
        <Text style={styles.cell}>Modifier</Text>
        <Text style={styles.cell}>Supprimer</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", padding: 10, backgroundColor: "#eee" },
  row: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  cell: { flex: 1, textAlign: "center" },
  button: { flex: 1, backgroundColor: "#007bff", padding: 5, borderRadius: 5, marginHorizontal: 2 },
  buttonText: { color: "white", textAlign: "center" },
});
