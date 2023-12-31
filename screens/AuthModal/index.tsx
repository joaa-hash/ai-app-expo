import React, { useEffect, useState } from 'react';
import { Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Login from '../../components/Authentication/Login';
import Signup from '../../components/Authentication/SignUp';
import { checkRequired } from '../../hooks';
import { AuthTypes, Profile, SetBooleanState } from '../../types';

type Props = {
  authModalState: boolean;
  setAuthModalState: SetBooleanState;
  register: AuthTypes['register'];
  login: AuthTypes['login'];
  setLogin: AuthTypes['setLogin'];
  setRegister: AuthTypes['setRegister'];
  textInputRef: React.RefObject<TextInput>;
  userData: Profile;
  setUserData: React.Dispatch<React.SetStateAction<Profile>>;
};

export default function AuthModal({
  authModalState,
  setAuthModalState,
  register,
  login,
  setLogin,
  setRegister,
  textInputRef,
  userData,
  setUserData,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        navigation.navigate('Root');
      }
    });
    return unsubscribe;
  }, [authModalState]);

  useEffect(() => {
    checkRequired(email, password, verifyPassword);
  }, [password, verifyPassword, email]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setAuthModalState(false);
        setLogin(false);
        setRegister(false);
        textInputRef.current?.focus();
      }}
    >
      <Modal
        animationType="slide"
        visible={authModalState}
        onRequestClose={() => {
          setAuthModalState(!authModalState);
          setLogin(false);
          setRegister(false);
        }}
        transparent={true}
      >
        {login ? (
          <Login
            setLogin={setLogin}
            login={login}
            setRegister={setRegister}
            register={register}
            authModalState={authModalState}
            setAuthModalState={setAuthModalState}
            setUserData={setUserData}
            userData={userData}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            setVerifyPassword={setVerifyPassword}
            verifyPassword={verifyPassword}
          />
        ) : register ? (
          <Signup
            setLogin={setLogin}
            login={login}
            setRegister={setRegister}
            register={register}
            email={email}
            password={password}
            verifyPassword={verifyPassword}
            userData={userData}
            authModalState={authModalState}
            setEmail={setEmail}
            setPassword={setPassword}
            setVerifyPassword={setVerifyPassword}
            setUserData={setUserData}
            setAuthModalState={setAuthModalState}
          />
        ) : (
          <></>
        )}
      </Modal>
    </TouchableWithoutFeedback>
  );
}
