import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { FIREBASE_APP } from '../../FirebaseConfig';
import { getDownloadURL } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

export default function UploadEtabs() {
  const [uploading, setUploading] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.cancelled) {
      setUploading(true);

      const { uri } = result;

      try {
        const response = await fetch(uri);
        const blob = await response.blob();

        

        const storage = getStorage(FIREBASE_APP);
        const metadata = {
          contentType: 'image/jpeg',
        };
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Note: Months are zero-based, so we add 1
        const day = currentDate.getDate();

         // Utiliser expo-file-system pour extraire le nom du fichier de l'URI
         const fileInfo = await FileSystem.getInfoAsync(uri);
         const imageName = fileInfo.uri.split('/').pop();
        

        const storageRef = ref(storage, day+'_'+month+'_'+year+ '_'+ imageName);
        console.log(day+'_'+month+'_'+year+ '_'+ imageName);
        const uploadTask = uploadBytes(storageRef, blob, metadata);

        // Utilisation de promesses pour gérer l'upload
        uploadTask
          .then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File available at', downloadURL);
          })
          .catch((error) => {
            console.error('Error uploading image: ', error);
          })
          .finally(() => {
            setUploading(false);
          });
      } catch (error) {
        console.error('Error fetching image data: ', error);
        setUploading(false);
      }
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View>
      <Pressable style={styles.ImportButton} onPress={pickImageAsync}>
        <Text>Add File</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "blue",
    padding: 8,
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

function onStateChanged(task, next, error, complete) {
  task.on('state_changed', next, error, complete);
}