import React from 'react';
import { TextInput, View as RNView } from 'react-native';
import Colors from '../../constants/Colors';
import { auth } from '../../firebase';
import { useColorScheme } from '../../hooks';
import { SetBooleanState } from '../../types';
import { TextPrimary, Pressable, View } from '../Theme/Themed';
import { styles } from './styles';

type Props = {
  setAuthModalState: SetBooleanState;
  setRegister: SetBooleanState;
  buttonRef: React.RefObject<RNView>;
  textInputRef: React.RefObject<TextInput>;
  setSignUpHover: SetBooleanState;
  signUpHover: boolean;
  setLogin: SetBooleanState;
  logHover: boolean;
  setLogHover: SetBooleanState;
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

export const AuthButtonGroup = ({
  setAuthModalState,
  setRegister,
  buttonRef,
  textInputRef,
  setSignUpHover,
  signUpHover,
  setLogin,
  logHover,
  setLogHover,
  isLoggedIn,
  setIsLoggedIn,
}: Props) => {
  const theme = useColorScheme();

  const switchButtons = () => {
    if (isLoggedIn) {
      return (
        <View style={styles.authGroup}>
          <Pressable
            onPress={() => {
              buttonRef.current?.blur();
              textInputRef.current?.focus();
              auth.signOut();
              setIsLoggedIn(false);
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
              Sign Out
            </TextPrimary>
          </Pressable>
        </View>
      );
    } else {
      return (
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
      );
    }
  };

  return <View>{switchButtons()}</View>;
};
