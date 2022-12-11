import React from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { StatsContainer } from '../../components/StatsContainer';
import { PlatformTypes, ResultObject } from '../../types';
import { styles } from './styles';

interface Props {
  settingsModalState: boolean;
  setSettingsModalState: React.Dispatch<React.SetStateAction<boolean>>;
  result: ResultObject;
}

export const Information = ({ result, settingsModalState, setSettingsModalState }: Props) => {
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
    const opacity = withTiming(settingsModalState ? 1 : 0, config);
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[styles.container, animatedStyle, { zIndex: settingsModalState ? 1 : 0 }]}
    >
      {closeModalButton(Platform)}
      <Text style={styles.text}>Details Screen</Text>
      <StatsContainer />
      <View style={styles.lineBreak} />
    </Animated.View>
  );
};
