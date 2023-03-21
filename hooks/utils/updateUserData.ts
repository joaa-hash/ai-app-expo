import { checkAnswer } from '..';
import { IProfile } from '../../models/BaseProfile';
import { Answers, Profile, ResultObject } from '../../types';

export const updateUserData = (
  guesses: number,
  result: ResultObject,
  answers: Answers,
  userData: Profile,
  setUserData: React.Dispatch<React.SetStateAction<Profile>>
) => {
  if (guesses > 0) {
    const win = checkAnswer(result, answers[guesses - 1].userInput);
    if (win) {
      let guessEntries;
      let newGuessHistory: IProfile['guessHistory'] | undefined;
      if (userData) {
        Object.keys(userData).map((key, _index) => {
          if (key === 'guessHistory') {
            guessEntries = Object.entries(userData[key]);
          }
        });

        if (guessEntries) {
          const updateGuessHistory = (entryValue: number, key: number) => {
            if (guesses === key) {
              return entryValue + 1;
            } else {
              return entryValue;
            }
          };
          newGuessHistory = {
            1: updateGuessHistory(guessEntries[0][1], 1),
            2: updateGuessHistory(guessEntries[1][1], 2),
            3: updateGuessHistory(guessEntries[2][1], 3),
            4: updateGuessHistory(guessEntries[3][1], 4),
            5: updateGuessHistory(guessEntries[4][1], 5),
          };
        }

        const newUserData: IProfile = {
          firstName: userData.firstName,
          gamesPlayed: userData?.gamesPlayed + 1,
          guessHistory: newGuessHistory ? newGuessHistory : userData.guessHistory,
          longestStreak:
            userData.longestStreak >= userData.streak + 1
              ? userData.longestStreak
              : userData.streak + 1,
          streak: userData.streak + 1,
          wins: userData.wins + 1,
        };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        setUserData(newUserData);
      }
    } else {
      if (guesses < 5 && !answers[guesses].userInput.length) return;
      if (userData && checkAnswer(result, answers[guesses - 1].userInput)) {
        const newUserData: IProfile = {
          firstName: userData.firstName,
          gamesPlayed: userData?.gamesPlayed + 1,
          guessHistory: {
            1: userData.guessHistory[1],
            2: userData.guessHistory[2],
            3: userData.guessHistory[3],
            4: userData.guessHistory[4],
            5: userData.guessHistory[5],
          },
          longestStreak: userData.longestStreak,
          streak: 0,
          wins: userData.wins,
        };
        localStorage.setItem('userData', JSON.stringify(newUserData));
        setUserData(newUserData);
      }
    }
  }
};
