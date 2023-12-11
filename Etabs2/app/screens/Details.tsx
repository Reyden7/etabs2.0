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
import { GestureHandlerRootView, PinchGestureHandler, State } from 'react-native-gesture-handler';




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
  const [scale, setScale] = useState(3);
 

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
    <GestureHandlerRootView>
      <View style={styles.container}>
        {url && (
          <PinchGestureHandler
            onGestureEvent={({ nativeEvent }) => {
              const newScale = nativeEvent.scale;
              // Mise à jour du style de l'image en fonction du facteur de zoom
              setScale(newScale);
            }}
          >
            <Image
              source={{ uri: url }}
              onLoad={() => console.log('Image chargée avec succès.')}
              style={[
                styles.image,
                {
                  transform: [{ scale: scale }],
                },
              ]}
            />
          </PinchGestureHandler>
        )}
      </View>
    </GestureHandlerRootView>
  </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: 900,
    resizeMode: 'contain', // ou 'cover' selon vos besoins
  },
});
