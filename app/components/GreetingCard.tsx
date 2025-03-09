import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import md5 from 'md5';
type GreetingCardProps = {
    userId: string | null;
  };
  

export default function GreetingCard({ userId }: GreetingCardProps) {
    const getUserColor = (id: string | null) => {
        if (!id) return '#666'; // Default color for guests
        const hash = md5(id); // Hash the userId
        return `#${hash.substring(0, 6)}`; // Extract first 6 characters for a hex color
      };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Welcome Home, ${userId || 'Guest'}!`}
        subtitle="Your personalized AI nutrition tracker"
        left={(props) => (
            <Avatar.Text
              {...props}
              label={userId ? userId.slice(0, 2).toUpperCase() : 'G'}
              color="white"
              style={{ backgroundColor: getUserColor(userId) }} // Assigns random background color
            />
          )} 
        />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    elevation: 4, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
