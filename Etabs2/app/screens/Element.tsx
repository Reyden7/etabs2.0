import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper'; // Importez les composants de react-native-paper
import { getDatabase, onValue, ref } from 'firebase/database';
import { db } from '../../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import Details from './Details';
import { StackNavigationProp } from '@react-navigation/stack';


// Define the StackParamList with the Details screen
type StackParamList = {
    Details: { itemId: string };
    // Add other screens if necessary
  };
  
  // Define the navigation prop type
  type DetailsScreenNavigationProp = StackNavigationProp<StackParamList, 'Details'>;
  
  // Define the route prop type
  type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;
  

const Element = () => {
  const [tododata, setTodoData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation<DetailsScreenNavigationProp>();

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

  const handleCardPress = (itemId) => {
    // Navigate to the details page with the item ID
    navigation.navigate('Details', { itemId });
  };

  const filteredData = tododata.filter((item) => item.owner === userEmail);
  const renderCards = () => {

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
          case 1:
            return 'green';
          case 2:
            return 'yellow';
          case 3:
            return 'orange';
          case 4:
            return 'red';
          case 5:
            return 'black';
          default:
            return 'white'; // default color
        }
      };

      const instrumentImages = {
        1: require('../img/guitare.png'),
        2: require('../img/basse.png'),
        3: require('../img/ukulele.png'),
        4: require('../img/micro.png'),
      };

      const getInstrument = (instru) => {
        return instrumentImages[instru] || require('../img/guitare.png'); // Replace 'default.png' with a default image path
      };

    return filteredData.map((item, index) => (
        
      <Card key={index} style={styles.card}>
        <TouchableOpacity 
        key={index}
        onPress={() => handleCardPress(item.id)} // Pass the item ID to the handler
      >
      <Card.Content >
        <Title style={{ textAlign: 'center' }}>{item.title}</Title>
        <Paragraph style={{ textAlign: 'center' }}>{item.subtitle}</Paragraph>
        <Paragraph style={{ textAlign: 'center' }}>{item.favoris}</Paragraph>
        <View style={{ position: 'absolute', top: 20, left: -50 }}>
            <Image style={{width: 40, height: 40, resizeMode:'contain' }} source={getInstrument(item.instrument)}  />
        </View>
        <Paragraph style={{ position: 'absolute', top: 40, right: -40 }}>
          <View style={[styles.point, { backgroundColor: getDifficultyColor(item.dif) }]} />
        </Paragraph>
        
      </Card.Content>
      </TouchableOpacity>
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
      height: '15%', // Hauteur de 10%
      width: '100%',  // Largeur de 100%
      justifyContent: 'center', // Centrer verticalement
      alignItems: 'center', // Centrer horizontalement
      borderRadius:10,
      marginBottom:5,
    },
    point: {
        width: 10,
        height: 10,
        borderRadius: 5,
      },
    
    
  });
  