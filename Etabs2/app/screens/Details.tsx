import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Title } from 'react-native-paper';

import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

// Define the StackParamList (if not already defined)
type StackParamList = {
  Details: { itemId: string, title:string, path:string };
  // Add other screens if necessary
};

// Define the route prop type
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

const Details: React.FC<{ route: DetailsScreenRouteProp }> = ({ route }) => {
  // Access the itemId parameter from the route
  const { itemId } = route.params;
  const {title} = route.params;
  const {path} = route.params;

  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const func = async () => {
      const storage = getStorage();
      const reference = ref(storage, '/' + path);
      console.log(path)
      try {
        const x = await getDownloadURL(reference);
        setUrl(x);
      } catch (error) {
        console.error('Error getting download URL:', error);
        // Handle the error accordingly (e.g., setUrl to a default value)
      }
    };
    func();
  }, [path]);


  return (
    <View>
      <Title style={{ textAlign: "center", top: 10 }}>{title}</Title>
      {url && (
        <Image 
        source={{ uri: url }}
        style={{marginTop:20, height:'100%', width: '100%', resizeMode: 'cover' }} // Adjust dimensions as needed
      />
      )}
      
      {/* Render other details based on the itemId */}
    </View>
  );
};

export default Details;
