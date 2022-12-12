import React, { useCallback } from 'react';
import { TextPrimary, View, TextInput, FormLabel } from '../Theme/Themed';
import { KeyboardAvoidingView, Pressable } from 'react-native';
import { styles } from './styles';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
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
        checkRequired(email, password, verifyPassword) === true
          ? Colors[theme].textPrimary
          : '#ffffff',
    };
  }, [theme, email, password]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.modalView}>
        <View style={styles.inputContainer}>
          <View style={styles.formInput}>
            <FormLabel style={styles.formLabel}>Email:</FormLabel>
            <TextInput
              value={email}
              onChangeText={(text: string) => setEmail(text)}
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
              onChangeText={(text: string) => {
                setVerifyPassword(text);
                setPassword(text);
              }}
              style={[styles.input]}
              secureTextEntry
              autoCorrect={false}
              autoComplete="password"
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
            onPress={() => handleLogin(email, password)}
            style={[styles.button, disableLoginButton()]}
            disabled={checkRequired(email, password, verifyPassword)}
          >
            <TextPrimary style={[styles.buttonText, changeTextColorForLogin()]}>Login</TextPrimary>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
