import { View, Text, Button, Pressable } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig';
import Details from './Details';

interface RouterProps{
    navigation:NavigationProp<any,any>;
}

const List = ({navigation}:RouterProps) => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems:"center"}}>
     <Pressable onPress={() => navigation.navigate('Details')}><Text>Details</Text></Pressable>
     <Pressable onPress={() => FIREBASE_AUTH.signOut()}><Text>Logout</Text></Pressable>
    </View>
  )
}

export default List