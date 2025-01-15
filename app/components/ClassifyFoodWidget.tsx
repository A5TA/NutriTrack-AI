import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

export const ClassifyFoodWidget = ({
    predictedClass
}: {
    predictedClass : string | null
}) => {
  const [inputValue, setInputValue] = useState(predictedClass ? predictedClass : "");

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    console.log("Submitted text:", inputValue);
    setInputValue(""); // Clear input after submission
  };

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.label}>Modify Predicted Class:</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight:"bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});