import { ResultObject, Answer } from '../../types';

export const disableTextInput = (result: ResultObject, param: Answer, value: number) => {
  if (value === 5) {
    return false;
  }
  if (value <= 5) {
    const mapCorrect = param.map((obj) => {
      console.log(obj.userInput);
      return result?.correctResponse.find((el) => el?.toLowerCase() === obj.userInput.toLowerCase())
        ? true
        : false;
    });
    return mapCorrect.includes(true) ? false : true;
  } else {
    return false;
  }
};
