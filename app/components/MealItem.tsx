import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import modelService from "../services/modelSevice";

export const MealItem = ({ meal }: {meal: Meal}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleIconPress = async () => {
    //Fetch the image only once
    if (!imageUri) {
      const image = await modelService.getImageByURL(meal.Image);
      setImageUri(image);
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleIconPress}>
        <View style={styles.icon}>
          <MaterialIcons name="preview" size={34} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={imageUri ? { uri: imageUri } : undefined}
              style={styles.image}
            />
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.details}>
        <Text style={styles.mealTitle}>{meal.Name.replace(/\b\w/g, char => char.toUpperCase())}</Text>
        <Text style={styles.macroText}>Protein: {meal.Macros.Protein}g</Text>
        <Text style={styles.macroText}>Carbs: {meal.Macros.Carbs}g</Text>
        <Text style={styles.macroText}>Fat: {meal.Macros.Fat}g</Text>
        <Text style={styles.caloriesText}>Calories: {meal.Macros.Calories}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 25,
  },
  details: {
    flex: 1,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  macroText: {
    fontSize: 14,
    color: "#666",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF5722",
    marginTop: 5,
  },
  closeButton: {
    fontSize: 16,
    color: "#4CAF50",
    marginTop: 10,
  },
});
