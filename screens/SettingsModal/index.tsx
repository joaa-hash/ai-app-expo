import React from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable } from 'react-native';
import { View, TextPrimary } from '../../components/Theme/Themed';
import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StatsContainer } from '../../components/StatsContainer';
import { PlatformTypes, ResultObject, SetBooleanState } from '../../types';
import { styles } from './styles';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

interface Props {
  settingsModalState: boolean;
  setSettingsModalState: SetBooleanState;
  result: ResultObject;
}

export const SettingsModal = ({ result, settingsModalState, setSettingsModalState }: Props) => {
  const theme = useColorScheme();
  const closeModalButton = (platform: PlatformTypes) => {
    return platform.OS === 'web' ? (
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
    <Modal
      visible={settingsModalState}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {
        setSettingsModalState(!settingsModalState);
      }}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.modalView]}>
          {closeModalButton(Platform)}
          <TextPrimary style={styles.text}>Details Screen</TextPrimary>
          <StatsContainer />
          <View style={[styles.lineBreak, { backgroundColor: Colors[theme]['textPrimary'] }]} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
