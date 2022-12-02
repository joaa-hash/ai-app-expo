import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TextInput, ScrollView } from '../components/Themed';
import { KeyboardAvoidingView, Modal, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Signup from './SignUp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [profile, setProfile] = useState(
    {
      company: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    }
  )
  const [modalState, setModalState] = useState(false);

  const theme = useColorScheme();
  const colorFromProps = Colors[theme];

  const navigation = useNavigation();

  const blankProfile = {
    company: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  }

  const createProfile = async() => {
    try {
      const docRef = await addDoc(collection(db, "profiles"), {
        company: "",
        firstName: "",
        lastName: "",
        phoneNo: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
      })
    } catch (error) {
      console.error(`Error adding document: ${error}`);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        navigation.navigate('Root')
      }
    })

    return unsubscribe;
  }, [modalState])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user
      console.log(`Registered user: ${user.email}`)
    })
    .catch(error => alert(error.message))
  };
  
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user
      console.log(`Logged in with: ${user.email}`)
    })
    .catch(error => alert(error.message))
  };

  const checkRequired = useCallback(() => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return password === verifyPassword
      && validatePassword()
      && reg.test(email)
      ? false
      : true
  }, [password, verifyPassword, email])

  const validatePassword = () => {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{8,})/;
    // Password example:
    // abc-123-ABC

    return reg.test(password) && reg.test(verifyPassword)
      ? true
      : false
  }

  const disableLoginButton = useCallback(() => {
    return (
      { 
        backgroundColor: checkRequired() === true ? colorFromProps.background : '#3f2fd3',
        borderColor: checkRequired() === true ? '#3f3f3f' : '#3f2fd3'
      }
    )
  }, [password, verifyPassword, theme, email]);


  const changeTextColorForLogin = useCallback(() => {
    return (
      { 
        color: checkRequired() === true ? colorFromProps.text : '#ffffff' 
      }
    )
  }, [theme, email, password]);



  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior='padding'
      >
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder='Email'
            placeholderTextColor='#3f3f3f'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
          />
          <TextInput 
            placeholder='Password'
            placeholderTextColor='#3f3f3f'
            value={password}
            onChangeText={text => {
              setVerifyPassword(text)
              setPassword(text)
            }}
            style={styles.input}
            secureTextEntry
            autoCorrect={false}
            autoComplete='password'
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleLogin}
            style={[styles.button, disableLoginButton()]}
            disabled={checkRequired()}
          >
            <Text style={[styles.buttonText, changeTextColorForLogin()]}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setEmail('')
              setPassword('')
              setVerifyPassword('')
              setModalState(true)
            }}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <Signup 
        email={email}
        password={password}
        verifyPassword={verifyPassword}
        validatePassword={validatePassword}
        profile={profile}
        modalState={modalState}
        theme={theme}
        colorFromProps={colorFromProps}
        setEmail={setEmail}
        setPassword={setPassword}
        setVerifyPassword={setVerifyPassword}
        setProfile={setProfile}
        setModalState={setModalState}
        handleSignUp={handleSignUp}
        blankProfile={blankProfile}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
    borderWidth: 1.5
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: '#3f2fd3',
    borderWidth: 1.5,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
  },
})