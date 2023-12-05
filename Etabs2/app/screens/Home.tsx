import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig';
import Details from './Details';
import Navigation from './Navigation';
import Element from './Element';

interface RouterProps{
    navigation:NavigationProp<any,any>;
}

const user = FIREBASE_AUTH.currentUser;

const List = ({navigation}:RouterProps) => {
  return (
    <View style={styles.container} >
        
     {//<Pressable onPress={() => navigation.navigate('Details')}><Text>Details</Text></Pressable>
     <Pressable onPress={() => FIREBASE_AUTH.signOut()}><Text>Logout</Text></Pressable>
      }
      <Element  />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container:{
      flex:1,
        backgroundColor:"#777777",
    }
    
})
