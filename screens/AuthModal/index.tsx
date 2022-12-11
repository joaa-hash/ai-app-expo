import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { auth, db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { BaseProfile } from '../../constants/BaseProfile';
import Login from '../../components/Authentication/Login';
import Signup from '../../components/Authentication/SignUp';
import { validatePassword, handleLogin, handleSignUp, checkRequired } from '../../hooks';
import { AuthTypes } from '../../types';

type Props = {
  authModalState: boolean;
  setAuthModalState: React.Dispatch<React.SetStateAction<boolean>>;
  register: AuthTypes['register'];
  login: AuthTypes['login'];
  setLogin: AuthTypes['setLogin'];
  setRegister: AuthTypes['setRegister'];
};

export default function AuthModal({
  authModalState,
  setAuthModalState,
  register,
  login,
  setLogin,
  setRegister,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [profile, setProfile] = useState(BaseProfile);
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
          setProfile={setProfile}
          profile={profile}
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
          profile={profile}
          authModalState={authModalState}
          setEmail={setEmail}
          setPassword={setPassword}
          setVerifyPassword={setVerifyPassword}
          setProfile={setProfile}
          setAuthModalState={setAuthModalState}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
}
