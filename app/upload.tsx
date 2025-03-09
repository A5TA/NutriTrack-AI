import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import modelService from './services/modelSevice';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo'; 

const UploadScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected", "Please select an image to upload.");
      return;
    }
    
    setLoading(true); // Set loading state

    const predictionResult = await modelService.predictImage(image);
    if (!predictionResult || !predictionResult.data) {
      console.log("Prediction result or data is undefined");
      setLoading(false); // Reset loading state
      return;
    }

    const predictedClassName = predictionResult.data.predicted_class;
    const predictedConfidence = predictionResult.data.confidence;
    console.log("Predicted as: ", predictionResult);
    modelService.updatePredictedClass(predictedClassName); // Store the predicted class in the service
    modelService.updatePredictedConfidence(predictedConfidence); // Store the confidence percentage in the service
    router.push("/save_meal"); // Navigate only after predictions are stored

    setLoading(false); // Reset loading state
  };

  const removeImage = () => {
    setImage(null); // Reset image to null so the image disappears
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Image</Text>
      
      {/* Image Preview */}
      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.removeIconContainer} onPress={removeImage}>
            <Entypo name="circle-with-cross" size={30} color="red" />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.placeholder}>No image selected</Text>
      )}

      {/* Pick Image Button */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>{image ? "Pick a different Image" : "Pick an Image"}</Text>
      </TouchableOpacity>

      {/* Upload Button with Loading Indicator */}
      <TouchableOpacity 
        style={[styles.button, !image && styles.disabledButton]} 
        onPress={uploadImage} 
        disabled={!image || loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Make Prediction</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  placeholder: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 20,
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "rgb(163, 163, 163)",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default UploadScreen;
