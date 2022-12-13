import React, { createRef, useEffect, useState } from 'react';
import { TextInput, View as RNView } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks';
import { AuthTypes, SetBooleanState } from '../../types';
import { View, TextPrimary, Pressable } from '../Theme/Themed';
import { styles } from './styles';

interface Props {
  settingsModalState: boolean;
  setSettingsModalState: SetBooleanState;
  authModalState: boolean;
  setAuthModalState: SetBooleanState;
  login: AuthTypes['login'];
  setLogin: AuthTypes['setLogin'];
  register: AuthTypes['register'];
  setRegister: AuthTypes['setRegister'];
  textInputRef: React.RefObject<TextInput>;
}

export const Header = ({
  settingsModalState,
  setAuthModalState,
  authModalState,
  setSettingsModalState,
  login,
  setLogin,
  register,
  setRegister,
  textInputRef,
}: Props) => {
  const [signUpHover, setSignUpHover] = useState(false);
  const [logHover, setLogHover] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);
  const theme = useColorScheme();

  const buttonRef = React.createRef<RNView>();

  return (
    <View style={styles.container}>
      <View>
        <TextPrimary style={styles.logo}>triv_AI</TextPrimary>
      </View>
      <View style={styles.utilityContainer}>
        <View style={styles.authGroup}>
          <Pressable
            onPress={() => {
              setAuthModalState(true);
              setRegister(true);
              buttonRef.current?.blur();
              textInputRef.current?.focus();
            }}
            onHoverIn={() => setSignUpHover(true)}
            onHoverOut={() => setSignUpHover(false)}
            style={[
              styles.signUpAuthButton,
              { borderColor: signUpHover ? Colors[theme]['border'] : '#5346c4' },
            ]}
            ref={buttonRef}
          >
            <TextPrimary style={styles.text}>Create Account</TextPrimary>
          </Pressable>
          <Pressable
            onPress={() => {
              setLogin(true);
              setAuthModalState(true);
              buttonRef.current?.blur();
              textInputRef.current?.focus();
            }}
            onHoverIn={() => setLogHover(true)}
            onHoverOut={() => setLogHover(false)}
            style={[
              styles.logInOutAuthButton,
              {
                borderColor: logHover ? Colors[theme]['border'] : '#5346c4',
                backgroundColor: logHover ? '#fff' : '#5346c4',
              },
            ]}
            ref={buttonRef}
          >
            <TextPrimary style={[styles.text, { color: logHover ? '#000000' : '#fff' }]}>
              Login
            </TextPrimary>
          </Pressable>
        </View>
        <Pressable
          onHoverIn={() => setSettingsHover(true)}
          onHoverOut={() => setSettingsHover(false)}
          onPress={() => {
            setSettingsModalState(true);
            buttonRef.current?.blur();
            textInputRef.current?.focus();
          }}
          ref={buttonRef}
        >
          <TextPrimary
            style={[
              styles.iconText,
              { color: settingsHover ? '#5346c4' : Colors[theme]['textPrimary'] },
            ]}
          >
            ⚙
          </TextPrimary>
        </Pressable>
      </View>
    </View>
  );
};
