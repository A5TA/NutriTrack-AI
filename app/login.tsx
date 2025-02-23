import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSettings } from './context/SettingsContext';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const LoginScreen = () => {
  const { setUserId } = useSettings();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock authentication (Replace with actual auth logic)
    if (name && password) {
      setUserId(name); // Simulate authentication by setting userId
      router.replace("/(tabs)"); // Navigate to 'index' after login

    }
  };

  return (
    <View style={styles.container}>
      <FontAwesome5 name="leaf" size={28} color="black" />
      <Text style={styles.title}>NutriTrack AI</Text>
      <Text style={styles.subtitle}>Your personal AI Macro Tracker</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or continue with</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="apple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => router.replace('/signup')}>
            Sign up
        </Text>
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
