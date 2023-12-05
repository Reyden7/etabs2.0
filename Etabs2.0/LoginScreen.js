import React, { useState } from 'react';
import { Text,View, TextInput, Button, StyleSheet, Pressable } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logique de connexion ici (envoi des informations d'identification au serveur, etc.)
    console.log('Username:', username);
    console.log('Password:', password);

    // Naviguer vers une autre page après la connexion (par exemple, la page d'accueil)
    navigation.navigate('Home');
  };

  const bttitle = "Se connecter"
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom d'utilisateur"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
      />
      <TextInput
        placeholder="Mot de passe"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.Button} onPress={handleLogin}>
        <Text style={styles.Bttext}>{bttitle}</Text>
      </Pressable>
      <Text style={{textAlign:"center", marginTop:20, color:"#007CE3",}}>Créer un compte</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: "auto",
    marginHorizontal : 20,
    textAlign : "center",
    borderRadius : 20
  },
  Button:{
    backgroundColor:"#40A8FF",
    width:200,
    height:40,
    alignItems:"center",
    justifyContent :"center",
    borderRadius:20,
    marginTop:10,
    marginHorizontal:"22%",
    elevation: 3,
  },
  Bttext: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    padding:5
  },
  
});

export default LoginScreen;