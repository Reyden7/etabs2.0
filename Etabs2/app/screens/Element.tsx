import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Importez les composants de react-native-paper
import { getDatabase, onValue, ref } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Element = () => {
  const [tododata, setTodoData] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const starCountRef = ref(db, 'tabs/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newUser = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      console.log(newUser);
      setTodoData(newUser);
    });
  }, []);

  useEffect(() => {
    // Récupérez l'e-mail depuis le stockage local au chargement du composant
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email || ''); // Utilisez une chaîne vide si l'e-mail n'est pas trouvé
        console.log('Adresse e-mail de l\'utilisateur:', email);
      } catch (error) {
        console.log(error);
      }
    };

    getUserEmail();
  }, []);
  const filteredData = tododata.filter((item) => item.owner === userEmail);
  const renderCards = () => {
    return filteredData.map((item, index) => (
      <Card key={index} style={styles.card}>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.subtitle}</Paragraph>
          <Paragraph>{item.instrument}</Paragraph>
          <Paragraph>{item.favoris}</Paragraph>
          <Paragraph>{item.dif}</Paragraph>
          
        </Card.Content>
      </Card>
    ));
  };

  return <View style={styles.container}>{renderCards()}</View>;
};

export default Element;
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
    },
    card: {
      height: '20%', // Hauteur de 10%
      width: '100%',  // Largeur de 100%
      justifyContent: 'center', // Centrer verticalement
      alignItems: 'center', // Centrer horizontalement
    },
  });
  