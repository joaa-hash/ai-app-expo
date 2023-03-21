import { ResultObject, Answers } from '../../types';

export const disableTextInput = (result: ResultObject, param: Answers, value: number) => {
  if (value === 5) {
    return false;
  }
  if (value <= 5) {
    const mapCorrect = param.map((obj) => {
      return result?.correctResponse.find((el) => el?.toLowerCase() === obj.userInput.toLowerCase())
        ? true
        : false;
    });
    return mapCorrect.includes(true) ? false : true;
  } else {
    return false;
  }
};
