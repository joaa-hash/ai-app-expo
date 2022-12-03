export const setFontSize = (input: number) => {
  return input < 21
    ? 26
    : input >= 21 && input <= 24
    ? 22
    : input >= 24 && input <= 28
    ? 20
    : input >= 28 && input <= 38
    ? 18
    : 26;
};
