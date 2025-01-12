import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const MealItem = ({ mealName, description, calories }: {mealName: string, description: string, calories: string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}></View>
      <View>
        <Text style={styles.mealTitle}>{mealName}</Text>
        <Text>{description}</Text>
        <Text style={styles.caloriesText}>{calories} cal</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#ddd",
    borderRadius: 20,
    marginRight: 15,
  },
  mealTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  caloriesText: {
    fontWeight: "bold",
    color: "#333",
  },
});
