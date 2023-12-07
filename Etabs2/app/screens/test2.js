import { View, Text, Pressable, StyleSheet, ActivityIndicator, Image, Platform, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {FIREBASE_APP} from '../../FirebaseConfig';
import 'firebase/storage'; 
import Constants from "expo-constants"
import { AntDesign, Feather } from "@expo/vector-icons";

import UploadImageFromDevice from './UploadImage/uploadImageFromDevice';
import getBlobFroUri from './UploadImage/getBlobFroUri';
import manageFileUpload from './UploadImage/manageFileUpload';


export default function UploadEtabs  () {

  const [imgURI, setImageURI] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState("");
  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleLocalImageUpload = async () => {
    console.log("handleLocalImageUpload called");
    const fileURI = await UploadImageFromDevice();
    

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };

  const handleCloudImageUpload = async () => {
    console.log("handleCloudImageUpload called");
    if (!imgURI) return;
    let fileToUpload = null;
    const blob = await getBlobFroUri(imgURI);
    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };

  return (
    <View>
      <Text>Attach and upload image</Text>
      <Pressable onPress={handleLocalImageUpload}>
        <Text>Add File</Text>
      </Pressable>
      <Pressable onPress={handleCloudImageUpload}>
        <Text>Upload Cloud</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "blue",
    padding: 8,
  },

  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  uploadProgressContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },

  pressableButton: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  pressableButtonText: {
    color: "black",
    textAlign: "center",
  },
});
