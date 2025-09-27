// pages/Products.js
import React, { useState } from "react";
import { View, Button, TouchableOpacity, Text } from "react-native";
import { TableGlobal } from "../composantGlobal/TableGlobal";
import { ModalGlobal } from "../composantGlobal/ModalGlobal";
import Ionicons from "react-native-vector-icons/Ionicons";
export function CategorieProduit() {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAdd = () => {
    setSelectedProduct(null);
    setModalVisible(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleDelete = (product) => {
    setProducts(products.filter((p) => p !== product));
  };
  const handleSubmit = (product) => {
    if (selectedProduct) {
      // Modifier
      setProducts(products.map((p) => (p === selectedProduct ? product : p)));
    } else {
      // Ajouter
      setProducts([...products, product]);
    }
    setModalVisible(false);
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      <View style={{ alignItems: "flex-end", marginBottom: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 5,
          }}
          onPress={handleAdd}
        >
          {/* <Ionicons name="add-circle-outline" size={12} color="white" /> */}
          <Text style={{ color: "white", fontWeight: "bold",fontSize: 12 }}>
            Ajouter
          </Text>
        </TouchableOpacity>
      </View>
      <TableGlobal
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ModalGlobal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        defaultValues={selectedProduct}
      />
    </View>
  );
}
