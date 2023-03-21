import React, { createRef, useEffect, useState } from 'react';
import { TextInput, View as RNView } from 'react-native';
import Colors from '../../constants/Colors';
import { auth } from '../../firebase';
import { useColorScheme } from '../../hooks';
import { AuthTypes, SetBooleanState } from '../../types';
import { AuthButtonGroup } from '../Authentication/AuthButtonGroup';
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
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
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
  isLoggedIn,
  setIsLoggedIn,
}: Props) => {
  const [signUpHover, setSignUpHover] = useState(false);
  const [logHover, setLogHover] = useState(false);
  const [settingsHover, setSettingsHover] = useState(false);

  const theme = useColorScheme();

  const buttonRef: React.RefObject<RNView> = React.createRef<RNView>();

  return (
    <View style={styles.container}>
      <View>
        <TextPrimary style={styles.logo}>triv_AI</TextPrimary>
      </View>
      <View style={styles.utilityContainer}>
        <AuthButtonGroup
          setAuthModalState={setAuthModalState}
          setRegister={setRegister}
          buttonRef={buttonRef}
          textInputRef={textInputRef}
          setSignUpHover={setSignUpHover}
          signUpHover={signUpHover}
          setLogin={setLogin}
          logHover={logHover}
          setLogHover={setLogHover}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
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
