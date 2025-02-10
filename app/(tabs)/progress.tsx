import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { Calendar } from "react-native-calendars";

const mealPlan: Record<string, string[]> = {
  "2025-02-01": ["Breakfast: Oatmeal", "Lunch: Grilled Chicken", "Dinner: Salmon"],
  "2025-02-02": ["Breakfast: Pancakes", "Lunch: Salad", "Dinner: Pasta"],
  "2025-02-03": ["Breakfast: Smoothie", "Lunch: Sushi", "Dinner: Steak"],
};


const Progress = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

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
        {selectedDate in mealPlan ? (
          mealPlan[selectedDate].map((meal, index) => (
            <Text key={index} style={styles.mealText}>{meal}</Text>
          ))
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
  },
  mealText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noMealText: {
    fontSize: 16,
    color: "#777",
  },
});

export default Progress;
