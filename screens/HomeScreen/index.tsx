import React, { useEffect, useState } from 'react';
import { TextInput, Platform, TouchableWithoutFeedback, Animated } from 'react-native';
import {
  modalIn,
  modalOut,
  modalFadeIn,
  modalFadeOut,
  checkStyles,
  checkAnswer,
  getTypeText,
  disableTextInput,
  hydrateAnswers,
} from '../../hooks';
import { Container } from '../../components';
import { Header } from '../../components/Header';
import { GameBoard } from '../../components/GameBoard';
import { ImageCarousel } from '../../components/ImageCarousel';
import { InitialResultObject } from '../../models/InitialResultObject';
import { InitialAnswerState } from '../../models/InitialAnswerState';
import { ResultObject, Answer } from '../../types';
import { Details } from '../Information/index';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import { View, ScrollView, Text, SubText, AnimatedView } from '../../components/Theme/Themed';

export const Home: React.FC = () => {
  const [modalState, setModalState] = useState(false);
  const [result, setResult] = useState<ResultObject>(InitialResultObject);
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [answer, setAnswer] = useState<Answer>(InitialAnswerState);

  const textInputRef = React.createRef<TextInput>();

  useEffect(() => {
    setGuesses(guesses);
    disableTextInput(result, answer, guesses);
    hydrateAnswers(userInput, answer, guesses);
    setAnswer(hydrateAnswers(userInput, answer, guesses));
    textInputRef.current?.focus();
  }, [guesses]);

  useEffect(() => {
    setResult(Result.result);
    setAnswer(InitialAnswerState);
    setModalState(false);
    setUserInput('');
  }, [result]);

  useEffect(() => {
    setUserInput('');
    if (guesses > 0 && checkAnswer(result, answer[guesses - 1].userInput) === true) {
      setTimeout(() => {
        setModalState(true);
      }, 2800);
    } else {
      return;
    }
  }, [answer]);

  useEffect(() => {
    modalIn();
    modalOut();
  }, [modalState, result]);

  return (
    <Container>
      <Details result={result} modalState={modalState} setModalState={setModalState} />
      <TouchableWithoutFeedback
        onPress={() => {
          setModalState(false);
          textInputRef.current?.focus();
        }}
      >
        <AnimatedView
          style={[
            checkStyles(styles.containerMobile, styles.containerWeb, Platform),
            { opacity: modalState === true ? modalFadeIn : modalFadeOut },
          ]}
        >
          {Platform.OS === 'web' ? (
            <Header modalState={modalState} setModalState={setModalState} />
          ) : (
            <></>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            contentContainerStyle={checkStyles(styles.homePageMobile, styles.homePageWeb, Platform)}
          >
            <View style={styles.typeContainer}>{getTypeText(result)}</View>
            <TextInput
              editable={disableTextInput(result, answer, guesses)}
              style={styles.input}
              value={userInput.replace(/[`~0-9@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')}
              onChangeText={(input) =>
                setUserInput(input.replace(/[`~0-9@#%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''))
              }
              onSubmitEditing={() => {
                if (userInput.length !== 0) {
                  setGuesses(guesses + 1);
                } else {
                  return;
                }
              }}
              clearTextOnFocus={false}
              autoFocus={false}
              ref={textInputRef}
              maxLength={38}
            />
            <View style={styles.triviaContent}>
              <View style={styles.aiHintContainer}>
                <ImageCarousel
                  textInputRef={textInputRef}
                  result={result}
                  guesses={guesses}
                  checkAnswer={checkAnswer}
                />
                <View style={styles.hintInfo}>
                  <Text style={styles.infoText}>
                    <Text style={[styles.infoText, { fontWeight: '700', fontSize: 28 }]}>
                      {(5 - guesses).toString()}
                    </Text>{' '}
                    Guesses Left!
                  </Text>
                  <SubText style={[styles.infoText, { fontSize: 12, paddingTop: 8 }]}>
                    Type anywhere to get started
                  </SubText>
                </View>
              </View>
              <GameBoard answer={answer} userInput={userInput} guesses={guesses} result={result} />
            </View>
          </ScrollView>
        </AnimatedView>
      </TouchableWithoutFeedback>
    </Container>
  );
};