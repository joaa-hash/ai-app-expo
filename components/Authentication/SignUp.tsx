import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput } from '../Theme/Themed';
import { BaseProfile } from '../../constants/BaseProfile';
import Colors from '../../constants/Colors';
import { validatePassword, handleSignUp, checkRequiredForRegister } from '../../hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { AuthTypes, Profile } from '../../types';

export default function Signup({
  email,
  setEmail,
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
  profile,
  setProfile,
  authModalState,
  setAuthModalState,
  register,
  setRegister,
  login,
  setLogin,
}: AuthTypes) {
  const theme = useColorScheme();
  useEffect(() => {}, [password, verifyPassword, email, profile.firstName]);

  const disableRegisterButton = useCallback(() => {
    return {
      backgroundColor:
        checkRequiredForRegister(email, password, verifyPassword, profile) === true
          ? Colors[theme].background
          : '#3f2fd3',
      borderColor:
        checkRequiredForRegister(email, password, verifyPassword, profile) === true
          ? '#3f3f3f'
          : '#3f2fd3',
    };
  }, [password, verifyPassword, theme, email, profile]);

  const changeTextColorForRegister = useCallback(() => {
    return {
      color:
        checkRequiredForRegister(email, password, verifyPassword, profile) === true
          ? Colors[theme].text
          : '#ffffff',
    };
  }, [theme, email, password, verifyPassword, profile.firstName]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.modalView}>
        <Text style={styles.label}>Set Login Credentials</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#3f3f3f"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#3f3f3f"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="password-new"
          passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: [-]"
        />
        <Text style={styles.subText}>
          Password must be at least 8 characters have one upper & lowercase, one number & one
          special character
        </Text>
        <TextInput
          placeholder="Verify Password"
          placeholderTextColor="#3f3f3f"
          value={verifyPassword}
          onChangeText={(text) => setVerifyPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCorrect={false}
          autoComplete="password-new"
          passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: [-]"
        />
        <View style={styles.profileInformationContainer}>
          <Text style={styles.label}>Profile Information</Text>
          <View style={styles.nameContainer}>
            <View style={{ flexDirection: 'column', width: '47.5%' }}>
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#3f3f3f"
                value={profile.firstName}
                onChangeText={(text) => setProfile({ ...profile, firstName: text })}
                style={styles.input}
                autoCorrect={false}
                autoComplete="name"
                autoCapitalize="characters"
                keyboardType="name-phone-pad"
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => {
              handleSignUp(email, password);
              setAuthModalState(!authModalState);
            }}
            style={[styles.button, disableRegisterButton()]}
            disabled={checkRequiredForRegister(email, password, verifyPassword, profile)}
          >
            <Text style={[styles.buttonText, changeTextColorForRegister()]}>Submit</Text>
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
  modalInputContainer: {
    width: '100%',
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
    borderColor: '#3f2fd3',
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
  modalView: {
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6d6d6da5',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    elevation: 0,
  },
  subText: {
    fontSize: 10,
    color: '#3f3f3f',
    paddingHorizontal: 12,
    paddingTop: 5,
  },
  profileInformationContainer: {
    paddingVertical: 10,
  },
  label: {
    paddingVertical: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 6,
  },
  addressContainer: {},
  localityContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 16,
  },
});
