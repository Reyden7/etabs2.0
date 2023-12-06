
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState,useEffect } from 'react';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Details from './app/screens/Details';
import ChordsScreen from './app/screens/ChordsScreen';
import CreateEtabs from './app/screens/CreateEtabs';
import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native'
import Icon from 'react-native-ico-material-design';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InsideLayout()
{
  return (
    <Tab.Navigator
      tabBarOptions={styles.tabBar}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-button" color='#3398D6' size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEtabs"
        component={CreateEtabs}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-plus-button" color='#3398D6' backgroundColor="#0000" height="30" width= "30" style={{marginTop: 10}}/>
          ),
        }}
      />
      <Tab.Screen
        name="Chord"
        component={ChordsScreen}
        options={{
          tabBarLabel: 'Accords',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bookmark-outline" color='#3398D6' size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) =>{
      console.log('user',user);
      setUser(user);
    });
  },[]);
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: false }}
            
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    activeTintColor: '#3498db',
    inactiveTintColor: 'gray',
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    style: {
      backgroundColor: '#2c3e50',
      height: 60,
    },
  },
});