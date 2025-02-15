import { Text, View, StyleSheet, Button, ViewStyle, TextStyle, ScrollView } from 'react-native';
//  import { Link } from 'expo-router'; 
import Entypo from '@expo/vector-icons/Entypo';
import { CustomButton } from '../components/CustomButton';
import { SummaryCard } from '../components/SummaryCard';
import { MealsCard } from '../components/MealsCard';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Welcome to NutriTrack AI</Text>
        <ScrollView 
          style={styles.widgets}
          contentContainerStyle={styles.widgetsContent}
        >
          <SummaryCard />
          <MealsCard />
        </ScrollView>
        <View style={styles.buttonContent}>
          <CustomButton href="/camera">
            <Entypo name="camera" size={24} color="black" />
            <Text style={styles.buttonText}>Snap your meal</Text>
          </CustomButton>
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
  buttonText: TextStyle; 
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  title: {
    fontSize: 22, 
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
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop: 10,
  },
  widgetsContent: {
    paddingBottom: 20,
  },
});
