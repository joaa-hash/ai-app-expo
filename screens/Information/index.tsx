import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StatsContainer } from '../../components/StatsContainer';
import { PlatformTypes, ResultObject } from '../../types';
import { styles } from './styles';

interface Props {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  result: ResultObject;
}

export const Information = ({ result, modalState, setModalState }: Props) => {
  const closeModalButton = (platform: PlatformTypes) => {
    return platform.OS === 'web' ? (
      <Pressable
        style={styles.closeButton}
        onPress={() => {
          return modalState === true ? setModalState(false) : setModalState(true);
        }}
      >
        <Text style={styles.closeButtonText}>✖︎</Text>
      </Pressable>
    ) : (
      <></>
    );
  };

  const config = {
    duration: 500,
    easing: Easing.ease,
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(modalState ? 1 : 0, config);
    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, { zIndex: modalState ? 1 : 0 }]}>
      {closeModalButton(Platform)}
      <Text style={styles.text}>Details Screen</Text>
      <StatsContainer />
      <View style={styles.lineBreak} />
    </Animated.View>
  );
};
