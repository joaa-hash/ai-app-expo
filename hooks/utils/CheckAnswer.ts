import { ResultObject } from '../../types';

export const checkAnswer = (result: ResultObject, value: string): boolean => {
  return result?.correctResponse.find((el) => el?.toLowerCase() === value.toLowerCase())
    ? true
    : false;
};
