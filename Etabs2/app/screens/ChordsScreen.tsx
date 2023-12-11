import { View, Text, ScrollView, StyleSheet, Image  } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Title } from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import * as FileSystem from 'expo-file-system';



const ChordsScreen = () => {
  const [instrument, setInstrument] = useState('');
  const [chordsType, setChordsType] = useState('');
  const [imagePaths, setImagePaths] = useState([]);

  const image1 = {uri:'../img/Guitare/Majeurs/a.jpg'};
 
  useEffect(() => {
    const loadImagesFromDirectory = async () => {
      try {
        if (instrument && chordsType) {
           
          const folderPath = `img/${instrument}/${chordsType}/`;
          const files = await readDirectory(folderPath);
          
          const images = files.map((file) => {
            return {
              uri: `/app/${folderPath}${file}`,
            };
          });

          setImagePaths(images);
        }
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImagesFromDirectory();
  }, [instrument, chordsType]);

  const readDirectory = async (folderPath) => {
    try {
      const files = await FileSystem.readDirectoryAsync(`../${folderPath}`);
      return files.filter((file) => file.endsWith('.jpg'));
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  };

  const handleFilterInstrument = (selectedInstrument) => {
    setInstrument(selectedInstrument);
    // Réinitialiser le type d'accord lorsque l'instrument change
    setChordsType('');
  };

  const handleFilterChordsType = (selectedChordsType) => {
    setChordsType(selectedChordsType);
  };

  const getChordsTypeOptions = () => {
    switch (instrument) {
      case 'Guitare':
        return [
          { label: 'Accords Majeurs', value: 'Majeurs' },
          { label: 'Accords Mineurs', value: 'Mineurs' },
          { label: 'Accords Septièmes majeurs', value: 'Majeurs7' },
          { label: 'Accords Septièmes mineur', value: 'Mineurs7' },
          { label: 'Autres', value: 'Autre' },
        ];
      case 'Ukulele':
        return [
          { label: 'Accords Majeurs', value: 'Majeurs' },
          { label: 'Accords Mineurs', value: 'Mineurs' },
          { label: 'Accords Diminués', value: 'Diminue' },
          { label: 'Accords Augmentés', value: 'Augmente' },
          { label: 'Accords Septièmes majeurs', value: 'Majeurs7' },
          { label: 'Accords Septièmes mineur', value: 'Mineurs7' },
          { label: 'Autres', value: 'Autre' },
        ];
      case 'Basse':
        return [
          { label: 'Accords Majeurs', value: 'Majeurs' },
          { label: 'Accords Mineurs', value: 'Mineurs' },
          { label: 'Accords Diminués', value: 'Diminue' },
          { label: 'Accords Augmentés', value: 'Augmente' },
          { label: 'Accords Septièmes majeurs', value: 'Majeurs7' },
          { label: 'Accords Septièmes mineur', value: 'Mineurs7' },
          { label: 'Accords Sus4', value: 'Sus4' },
          { label: 'Accords Sus2', value: 'Sus2' },
          { label: 'Accords Quinte', value: 'Quinte' },
          { label: 'Accords Sixte', value: 'Sixte' },
          { label: 'Accords Neuf', value: 'Neuf' },
          { label: 'Power Chords', value: 'Power' },
          { label: 'Autres', value: 'Autre' },
        ];
      default:
        return [];
    }
  };


  console.log(instrument);
  console.log(chordsType);



  return (
    <View>
      <Title style={styles.title}>Liste des accords {instrument} </Title>
        <RNPickerSelect
          placeholder={{ label: "Sélectionnez un instrument", value: '' }}
          onValueChange={(itemValue) => handleFilterInstrument(itemValue)}
          items={[
            { label: 'Guitare', value: 'Guitare' },
            { label: 'Ukulele', value: 'Ukulele' },
            { label: 'Basse', value: 'Basse' },
          ]}
          style={{ inputAndroid: { color: 'black' } }}
        />

        <RNPickerSelect
          placeholder={{ label: "Sélectionnez un Type d'accord", value: '' }}
          onValueChange={(itemValue) => handleFilterChordsType(itemValue)}
          items={getChordsTypeOptions()}
          style={{ inputAndroid: { color: 'black' } }}
        />

        <Text style={{ marginTop: 20, textAlign: "center" }}>
          Instrument sélectionné : {instrument}
          {'\n'}
          Type d'accord sélectionné : {chordsType}
        </Text>
        <ScrollView contentContainerStyle={styles.container}>
        
      {imagePaths.length > 0 &&  imagePaths.map((path, index) => (
          <Image key={index} source={path} style={styles.image} />
        ))}
        <Image source={image1}></Image>
      </ScrollView>
    </View>
  );
}

export default ChordsScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  title:{
    textAlign:"center",
    top:10,
  }
});



