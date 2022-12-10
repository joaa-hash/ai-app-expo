import React from 'react';
import { Easing, StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { checkAnswer } from '../../hooks';
import { Answer, ResultObject } from '../../types';
import { TextGeneralAnimation } from '../Animations/TextGeneralAnimation';
import { AnimatedText } from '../Theme/Themed';

export const showWinMessage = (result: ResultObject, answer: Answer, guesses: number) => {
  const checkedAnswer = guesses > 0 ? checkAnswer(result, answer[guesses - 1].userInput) : false;
  const config = {
    duration: 1000,
    easing: Easing.ease,
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(checkedAnswer ? 1 : 0, config);
    return {
      opacity,
    };
  });

  return guesses !== 0 && checkedAnswer ? (
    <AnimatedText style={[styles.infoText, animatedStyle]}>Nice Job!</AnimatedText>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  infoText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 6,
    paddingVertical: 22,
  },
});
