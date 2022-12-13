import React from 'react';
import { Answers, ResultObject } from '../../types';
import { View, TextPrimary, SubHead } from '../Theme/Themed';
import { styles } from './styles';

type Props = {
  result: ResultObject;
  guesses: number;
  answers: Answers;
};

export const Distribution = (props: Props): JSX.Element => {
  const distributionMap = (guesses: number, answers: Answers): JSX.Element[] => {
    return answers.map((object) => {
      return (
        <View style={styles.mapContainer}>
          <TextPrimary style={styles.answerIndex}>{object.id}:</TextPrimary>
          <TextPrimary style={styles.input}>{object.userInput}</TextPrimary>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <SubHead>Guess Distribution:</SubHead>
      <TextPrimary>{props.guesses}</TextPrimary>
      <View style={styles.mapContainer}>{distributionMap(props.guesses, props.answers)}</View>
    </View>
  );
};
