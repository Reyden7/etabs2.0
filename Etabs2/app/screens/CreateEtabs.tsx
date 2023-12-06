import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import SelectList from 'react-native-dropdown-select-list'
import RNPickerSelect from 'react-native-picker-select';
import {db} from '../../FirebaseConfig'
import {ref,set} from 'firebase/database'
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateEtabs = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [instrument, setInstrument] = useState('none');
  const [difficulty, setDifficulty] = useState('5');
  const [path, setPath] = useState('path')
  const [favoris, setFavoris] = useState(false)
  const [owner, setOwner] = useState('')
  const [userEmail, setUserEmail] = useState('');
  const instruments = [
    { label: 'Guitare', value: 'guitar' },
    { label: 'Basse', value: 'bass' },
    { label: 'Ukulele', value: 'ukulele' },
    { label: 'Chant', value: 'chant' },
  ];
    
  const difficultys = [
    { label: '1', value: 'green' },
    { label: '2', value: 'yellow' },
    { label: '3', value: 'orange' },
    { label: '4', value: 'red' },
    { label: '5', value: 'black' },
  ];
  const handleSubmit = () => {
    // Handle form submission, you can perform actions with the form data here
    
    
  };

  const LoadTab = () => {
    // Handle form submission, you can perform actions with the form data here
    console.log("ouverture de l'explorateur de fichier");
    console.log(userEmail);
  };

  function generateUniqueString() {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  
    const timestamp = new Date().getTime().toString(16);
  
    return `${uuid}-${timestamp}`;
  }

  useEffect(() => {
    // Récupérez l'e-mail depuis le stockage local au chargement du composant
    const getUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        setUserEmail(email); // Utilisez une chaîne vide si l'e-mail n'est pas trouvé
        console.log('Adresse e-mail de l\'utilisateur:', email);
      } catch (error) {
        console.log(error);
      }
    };

    getUserEmail();
  }, []);
 
  //add data to firebase
  const dataAddOn = () =>{
    const uniqueString = generateUniqueString()
    console.log('Form submitted:', { title, artist, instrument, difficulty, path, favoris, owner });
    set(ref(db,'tabs/' + uniqueString), {
        title: title,
        artist:artist,
        instrument:instrument,
        difficulty:difficulty,
        path:path,
        favoris:favoris,
        owner:userEmail
    });
    setTitle('')
    setArtist('')
    setInstrument('')
    setDifficulty('')
    setPath('')
    setFavoris(false)
    setOwner(userEmail)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Etabs</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Artist"
          value={artist}
          onChangeText={(text) => setArtist(text)}
        />

        <RNPickerSelect
        onValueChange={(value) => setInstrument(value)}
        items={instruments}
        placeholder={{ label: 'Select instrument', value: null }}
        />
        <RNPickerSelect
        onValueChange={(value) => setDifficulty(value)}
        items={difficultys}
        placeholder={{ label: 'Select Difficulty', value: null }}
        />
        <View style={styles.favoriteContainer}>
            <Text style={styles.favoriteLabel}>Favori:</Text>
            <Switch
            value={favoris}
            onValueChange={(value) => setFavoris(value)}
            />
        </View>
        <View style={{alignItems:"center"}}>
            <Pressable style={styles.ImportButton} onPress={LoadTab}>
                <Text>Importer</Text>
            </Pressable>
        </View>
        <Pressable style={styles.CreateButton} onPress={dataAddOn}>
          <Text>Créer ma Etabs !</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      favoriteLabel: {
        marginRight: 10,
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  CreateButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  ImportButton: {
    backgroundColor: '#7ABAFF',
    padding: 10,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'blue',
    marginBottom: 10,
  },
});

export default CreateEtabs;
