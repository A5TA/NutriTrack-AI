import { Text, View, StyleSheet, Button, ViewStyle, TextStyle, ScrollView } from 'react-native';
//  import { Link } from 'expo-router'; 
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CustomButton } from '../components/CustomButton';
import { SummaryCard } from '../components/SummaryCard';
import { MealsCard } from '../components/MealsCard';
import { useSettings } from '../context/SettingsContext';
import GreetingCard from '../components/GreetingCard';

export default function Index() {
  const {userId} = useSettings();
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <ScrollView 
          style={styles.widgets}
          contentContainerStyle={styles.widgetsContent}
        >      
          <GreetingCard userId={userId} />
          <SummaryCard />
          <MealsCard />
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContent}>
          <CustomButton href="/upload">
          <FontAwesome name="picture-o" size={24} color="black" />
            <Text style={styles.buttonText}>Upload meal</Text>
          </CustomButton>
        </View>
        <View style={styles.buttonContent}>
          <CustomButton href="/camera">
            <Entypo name="camera" size={24} color="black" />
            <Text style={styles.buttonText}>Snap your meal</Text>
          </CustomButton>
        </View>
        </View>
        
      </View>
    </View>
  );
}

type Style = {
  widgetsContent: ViewStyle;
  widgets: ViewStyle;
  mainContent: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  buttonContent: ViewStyle; 
  buttonsContainer: ViewStyle;
  buttonText: TextStyle; 
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  title: {
    fontSize: 18, 
    fontWeight: '700',
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 20, 
    letterSpacing: 1.6, 
   },
  buttonText: {
    marginLeft: 8, 
    fontSize: 16,
    color: 'black',
  },
  mainContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    margin: 20,
  },
  widgets: {
    width: '100%',
  },
  buttonContent: {
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10,
  },
  widgetsContent: {
    paddingBottom: 20,
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  }
});
