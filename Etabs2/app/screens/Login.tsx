import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Button, Pressable, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { async } from '@firebase/util';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    // Ajoutez ici la logique de connexion avec Firebase
    console.log("connection")
    console.log(email);
    console.log(password);
    setLoading(true);
    try{
        const response = await signInWithEmailAndPassword(auth,email,password);
        console.log(response);
        alert('Check your email !');
    }catch(error : any){
        console.log(error);
        alert('Sign In failed !' + error.message);
    }finally{
        setLoading(false);
    }

  };

  const SignUp = async () => {
    // Ajoutez ici la logique de connexion avec Firebase
    console.log("connection")
    console.log(email);
    console.log(password);
    setLoading(true);
    try{
        const response = await createUserWithEmailAndPassword(auth,email,password);
        console.log(response);
        alert('Check your email !');
    }catch(error : any){
        console.log(error);
        alert('Sign In failed !' + error.message);
    }finally{
        setLoading(false);
    }

  };

  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
     
        {loading ? <ActivityIndicator size="large" color="#0000ff" />
        : <>
        <Pressable style={styles.loginButton} onPress={ handleLogin}><Text style={styles.buttonText}>Login </Text></Pressable>
        <Pressable style={{backgroundColor: '#0000', marginTop:20}} onPress={ SignUp}><Text style={{color:'#007BFF'}}>Create account </Text></Pressable>
        </>}
        
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
