import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TextInput, ScrollView } from '../Theme/Themed';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Signup from './SignUp';
import { BaseProfile } from '../../constants/BaseProfile';
import { AuthTypes } from '../../types';
import { checkRequired, handleLogin } from '../../hooks';

export default function Login({
  password,
  verifyPassword,
  email,
  setEmail,
  setVerifyPassword,
  setPassword,
  setProfile,
  setAuthModalState,
  authModalState,
  register,
  setRegister,
  login,
  setLogin,
}: AuthTypes) {
  const theme = useColorScheme();

  const disableLoginButton = useCallback(() => {
    return {
      backgroundColor:
        checkRequired(email, password, verifyPassword) === true
          ? Colors[theme].background
          : '#5346c4',
      borderColor: checkRequired(email, password, verifyPassword) === true ? '#3f3f3f' : '#5346c4',
    };
  }, [password, verifyPassword, theme, email]);

  const changeTextColorForLogin = useCallback(() => {
    return {
      color:
        checkRequired(email, password, verifyPassword) === true ? Colors[theme].text : '#ffffff',
    };
  }, [theme, email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#3f3f3f"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#3f3f3f"
          value={password}
          onChangeText={(text: string) => {
            setVerifyPassword(text);
            setPassword(text);
          }}
          style={styles.input}
          secureTextEntry
          autoCorrect={false}
          autoComplete="password"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => handleLogin(email, password)}
          style={[styles.button, disableLoginButton()]}
          disabled={checkRequired(email, password, verifyPassword)}
        >
          <Text style={[styles.buttonText, changeTextColorForLogin()]}>Login</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setEmail('');
            setPassword('');
            setVerifyPassword('');
            setProfile(BaseProfile);
            setAuthModalState(!authModalState);
            setLogin(false);
            setRegister(false);
          }}
          style={styles.cancelButton}
        >
          <Text style={[styles.buttonText, { color: '#ffffff' }]}>Cancel</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: '40%',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#3f3f3f',
    marginTop: 6,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  inputContainer: {
    width: '80%',
    paddingHorizontal: 28,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 28,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: '#5346c4',
    borderWidth: 1.5,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {},
  cancelButton: {
    backgroundColor: '#d55252',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
});
