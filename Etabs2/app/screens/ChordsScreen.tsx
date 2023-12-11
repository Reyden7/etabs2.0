import { View, Text } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Title } from 'react-native-paper';

const ChordsScreen = () => {
  const [instrument, setInstrument] = useState('');
  const [chordsType, setChordsType] = useState('');

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
      case 'guitare':
        return [
          { label: 'Accords Majeurs', value: 'Majeurs' },
          { label: 'Accords Mineurs', value: 'Mineurs' },
          { label: 'Accords Septièmes majeurs', value: 'Majeurs7' },
          { label: 'Accords Septièmes mineur', value: 'Mineurs7' },
          { label: 'Autres', value: 'Autre' },
        ];
      case 'ukulele':
        return [
          { label: 'Accords Majeurs', value: 'Majeurs' },
          { label: 'Accords Mineurs', value: 'Mineurs' },
          { label: 'Accords Diminués', value: 'Diminue' },
          { label: 'Accords Augmentés', value: 'Augmente' },
          { label: 'Accords Septièmes majeurs', value: 'Majeurs7' },
          { label: 'Accords Septièmes mineur', value: 'Mineurs7' },
          { label: 'Autres', value: 'Autre' },
        ];
      case 'basse':
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

  var path = '../img/'+instrument+'/'+chordsType;
  console.log(instrument);
  console.log(chordsType);
  if(instrument == '' || instrument == null){path='';}
  if(chordsType == '' || chordsType == null){path='';}


  return (
    <View>
      <Title style={{ textAlign: "center", top: 10, fontWeight: "500" }}>Liste des accords {instrument} </Title>
      <RNPickerSelect
        placeholder={{ label: "Sélectionnez un instrument", value: '' }}
        onValueChange={(itemValue) => handleFilterInstrument(itemValue)}
        items={[
          { label: 'Guitare', value: 'guitare' },
          { label: 'Ukulele', value: 'ukulele' },
          { label: 'Basse', value: 'basse' },
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
      <Text style={{ marginTop: 20, textAlign: "center" }}>
        chemin de l'image : {path}
      </Text>
    </View>
  );
}

export default ChordsScreen;
