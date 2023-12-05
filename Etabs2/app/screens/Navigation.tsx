import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import CreateEtabs from './CreateEtabs';
import ChordsScreen from './ChordsScreen';
import Icon from 'react-native-ico-material-design';
import { View, Text,StatusBar ,StyleSheet, Pressable } from 'react-native';
import defaultExport from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();
const iconH = 26;
const iconW = 26;

const Navigation = () => {
  return(
    <View>
      <View>
        
      </View>
    </View>
  )
}

export default Navigation;