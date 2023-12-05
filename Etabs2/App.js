
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useState,useEffect } from 'react';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import {User, onAuthStateChanged} from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout()
{
  return (
      <InsideStack.Navigator>
        <InsideStack.Screen name="My Etabs" component={List}/>
        <InsideStack.Screen name="Details" component={Details}/>
      </InsideStack.Navigator> 
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
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown : false }}/>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{headerShown : false }}/>
        ) }
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

