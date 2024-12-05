import { Text, View, StyleSheet, Button } from 'react-native';
//  import { Link } from 'expo-router'; 
import Entypo from '@expo/vector-icons/Entypo';
import { CustomButton } from '../components/CustomButton';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to NutriTrack AI</Text>
  
      <CustomButton href="/camera">
        <>
          <Entypo name="camera" size={24} color="black" />
          <Text style={styles.buttonText}>Snap your meal</Text>
        </>
      </CustomButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  buttonText: {
    marginLeft: 8, // Adds spacing between the icon and the text
    fontSize: 16,
    color: 'black',
},
});
