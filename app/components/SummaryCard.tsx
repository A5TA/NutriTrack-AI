import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from 'react-native-circular-progress-indicator';
import modelService from "../services/modelSevice";


interface DailyMacros {
  Calories: number;
  Protein: number;
  Carbs: number;
  Fat: number;
}

export const SummaryCard = () => {
  const [macroGoal, setMacroGoal] = useState<DailyMacros>({
    Calories: 2000,
    Protein: 100,
    Carbs: 50,
    Fat: 30
  });
  const [totalMacros, setTotalMacros] = useState<DailyMacros>({
    Calories: 0,
    Protein: 0,
    Carbs: 0,
    Fat: 0,
  });

  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const fetchTodaysMacros = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // JavaScript months are 0-indexed
        const day = now.getDate();

        const dateOnly = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const response = await modelService.getAllMeals(dateOnly, ""); // Fetch today's meals

        if (!response || response.count === 0) {
          console.error("No meals found");
          return;
        }

        // Accumulate total macros
        const accumulatedMacros: DailyMacros = response.meals.reduce(
          (acc: DailyMacros, meal: Meal) => ({
            Calories: acc.Calories + meal.Macros.Calories,
            Protein: acc.Protein + meal.Macros.Protein,
            Carbs: acc.Carbs + meal.Macros.Carbs,
            Fat: acc.Fat + meal.Macros.Fat,
          }),
          { Calories: 0, Protein: 0, Carbs: 0, Fat: 0 }
        );

        setProgress(Math.min(100, Math.max(0, Math.round((accumulatedMacros.Calories / macroGoal.Calories) * 100))));

        setTotalMacros(accumulatedMacros);
        console.log("Fetched meals:", response);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchTodaysMacros();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Summary</Text>
      <View style={styles.content}>
      <CircularProgress
        value={progress}
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
          <Text style={styles.macroValue}>{totalMacros.Calories} / {macroGoal.Calories}</Text>
          <Text>Protein: {totalMacros.Protein}g / {macroGoal.Protein}g</Text>
          <Text>Carbs: {totalMacros.Carbs}g / {macroGoal.Carbs}g</Text>
          <Text>Fat: {totalMacros.Fat}g / {macroGoal.Fat}g</Text>
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
