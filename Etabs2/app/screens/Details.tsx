import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
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

  const [aspectRatio, setAspectRatio] = useState(null);
  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

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

  }, 
  
  
  [path]
  
);


  return (
    <ScrollView>
      <View>
        <Title style={styles.title}>{title}</Title>

        {url && (
          <Image
            source={{ uri: url }}
            onLoad={handleImageLoad}
            style={{ ...styles.image, aspectRatio: aspectRatio}} // Adjust dimensions as needed
          />
        )}

      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  
  title: {
    textAlign: 'center',
    color: 'black',
  },
  image:{
    textAlign:"center",
    justifyContent:"center",
    alignItems:"center",
    marginTop: 20,
    width: '100%',
    height: 3000,
    // You can adjust the aspect ratio as needed
    resizeMode: 'cover',
    
  },
});
