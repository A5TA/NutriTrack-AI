import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MealItem } from "./MealItem";

export const MealsCard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Meals</Text>
      <MealItem mealName="Breakfast" description="Oatmeal with berries" calories="320" />
      <MealItem mealName="Lunch" description="Grilled chicken salad" calories="450" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
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
});

