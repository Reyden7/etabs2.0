import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { Title } from 'react-native-paper';

import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';
import ImageViewer from 'react-native-image-zoom-viewer';


// Define the StackParamList (if not already defined)
type StackParamList = {
  Details: { itemId: string, title: string, path: string };
  // Add other screens if necessary
};

// Define the route prop type
type DetailsScreenRouteProp = RouteProp<StackParamList, 'Details'>;

const Details: React.FC<{ route: DetailsScreenRouteProp }> = ({ route }) => {
  // Access the itemId parameter from the route
  const { itemId } = route.params;
  const { title } = route.params;
  const { path } = route.params;

  const [url, setUrl] = useState<string | undefined>(undefined);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const image = [
    {
      url: url || '',
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        {url && (
          <ImageViewer imageUrls={image}
            style={styles.image}
            renderIndicator={() => null}
            backgroundColor='#000'
          />
          // <Image
          //   source={require('../img/tengyart-kSvpTrfhaiU-unsplash.jpg')}
          //   onLoad={() => console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nImage chargée avec succès.')}
          //   style={styles.image}
          // />
        )}
      </View>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: 'cover',
  },
});
