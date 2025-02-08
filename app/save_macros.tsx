import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; 
import { Stack } from "expo-router";
import modelService from "./services/modelSevice";

const SaveMacrosScreen = () => {
  const [mealName, setMealName] = useState("");
  const [protein, setProtein] = useState("");
  const [fats, setFats] = useState("");
  const [carbs, setCarbs] = useState("");
  const [calories, setCalories] = useState("");

  const handleSaveMeal = async () => {
    // Handle saving meal logic here using the storeMealMacros method from the modelService
    if (!mealName || !protein || !fats || !carbs || !calories) {
      alert("Please fill all the fields");
      return;
    }

    // Save the meal
    const response = await modelService.storeMealMacros(mealName, protein, fats, carbs, calories);
    if (!response) {
      alert("Failed to save meal");
      return;
    }
    if (response != null) {
      alert("Meal saved successfully");
      setMealName("");
      setProtein("");
      setFats("");
      setCarbs("");
      setCalories("");
    }
  };

  return (
    <>
    <Stack.Screen options={{ title: "Add Meal Macros" }} />
    <View style={styles.container}>
      <Text style={styles.header}> Input the Meal Macros</Text>

      <Text style={styles.label}>Meal Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter meal name"
        value={mealName}
        onChangeText={setMealName}
      />

      <Text style={styles.label}>Macros</Text>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
            <FontAwesome5 name="drumstick-bite" size={20} color="rgb(116, 69, 8)" />
        </View>
        
        <TextInput
          style={styles.inputField}
          placeholder="Protein (g)"
          keyboardType="numeric"
          value={protein}
          onChangeText={setProtein}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
            <FontAwesome5  name="cheese" size={20} color="rgb(218, 61, 171)" />
        </View>
        <TextInput
          style={styles.inputField}
          placeholder="Fats (g)"
          keyboardType="numeric"
          value={fats}
          onChangeText={setFats}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
            <FontAwesome5 name="bread-slice" size={20} color="rgb(230, 178, 110)" />
        </View>
        <TextInput
          style={styles.inputField}
          placeholder="Carbs (g)"
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.icon}>
            <FontAwesome5  name="fire" size={20} color="rgb(255, 104, 4)" />
        </View>
        
        <TextInput
          style={styles.inputField}
          placeholder="Calories (kcal)"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveMeal}>
        <Text style={styles.saveButtonText}>Save Meal</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F8F8",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 0,
    borderWidth: 1,
    borderColor: "#DDD",
    marginTop: 10,
  },
  inputField: {
    flex: 1,
    marginLeft: 10,
    padding: 12,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    width: 30
  },
  saveButton: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SaveMacrosScreen;
