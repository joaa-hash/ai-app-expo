import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text } from '../Theme/Themed';
import { Answer, ResultObject } from '../../types';
import { styles } from './styles';
import { checkAnswer, setFontSize } from '../../hooks/index';
import { showWinMessage } from '../WinMessage';
import { TextColorChangeAnimation } from '../Animations/TextColorChangeAnimation';
import { TextInput } from 'react-native';

type Props = {
  answer: Answer;
  userInput: string;
  guesses: number;
  result: ResultObject;
  textInputRef: React.RefObject<TextInput>;
};

export const GameBoard = ({ answer, userInput, guesses, result, textInputRef }: Props) => {
  const setGuessColor = (input: string) => {
    return checkAnswer(result, input) ? 'green' : 'red';
  };

  const showAnswers = useCallback(
    (answer: Answer, userInput: string, guesses: number, inputRef: Props['textInputRef']) => {
      return answer.map((obj, index) => {
        return obj.userInput.length === 0 && index === guesses ? (
          <View key={obj.id} style={styles.answerListView}>
            <Text
              style={[styles.answerList, { fontSize: setFontSize(userInput.length) }]}
              numberOfLines={1}
            >
              {userInput}
            </Text>
          </View>
        ) : (
          <View key={obj.id} style={styles.answerListView}>
            <TextColorChangeAnimation
              color={setGuessColor(obj.userInput)}
              input={obj.userInput}
              inputRef={inputRef}
            />
          </View>
        );
      });
    },
    [userInput]
  );

  return (
    <View style={styles.answerContainer}>
      {showAnswers(answer, userInput, guesses, textInputRef)}
      {showWinMessage(result, answer, guesses)}
    </View>
  );
};
