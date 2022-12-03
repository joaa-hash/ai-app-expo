import React, { useCallback, useEffect } from 'react';
import { View, Text, AnimatedText } from '../Theme/Themed';
import { Answer, ResultObject } from '../../types';
import { styles } from './styles';
import {
  colorChangeIn,
  colorChangeOut,
  fadeInColorChange,
  fadeOutColorChange,
  checkAnswer,
  setFontSize,
} from '../../hooks/index';
import { showWinMessage } from '../WinMessage';

interface Props {
  answer: Answer;
  userInput: string;
  guesses: number;
  result: ResultObject;
}

export const GameBoard: React.FC<{
  answer: Answer;
  userInput: string;
  guesses: number;
  result: ResultObject;
}> = (props: Props) => {
  const setGuessColor = (input: string) => {
    return checkAnswer(props.result, input) ? 'green' : 'red';
  };

  const showGameBoard = useCallback(
    (answer: Answer, userInput: string, guesses: number): JSX.Element[] => {
      console.log(userInput);
      console.log(answer);

      const toDisplay = answer.map((obj, index) => {
        if (obj.userInput.length === 0 && index === guesses) {
          return (
            <View key={obj.id} style={styles.answerListView}>
              <Text
                style={[styles.answerList, { fontSize: setFontSize(userInput.length) }]}
                numberOfLines={1}
              >
                {userInput}
              </Text>
            </View>
          );
        } else {
          if (checkAnswer(props.result, obj.userInput) !== true && obj.id <= guesses) {
            if (userInput.length === 0 && obj.id === guesses) {
              return (
                <View key={obj.id} style={styles.answerListView}>
                  <AnimatedText
                    style={[
                      styles.answerList,
                      {
                        fontSize: setFontSize(obj.userInput.length),
                        position: 'absolute',
                        alignSelf: 'center',
                        opacity: fadeOutColorChange,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {obj.userInput}
                  </AnimatedText>
                  <AnimatedText
                    style={[
                      styles.answerList,
                      {
                        fontSize: setFontSize(obj.userInput.length),
                        color: setGuessColor(obj.userInput),
                        opacity: fadeInColorChange,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {obj.userInput}
                  </AnimatedText>
                </View>
              );
            }
            return (
              <View key={obj.id} style={styles.answerListView}>
                <AnimatedText
                  style={[
                    styles.answerList,
                    {
                      fontSize: setFontSize(obj.userInput.length),
                      color: setGuessColor(obj.userInput),
                    },
                  ]}
                  numberOfLines={1}
                >
                  {obj.userInput}
                </AnimatedText>
              </View>
            );
          } else {
            return (
              <View key={obj.id} style={styles.answerListView}>
                <AnimatedText
                  style={[
                    styles.answerList,
                    {
                      fontSize: setFontSize(obj.userInput.length),
                      position: 'absolute',
                      alignSelf: 'center',
                      opacity: fadeOutColorChange,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {obj.userInput}
                </AnimatedText>
                <AnimatedText
                  style={[
                    styles.answerList,
                    {
                      fontSize: setFontSize(obj.userInput.length),
                      color: setGuessColor(obj.userInput),
                      opacity: fadeInColorChange,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {obj.userInput}
                </AnimatedText>
              </View>
            );
          }
        }
      });

      return toDisplay;
    },
    [props.userInput]
  );

  useEffect(() => {
    colorChangeOut();
    setTimeout(() => colorChangeIn(), 1000);
  }, [props.userInput]);

  return (
    <View style={styles.answerContainer}>
      {showGameBoard(props.answer, props.userInput, props.guesses)}
      {showWinMessage(props.result, props.answer, props.guesses)}
    </View>
  );
};
