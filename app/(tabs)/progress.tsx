import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import modelService from "../services/modelSevice";
import { useSettings } from "../context/SettingsContext";

interface DailyMealInfo {
  breakfast: string[],
  lunch: string[],
  dinner: string[],
  totalMacros: TotalMacros
}

interface TotalMacros {
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
}
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const getTodayEST = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for local timezone
  return now.toISOString().split("T")[0];
};

const Progress = () => {
  // Get today's date in YYYY-MM-DD format
  const [selectedDate, setSelectedDate] = useState<string>(getTodayEST());
  const [mealPlan, setMealPlan] = useState<Record<string, DailyMealInfo>>({});
  const {userId} = useSettings();

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript months are 0-indexed
        const day = now.getDate();
        
        const date = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const startDate = `${year-1}-${date}`;
        const endDate = `${year}-${date}`;
        const response = await modelService.getAllMeals(startDate, endDate, userId); // endDate is empty for now since we only want today's meals

        if (response === null || response?.count === 0) {
          console.error("No meals found");
          return;
        }

        const meals: Meal[] = response?.meals

        const formattedMeals: Record<string, DailyMealInfo> = {};

        meals.forEach((meal) => {
          const mealDate = new Date(meal.Date).toISOString().split("T")[0]; // Extract YYYY-MM-DD
          if (!formattedMeals[mealDate]) {
            formattedMeals[mealDate] = {
              breakfast: [],
              lunch: [],
              dinner: [],
              totalMacros: { Calories: 0, Protein: 0, Carbs: 0, Fat: 0 },
            };
          }

          // Add meal to correct category
          if (meal.MealType === "Breakfast") {
            formattedMeals[mealDate].breakfast.push(capitalize(meal.Name));
          } else if (meal.MealType === "Lunch") {
            formattedMeals[mealDate].lunch.push(capitalize(meal.Name));
          } else if (meal.MealType === "Dinner") {
            formattedMeals[mealDate].dinner.push(capitalize(meal.Name));
          }

          // Sum up macros and round to 2 decimal places
          formattedMeals[mealDate].totalMacros.Calories = parseFloat(
            (formattedMeals[mealDate].totalMacros.Calories + meal.Macros.Calories).toFixed(2)
          );
          formattedMeals[mealDate].totalMacros.Protein = parseFloat(
            (formattedMeals[mealDate].totalMacros.Protein + meal.Macros.Protein).toFixed(2)
          );
          formattedMeals[mealDate].totalMacros.Carbs = parseFloat(
            (formattedMeals[mealDate].totalMacros.Carbs + meal.Macros.Carbs).toFixed(2)
          );
          formattedMeals[mealDate].totalMacros.Fat = parseFloat(
            (formattedMeals[mealDate].totalMacros.Fat + meal.Macros.Fat).toFixed(2)
          );
        });
        
        setMealPlan(formattedMeals);
        console.log("Formatted Meals:", formattedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchAllMeals();
  }, []);

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#4CAF50" },
        }}
        theme={{
          selectedDayBackgroundColor: "#4CAF50",
          todayTextColor: "#FF5722",
          arrowColor: "#000",
        }}
      />

      <Card style={styles.mealCard}>
        <Text style={styles.mealHeader}>Meals for {selectedDate || "Select a date"}</Text>
        {selectedDate && mealPlan[selectedDate] ? (
          <>
            <Text style={styles.mealText}>🍳 Breakfast: {mealPlan[selectedDate].breakfast.join(", ") || "None"}</Text>
            <Text style={styles.mealText}>🥗 Lunch: {mealPlan[selectedDate].lunch.join(", ") || "None"}</Text>
            <Text style={styles.mealText}>🍽️ Dinner: {mealPlan[selectedDate].dinner.join(", ") || "None"}</Text>
            <Text style={styles.macroText}>
              🔥 Total Macros That Day🔥         
            </Text>
            <View style={styles.macrosContainer}>
                <View style={styles.macroBox}>
                  <Text style={styles.macroLabel}>Calories</Text>
                  <Text style={styles.macroValue}>{mealPlan[selectedDate].totalMacros.Calories}</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={styles.macroLabel}>Protein</Text>
                  <Text style={styles.macroValue}>{mealPlan[selectedDate].totalMacros.Protein}g</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={styles.macroLabel}>Carbs</Text>
                  <Text style={styles.macroValue}>{mealPlan[selectedDate].totalMacros.Carbs}g</Text>
                </View>
                <View style={styles.macroBox}>
                  <Text style={styles.macroLabel}>Fats</Text>
                  <Text style={styles.macroValue}>{mealPlan[selectedDate].totalMacros.Fat}g</Text>
                </View>
              </View>  
          </>
        ) : (
          <Text style={styles.noMealText}>No meals recorded yet.</Text>
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mealCard: {
    marginTop: 20,
    padding: 12,
  },
  mealHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
  },
  mealText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noMealText: {
    fontSize: 16,
    color: "#777",
  },
  macroText: {
    justifyContent: "center",
    display: "flex",
    fontWeight: "500",
    fontSize: 15,
  },
  macrosContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  macroBox: {
    flex: 1,
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 3,
  },
  macroLabel: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Progress;
