import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable } from 'react-native';
import { styles } from './styles';
import { View, Text, TextInput } from '../Theme/Themed';
import { BaseProfile } from '../../constants/BaseProfile';
import Colors from '../../constants/Colors';
import { handleSignUp, checkRequiredForRegister } from '../../hooks';
import useColorScheme from '../../hooks/useColorScheme';
import { AuthTypes } from '../../types';

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
