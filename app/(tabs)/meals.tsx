import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import modelService from '../services/modelSevice';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';
import { Link } from 'expo-router';


interface AllMacros {
  count: number;
  meals: Macros[];
}


const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Meals() {
  const [mealData, setMealData] = useState<AllMacros>({ count: 0, meals: [] });
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchMealMacros = async () => {
      try {
        const data = await modelService.getAllMealMacros();
        setMealData(data);
      } catch (error) {
        console.error("Error fetching meal macros:", error);
      }
    };

    fetchMealMacros();
  }, []);
  
    
    const filteredMeals = mealData.meals.filter(meal =>
      meal.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <View style={styles.container}>
        
        <View style={styles.buttonContent}>
        <Text style={styles.header}>Macro Gallery</Text>  
        {/* Add Meal Button - Routes to the save meal component */}
        <Link href="/save_macros" asChild>
              <Pressable style={styles.button}>
                <Entypo name="plus" size={24} color="white" />
                <Text style={styles.buttonText}>Add Meal Macros</Text>
              </Pressable>
            </Link>
        </View>
        
     
        {/* Search Bar with Icon Inside */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search Meals"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
        </View>

        <FlatList
          data={filteredMeals}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => <MealCard meal={item} />}
        />
      </View>
    );
}

const MealCard = ({ meal }: any) => (
  <View style={styles.card}>
    <View style={styles.details}>
    <Text style={styles.mealName}>{meal.Name ? capitalize(meal.Name) : ""}</Text>
      <Text style={styles.portion}>{meal.Calories} Calories</Text>
      <View style={styles.macrosContainer}>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Protein</Text>
          <Text style={styles.macroValue}>{meal.Protein}</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Carbs</Text>
          <Text style={styles.macroValue}>{meal.Carbs}</Text>
        </View>
        <View style={styles.macroBox}>
          <Text style={styles.macroLabel}>Fats</Text>
          <Text style={styles.macroValue}>{meal.Fat}</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContent: {
    width: '100%', 
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 8, 
    fontSize: 16,
    color: 'white',
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    fontSize: 30,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  portion: {
    color: "#6b7280",
  },
  macrosContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  macroBox: {
    flex: 1,
    backgroundColor: "#eef2ff",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    marginHorizontal: 3,
  },
  macroLabel: {
    fontSize: 12,
    color: "#374151",
  },
  macroValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  searchBar: {
    width : '100%',
    backgroundColor: "#fff",
    padding: 10,
    paddingLeft: 40, // Space for the icon
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row', // Keeps elements aligned in a row
    alignItems: 'center', // Aligns items properly

  },
  searchIcon: {
    position: 'absolute',
    left: 10,
  },
});
