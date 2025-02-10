import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Card, HelperText } from "react-native-paper";

const SettingsScreen = () => {
  const [calories, setCalories] = useState("2000");
  const [protein, setProtein] = useState("150");
  const [carbs, setCarbs] = useState("200");
  const [fat, setFat] = useState("65");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.label}>Daily Calorie Goal</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <Text style={styles.unit}>kcal</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Protein Goal</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={protein}
            onChangeText={setProtein}
          />
          <Text style={styles.unit}>g</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Carbohydrates Goal</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={carbs}
            onChangeText={setCarbs}
          />
          <Text style={styles.unit}>g</Text>
        </View>
      </Card>

      <Card style={styles.card}>
        <Text style={styles.label}>Fat Goal</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={fat}
            onChangeText={setFat}
          />
          <Text style={styles.unit}>g</Text>
        </View>
      </Card>

      
      {/* Info Card with Icon */}
      <Card style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="information-circle" size={24} color="gray" style={styles.infoIcon} />
          <HelperText type="info" style={styles.infoText}>
            These goals will be used to track your daily nutrition progress. Adjust them according to your dietary needs and fitness goals.
          </HelperText>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 12,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
  },
  unit: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
    marginLeft: 6,
  },
  infoCard: {
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
  },
  infoText: {
    flex: 1,
  },
});

export default SettingsScreen;

