import { Answer } from '../../types';

export const hydrateAnswers = (param: string, state: Answer, guesses: number) => {
  const replaceArray = state.map((obj) => {
    if (obj.id === guesses) {
      return { id: guesses, userInput: param };
    }
    return obj;
  });
  return replaceArray;
};
