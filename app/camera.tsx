import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import modelService from './services/modelSevice';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null); 
  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  useEffect(() => {
    // If permission is granted the we can actually use the camera
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Function to handle switch between front and back camera
  const toggleCameraFacing =() => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // Function to capture a picture
  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
      // Handle the captured photo (e.g., display or store it)

      setPhoto(photoData)
      
      const predictionResult = await modelService.predictImage(photoData.uri);
      if (!predictionResult || !predictionResult.data) {
        console.log("Prediction result or data is undefined");
        return;
      }
    
      const predictedClassName = predictionResult.data.predicted_class;
      const predictedConfidence = predictionResult.data.confidence;
      console.log("Predicted as: ", predictionResult);
      modelService.updatePredictedClass(predictedClassName); //store the predicted class in the service
      modelService.updatePredictedConfidence(predictedConfidence); //Store the confidence percentage in the service
      router.push("/save_meal");// Navigate only after predictions are stored
    }
  };

  // Permissions handling
  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
        <View style={styles.buttonContainer}>
          {/* Flip Camera Button */}
          <TouchableOpacity
            style={styles.flipButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>

          {/* Take Photo Button */}
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <Text style={styles.captureButtonText}>Snap Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    camera: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 50,
      width: '100%',
    },
    flipButton: {
      position: 'absolute',
      top: 30,
      right: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 25,
      padding: 10,
      zIndex: 1,
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50, // Add some space at the bottom for better UI
    },
    captureButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    permissionButton: {
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
    },
  });