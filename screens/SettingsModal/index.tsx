import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  TextInput as DefaultTextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { View, TextPrimary, Head, Pressable } from '../../components/Theme/Themed';
import { StatsContainer, Distribution } from '../../components';
import { Answers, PlatformTypes, Profile, ResultObject, SetBooleanState } from '../../types';
import { styles } from './styles';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../hooks';

interface Props {
  settingsModalState: boolean;
  setSettingsModalState: SetBooleanState;
  result: ResultObject;
  textInputRef: React.RefObject<DefaultTextInput>;
  answers: Answers;
  guesses: number;
  platform: PlatformTypes;
  userData: Profile;
}

export const SettingsModal = ({
  settingsModalState,
  setSettingsModalState,
  textInputRef,
  platform,
  userData,
}: Props) => {
  const theme = useColorScheme();
  const closeModalButton = (platform: PlatformTypes) => {
    return platform === 'web' ? (
      <Pressable
        style={styles.closeButton}
        onPress={() => {
          return settingsModalState === true
            ? setSettingsModalState(false)
            : setSettingsModalState(true);
        }}
      >
        <TextPrimary style={styles.closeButtonText}>✕</TextPrimary>
      </Pressable>
    ) : (
      <></>
    );
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSettingsModalState(false);
        textInputRef.current?.focus();
      }}
    >
      <Modal
        visible={settingsModalState}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setSettingsModalState(!settingsModalState);
        }}
      >
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={[styles.modalView]}>
              {closeModalButton(platform)}
              <Head style={{ textTransform: 'uppercase' }}>Stats</Head>
              <StatsContainer userData={userData} />
              <View style={[styles.lineBreak, { backgroundColor: Colors[theme]['textPrimary'] }]} />
              <Distribution userData={userData} />
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableWithoutFeedback>
  );
};
