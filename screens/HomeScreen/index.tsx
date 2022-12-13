import React, { useEffect, useState } from 'react';
import { TextInput, Platform, TouchableWithoutFeedback } from 'react-native';
import { View, ScrollView, TextPrimary, SubTextPrimary } from '../../components/Theme/Themed';
import { Container, Header, GameBoard, Category, ImageCarousel } from '../../components';
import {
  checkStyles,
  checkAnswer,
  disableTextInput,
  hydrateAnswers,
  useColorScheme,
} from '../../hooks';
import { InitialResultObject } from '../../models/InitialResultObject';
import { InitialAnswerState } from '../../models/InitialAnswerState';
import { ResultObject, Answers } from '../../types';
import { SettingsModal } from '../SettingsModal/index';
import { styles } from './styles';
import * as Result from '../../hooks/temp.json';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '../../constants/Colors';
import AuthModal from '../AuthModal';

export const Home: React.FC = () => {
  const theme = useColorScheme();
  const [authModalState, setAuthModalState] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [settingsModalState, setSettingsModalState] = useState(false);
  const [result, setResult] = useState<ResultObject>(InitialResultObject);
  const [userInput, setUserInput] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [answers, setAnswers] = useState<Answers>(InitialAnswerState);

  const textInputRef = React.createRef<TextInput>();

  useEffect(() => {
    setGuesses(guesses);
    disableTextInput(result, answers, guesses);
    hydrateAnswers(userInput, answers, guesses);
    setAnswers(hydrateAnswers(userInput, answers, guesses));
    textInputRef.current?.focus();
  }, [guesses]);

  useEffect(() => {
    if (!authModalState && !settingsModalState && !login && !register) {
      textInputRef.current?.focus();
    }
  }, [authModalState, settingsModalState, login, register]);

  useEffect(() => {
    setResult(Result.result);
    setAnswers(InitialAnswerState);
    setSettingsModalState(false);
    setUserInput('');
  }, [result]);

  useEffect(() => {
    setUserInput('');
    if (guesses > 0 && checkAnswer(result, answers[guesses - 1].userInput) === true) {
      setTimeout(() => {
        setSettingsModalState(true);
      }, 2800);
    } else {
      return;
    }
  }, [answers]);

  const config = {
    duration: 500,
    easing: Easing.ease,
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(settingsModalState || authModalState ? 0.3 : 1, config);
    return {
      opacity,
    };
  });

  return (
    <Container>
      <SettingsModal
        result={result}
        settingsModalState={settingsModalState}
        setSettingsModalState={setSettingsModalState}
        textInputRef={textInputRef}
        answers={answers}
        guesses={guesses}
      />
      <AuthModal
        setLogin={setLogin}
        login={login}
        setRegister={setRegister}
        register={register}
        authModalState={authModalState}
        setAuthModalState={setAuthModalState}
        textInputRef={textInputRef}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          setSettingsModalState(false);
          setAuthModalState(false);
          textInputRef.current?.focus();
        }}
      >
        <Animated.View
          style={[
            styles.containerMobile,
            animatedStyle,
            { backgroundColor: Colors[theme]['background'] },
          ]}
        >
          {Platform.OS === 'web' ? (
            <Header
              settingsModalState={settingsModalState}
              setSettingsModalState={setSettingsModalState}
              authModalState={authModalState}
              setAuthModalState={setAuthModalState}
              login={login}
              setLogin={setLogin}
              register={register}
              setRegister={setRegister}
              textInputRef={textInputRef}
            />
          ) : (
            <></>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            contentContainerStyle={checkStyles(styles.homePageMobile, styles.homePageWeb, Platform)}
          >
            <View style={styles.typeContainer}>{Category(result)}</View>
            <TextInput
              editable={disableTextInput(result, answers, guesses)}
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
                <ImageCarousel textInputRef={textInputRef} result={result} guesses={guesses} />
                <View style={styles.hintInfo}>
                  <TextPrimary style={styles.infoText}>
                    <TextPrimary style={[styles.infoText, { fontWeight: '700', fontSize: 28 }]}>
                      {(5 - guesses).toString()}
                    </TextPrimary>{' '}
                    Guesses Left!
                  </TextPrimary>
                  <SubTextPrimary>Type anywhere to get started</SubTextPrimary>
                </View>
              </View>
              <GameBoard
                answer={answers}
                userInput={userInput}
                guesses={guesses}
                result={result}
                textInputRef={textInputRef}
              />
            </View>
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Container>
  );
};
