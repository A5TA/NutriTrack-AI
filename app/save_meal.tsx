import { router, Stack } from "expo-router";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, } from "react-native";
import modelService from "./services/modelSevice";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Picker } from "@react-native-picker/picker";

export default function SaveMealScreen() {
  const [predictedClass, setPredictedClass] = useState<string | null>(null);
  const [modifiedClass, setModifiedClass] = useState<string | null>(null);
  const [predictedUri, setPredictedUri] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [mealType, setMealType] = useState<string>("Breakfast");

  useEffect(() => {
    // Initialize predicted values from the service
    const fetchPredictions = async () => {
      try {
        const predictedClassFromService = await modelService.getPredictedClass();
        const predictedUriFromService = await modelService.getPredictedUri();
        if (predictedClassFromService != null) {
            const readableClass = predictedClassFromService.replace("_", " ");
            setPredictedClass(readableClass); //make it readable
            setModifiedClass(readableClass);
        }else {
            setPredictedClass("");
            setModifiedClass("");
        }
        
        setPredictedUri(predictedUriFromService);
      } catch (error) {
        console.error("Error fetching predictions: ", error);
      }
    };

    fetchPredictions();
  }, []);

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

    try {
      const uploadResult = await modelService.storePredictionImage(predictedUri, modifiedClass, mealType);
      console.log("Store results: ", uploadResult);
      setErrorMessage(null); // Clear any previous error messages
      router.push("/");// Navigate only after successful submission
    } catch (error) {
      console.error("Error storing prediction image: ", error);
      setErrorMessage("Failed to save the meal. Please try again.");
    }
  };

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
        <Text style={styles.predictionText}>{predictedClass || "Loading..."}</Text>
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
  });