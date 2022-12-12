import React, { useCallback, useEffect } from 'react';
import { KeyboardAvoidingView, Pressable } from 'react-native';
import { styles } from './styles';
import {
  View,
  TextPrimary,
  TextInput,
  SubTextPrimary,
  SubTextTertiary,
  FormLabel,
  Head,
  SubHead,
} from '../Theme/Themed';
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
          ? Colors[theme].textPrimary
          : '#ffffff',
    };
  }, [theme, email, password, verifyPassword, profile.firstName]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.modalView}>
        <View style={styles.credentialContainer}>
          <View style={styles.formInput}>
            <FormLabel style={styles.formLabel}>Email:</FormLabel>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={[styles.input]}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
          <View style={styles.formInput}>
            <FormLabel style={styles.formLabel}>Password:</FormLabel>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={[styles.input]}
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="password-new"
              passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: [-]"
            />
          </View>
          <View style={styles.formInput}>
            <FormLabel style={styles.formLabel}>Verify:</FormLabel>
            <TextInput
              value={verifyPassword}
              onChangeText={(text) => setVerifyPassword(text)}
              style={[styles.input]}
              secureTextEntry
              autoCorrect={false}
              autoComplete="password-new"
              passwordRules="minlength: 8; required: lower; required: upper; required: digit; required: [-]"
            />
          </View>
          <SubTextTertiary style={{ textAlign: 'center' }}>
            Password must be at least 8 characters have one upper & lowercase, one number & one
            special character
          </SubTextTertiary>
        </View>
        <View style={styles.profileInformationContainer}>
          <SubHead>What's your name?</SubHead>
          <View style={styles.formInput}>
            <TextInput
              value={profile.firstName}
              onChangeText={(text) => setProfile({ ...profile, firstName: text })}
              style={[styles.nameInput]}
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="characters"
              keyboardType="name-phone-pad"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
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
            <TextPrimary style={[styles.buttonText, { color: '#ffffff' }]}>Cancel</TextPrimary>
          </Pressable>
          <Pressable
            onPress={() => {
              handleSignUp(email, password);
              setAuthModalState(!authModalState);
            }}
            style={[styles.button, disableRegisterButton()]}
            disabled={checkRequiredForRegister(email, password, verifyPassword, profile)}
          >
            <TextPrimary style={[styles.buttonText, changeTextColorForRegister()]}>
              Submit
            </TextPrimary>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
