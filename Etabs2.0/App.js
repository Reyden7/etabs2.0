import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import database from '@react-native-firebase/database';


export default function App() {
  const Stack = createStackNavigator();

  // Initialisation de Firebase lors du démarrage de l'application
  useEffect(() => {
    // Ajoutez ici votre configuration Firebase
    // Par exemple, vous pouvez utiliser firebase.initializeApp(config);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Ajoutez d'autres écrans ici, par exemple, la page d'accueil */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}




