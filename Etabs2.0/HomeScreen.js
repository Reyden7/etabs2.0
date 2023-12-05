import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';



const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await database().ref('/Users').once('value');
      setData(snapshot.val());
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur la page d'accueil !</Text>
      <Button
        title="Déconnexion"
        onPress={() => navigation.navigate('Login')}
        color="#40A8FF"
      />

      <View>
        <Text>Data from Firebase: {data}</Text>
        <Button
          title="Update Firebase Data"
          onPress={() => database().ref('/Users').set('New Data')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;