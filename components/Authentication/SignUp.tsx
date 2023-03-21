import React, { useCallback } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';
import {
  View,
  TextPrimary,
  TextInput,
  SubTextTertiary,
  FormLabel,
  Pressable,
  SubHead,
} from '../Theme/Themed';
import Colors from '../../constants/Colors';
import { handleSignUp, checkRequiredForRegister, useColorScheme } from '../../hooks';
import { AuthTypes } from '../../types';

export default function Signup({
  email,
  setEmail,
  password,
  setPassword,
  verifyPassword,
  setVerifyPassword,
  userData,
  setUserData,
  authModalState,
  setAuthModalState,
  setRegister,
  setLogin,
}: AuthTypes) {
  const theme = useColorScheme();

  const disableRegisterButton = useCallback(() => {
    return {
      backgroundColor:
        checkRequiredForRegister(email, password, verifyPassword, userData) === true
          ? Colors[theme].background
          : '#3f2fd3',
      borderColor:
        checkRequiredForRegister(email, password, verifyPassword, userData) === true
          ? '#3f3f3f'
          : '#3f2fd3',
    };
  }, [password, verifyPassword, theme, email, userData]);

  const changeTextColorForRegister = useCallback(() => {
    return {
      color:
        checkRequiredForRegister(email, password, verifyPassword, userData) === true
          ? Colors[theme].textPrimary
          : '#ffffff',
    };
  }, [theme, email, password, verifyPassword, userData]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback>
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
                value={userData?.firstName}
                // onChangeText={(text) => setUserData({ ...userData!, firstName: text })}
                style={[
                  styles.input,
                  {
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 22,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  },
                ]}
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
                setUserData(userData);
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
              disabled={checkRequiredForRegister(email, password, verifyPassword, userData)}
            >
              <TextPrimary style={[styles.buttonText, changeTextColorForRegister()]}>
                Submit
              </TextPrimary>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
