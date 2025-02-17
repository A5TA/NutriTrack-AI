import { router, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, } from "react-native";
import modelService from "./services/modelSevice";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from "@react-native-picker/picker";

const getMatchBackgroundColor = (confidence: number) => {
  if (confidence >= 0.8) return "#4CAF50"; // Green for high confidence (80%+)
  if (confidence >= 0.5) return "#FFBF00"; // Yellow for medium confidence (50%+)
  return "#FF0000"; // Red for low confidence (<50%)
};

export default function SaveMealScreen() {
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [predictedConfidence, setPredictedConfidence] = useState<number | null>(null);
  const [modifiedClass, setModifiedClass] = useState<string | null>(null);
  const [predictedUri, setPredictedUri] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mealMacros, setMealMacros] = useState<any | null>(null);

  const [mealType, setMealType] = useState<string>("Breakfast");
  const [matchBackgroundColor, setMatchBackgroundColor] = useState<string>("#f1f399");
  useEffect(() => {
    // Initialize predicted values from the service
    const fetchPredictions = async () => {
      try {
        const predictedClassFromService = await modelService.getPredictedClass();
        const predictedUriFromService = await modelService.getPredictedUri();
        const predictedConfidenceFromService = await modelService.getPredictedConfidence();
        if (predictedClassFromService != null) {
            const readableClass = predictedClassFromService.replace("_", " ");
            setPredictedClass(readableClass); //make it readable
            setModifiedClass(readableClass);
        }else {
            setPredictedClass("");
            setModifiedClass("");
        }
        
        setPredictedUri(predictedUriFromService);
        setPredictedConfidence(predictedConfidenceFromService);

        //Get the color for mathc
        if (predictedConfidenceFromService != null) {
          const matchBgColor = getMatchBackgroundColor(predictedConfidenceFromService);
           setMatchBackgroundColor(matchBgColor);
        }
      
      } catch (error) {
        console.error("Error fetching predictions: ", error);
      }
    };

    fetchPredictions();
  }, []);

  //Get all the currently stored macros so the user doesn't store an item that has no macros
  const handleGetAllUseableMacros = async () => {
    try {
      const allMealMacros = await modelService.getAllMealMacros();
      console.log("Meal Macros: ", mealMacros);
      const mealNamesSet = new Set<string>(); // Use a set to avoid duplicates and so that lookup is easier
      allMealMacros.meals.forEach((macro: Macros) => {
        mealNamesSet.add(macro.Name); //we only need the names to determin if the meal is already stored
      });
      return mealNamesSet;
    } catch (error) {
      console.error("Error fetching meal macros: ", error);
    }
  }

  const handleInputChange = (text: string) => {
    setModifiedClass(text);
    setErrorMessage(null); // Clear error message on input change
  };

  const handleSubmit = async () => {
    if (!modifiedClass && !predictedUri) {
      setErrorMessage("Both the predicted class and URI are required to save the meal.");
      return;
    } else if (!modifiedClass) {
        setErrorMessage("The predicted class name is required to save the meal.");
        return;
    } else if (!predictedUri) {
        setErrorMessage("The predicted class image wasn't loaded, meal cannot be saved.");
        return;
    }

    const lowerModifiedClass = modifiedClass.toLocaleLowerCase(); // Convert to lowercase for easier comparison ex: Pizza === PiZZa === pizza
    const mealNamesSet = await handleGetAllUseableMacros();
    if (!mealNamesSet || !mealNamesSet.has(lowerModifiedClass)) {
      setErrorMessage(`The macros for ${modifiedClass} are not available.`);
      return;
    }

    try {
      const uploadResult = await modelService.storePredictionImage(predictedUri, lowerModifiedClass, mealType);
      console.log("Store results: ", uploadResult);
      setErrorMessage(null); // Clear any previous error messages
      router.push("/");// Navigate only after successful submission
    } catch (error) {
      console.error("Error storing prediction image: ", error);
      setErrorMessage("Failed to save the meal. Please try again.");
    }
  };

  const handleGetMacros = async () => {
    try {
      const mealMacros = await modelService.getMealMacros(modifiedClass);
      console.log("Meal Macros: ", mealMacros);
      setMealMacros(mealMacros);
    } catch (error) {
      console.error("Error fetching meal macros: ", error);
    }
  }

  const handleCancel = () => {
    router.push("/");
  }

  return (
    <>
      <Stack.Screen options={{ title: "Confirm the Photo Uploaded" }} />
      <View style={styles.container}>
      {/* Food Image Preview */}
      <View style={styles.imagePreview}>
        {predictedUri ? (
          <Image source={{ uri: predictedUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Food Image Preview</Text>
        )}
      </View>

      {/* AI Prediction */}
      <Text style={styles.predictionLabel}>AI Prediction</Text>
      <View style={styles.predictionBox}>
        <FontAwesome6 name="wand-magic-sparkles" size={14} color="black" />
        {predictedClass != null ? 
        <View style={styles.predictionContent}>
          <Text style={styles.predictionText}>{predictedClass}</Text>
          <View style={[styles.matchContainer, { backgroundColor: matchBackgroundColor }]}>
            <Text style={styles.confidenceText}>{predictedConfidence != null ? `${(predictedConfidence * 100).toFixed(0)}% Match` : "N/A"}</Text>
          </View>
        </View>
        :
        <Text style={styles.predictionText}>Loading...</Text>
        }
      </View>

      {/* Edit Food Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Edit Food Name</Text>
        <TextInput
          style={styles.input}
          value={modifiedClass || ""}
          onChangeText={handleInputChange}
        />
      </View>


       {/* Dropdown for Meal Type */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Meal Type</Text>
        <Picker
          selectedValue={mealType}
          onValueChange={(itemValue) => setMealType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
        </Picker>
      </View>
      {/* Get the meals Macros */}
      <TouchableOpacity onPress={handleGetMacros} style={styles.macroButton}>
        <Text style={styles.saveButtonText}>Update Macros</Text>
      </TouchableOpacity>
      {/* Macros Card */}
      {mealMacros && (
        <View style={styles.macroCard}>
          <Text style={styles.label}>Estimated Macros</Text>
          <View style={styles.macroItems}>
        <View style={styles.macroRow}>
          <Text style={styles.macroValue}>{mealMacros?.Calories}</Text>
          <Text style={styles.macroLabel}>Calories</Text>
        </View>
        <View style={styles.macroRow}>
          <Text style={styles.macroValue}>{mealMacros?.Protein}g</Text>
          <Text style={styles.macroLabel}>Protein</Text>
        </View>
        <View style={styles.macroRow}>
          <Text style={styles.macroValue}>{mealMacros?.Fat}g</Text>
          <Text style={styles.macroLabel}>Fat</Text>
        </View>
        <View style={styles.macroRow}>
          <Text style={styles.macroValue}>{mealMacros?.Carbs}g</Text>
          <Text style={styles.macroLabel}>Carbs</Text>
        </View>
          </View>
        </View>
      )}
   

      {/* Error Message */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Save Button */}
      <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Meal</Text>
      </TouchableOpacity>

      {/* Cancel Button */}
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <Text style={styles.saveButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8f9fa",
    },
    imagePreview: {
      width: "100%",
      height: 200,
      backgroundColor: "#e9ecef",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      marginBottom: 20,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 10,
    },
    imagePlaceholder: {
      color: "#6c757d",
      fontSize: 16,
    },
    predictionBox: {
      backgroundColor: "#f1f3f5",
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      gap: 10,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
    },
    predictionLabel: {
      fontSize: 14,
      color: "#6c757d",
      marginBottom: 5,
    },
    predictionText: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#212529",
      flexWrap: "wrap", 
      flexShrink: 1, 
      maxWidth: "60%", 
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: "#6c757d",
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: "#ced4da",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: "#ffffff",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginBottom: 20,
      textAlign: "center",
    },
    saveButton: {
      backgroundColor: "#1a73e8",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#D2042D",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        opacity: 0.85,
        top: 10
    },
    saveButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ced4da",
        backgroundColor: "#ffffff",
      },
    macroCard: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    macroItems: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    macroLabel: {
        fontSize: 15,
        color: "black",
    },
    macroRow: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    macroValue: {
      fontSize: 20,
      color: "#212529",
    },
    macroButton: {
      backgroundColor: "#1a73ee",
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: "center",
      opacity: 0.85,
      marginBottom: 20,
    },
    predictionContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      flexWrap: "wrap", // Allows content to wrap when needed
    },
    matchContainer: {
      backgroundColor: "#f1f399",
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: "center",
      padding: 5,
      borderRadius: 5,
      marginRight: 20,
      height: 30,
    },
    confidenceText: {
      fontSize: 14,
      fontWeight: "600",
      color: "white",
    }
  });