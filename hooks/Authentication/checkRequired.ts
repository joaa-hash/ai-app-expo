import { validatePassword } from './validatePassword';

export const checkRequired = (email: string, password: string, verifyPassword: string) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return password === verifyPassword &&
    validatePassword(password, verifyPassword) &&
    reg.test(email)
    ? false
    : true;
};
