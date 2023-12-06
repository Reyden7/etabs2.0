import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const UploadEtabs = () => {
  return (
    <View>
       <Pressable style={styles.ImportButton} >
                <Text>Importer</Text>
            </Pressable>
    </View>
  )
}

export default UploadEtabs

const styles = StyleSheet.create({
  
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