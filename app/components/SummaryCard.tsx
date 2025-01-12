import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';

export const SummaryCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Summary</Text>
      <View style={styles.content}>
      <CircularProgress
        value={60}
        valueSuffix="%"
        radius={40} // Adjust size
        valueSuffixStyle={styles.suffixStyle}
        activeStrokeWidth={12}
        inActiveStrokeWidth={12}
        activeStrokeColor="#4caf50"
        inActiveStrokeColor="#e0e0e0"
        progressValueColor="black"
        />
        <View style={styles.macroInfo}>
          <Text style={styles.caloriesText}>Calories</Text>
          <Text style={styles.macroValue}>1,200 / 2,000</Text>
          <Text>Protein: 60g / 100g</Text>
          <Text>Carbs: 150g / 250g</Text>
          <Text>Fat: 40g / 65g</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  macroInfo: {
    marginLeft: 20,
  },
  caloriesText: {
    fontWeight: "bold",
    color: "#333",
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  suffixStyle: {
    left: -115,
    fontSize: 18,
    fontWeight: "bold" 
  },
});
