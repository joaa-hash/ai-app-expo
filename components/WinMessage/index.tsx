import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { checkAnswer, fadeInColorChange } from '../../hooks';
import { Answer, ResultObject } from '../../types';

export const showWinMessage = (result: ResultObject, answer: Answer, guesses: number) => {
  if (guesses === 0) {
    return <></>;
  }
  if (checkAnswer(result, answer[guesses - 1].userInput) === true) {
    return (
      <Animated.Text style={[styles.infoText, { opacity: fadeInColorChange }]}>
        Nice Job!
      </Animated.Text>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  infoText: {
    color: '#fff',
    fontSize: 42,
    letterSpacing: 6,
    paddingVertical: 22,
  },
});
