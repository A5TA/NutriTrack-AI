import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MealItem } from "./MealItem";
import modelService from "../services/modelSevice";
import { useSettings } from "../context/SettingsContext";

export const MealsCard = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
    const {userId} = useSettings();
  

  useEffect(() => {
    const fetchTodaysMeals = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript months are 0-indexed
        const day = now.getDate();
        
        const dateOnly = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const response = await modelService.getAllMeals(dateOnly, "", userId); // endDate is empty for now since we only want today's meals

        if (response === null || response?.count === 0) {
          console.error("No meals found");
          return;
        }
        setMeals(response?.meals);
        console.log("Fetched meals:", response);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchTodaysMeals();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Meals</Text>
      <Text style={styles.header}>Breakfast</Text>
      {meals.some(meal => meal.MealType === 'Breakfast') ? (
        meals.filter(meal => meal.MealType === 'Breakfast').map((meal, index) => (
          <MealItem key={`breakfast-${index}`} meal={meal} />
        ))
      ) : (
        <Text style={styles.noMealText}>Meal not recorded</Text>
      )}
      <Text style={styles.header}>Lunch</Text>
      {meals.some(meal => meal.MealType === 'Lunch') ? (
      meals.filter(meal => meal.MealType === 'Lunch').map((meal, index) => (
          <MealItem key={`lunch-${index}`} meal={meal} />
        ))
      ) : (
        <Text style={styles.noMealText}>Meal not recorded</Text>
      )}
      <Text style={styles.header}>Dinner</Text>
      {meals.some(meal => meal.MealType === 'Dinner') ? (
      meals.filter(meal => meal.MealType === 'Dinner').map((meal, index) => (
          <MealItem key={`dinner-${index}`} meal={meal} />
        ))
      ) : (
        <Text style={styles.noMealText}>Meal not recorded</Text>
      )}
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
  noMealText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 10,
  }
});

