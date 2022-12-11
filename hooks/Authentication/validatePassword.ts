export const validatePassword = (password: string, verifyPassword: string) => {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#\$%\^&\*])(?=.{8,})/;
  // Password example:
  // abc-123-ABC

  return reg.test(password) && reg.test(verifyPassword) ? true : false;
};
