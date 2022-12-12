import React, { useState } from 'react';
import { Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { AuthTypes, SetBooleanState } from '../../types';
import { View, TextPrimary } from '../Theme/Themed';
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
}

export const Header = ({
  settingsModalState,
  setAuthModalState,
  setSettingsModalState,
  login,
  setLogin,
  register,
  setRegister,
}: Props) => {
  const [signUpHover, setSignUpHover] = useState(false);
  const [logHover, setLogHover] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);
  const theme = useColorScheme();

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
            }}
            onHoverIn={() => setSignUpHover(true)}
            onHoverOut={() => setSignUpHover(false)}
            style={[
              styles.signUpAuthButton,
              { borderColor: signUpHover ? Colors[theme]['border'] : '#5346c4' },
            ]}
          >
            <TextPrimary style={styles.text}>Create Account</TextPrimary>
          </Pressable>
          <Pressable
            onPress={() => {
              setLogin(true);
              setAuthModalState(true);
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
          >
            <TextPrimary style={[styles.text, { color: logHover ? '#000000' : '#fff' }]}>
              Login
            </TextPrimary>
          </Pressable>
        </View>
        <Pressable
          onHoverIn={() => setSettingsHover(true)}
          onHoverOut={() => setSettingsHover(false)}
          onPress={() =>
            settingsModalState === true ? setSettingsModalState(false) : setSettingsModalState(true)
          }
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
