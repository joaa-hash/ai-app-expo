import { Profile } from '../../types';
import { validatePassword } from './validatePassword';

export const checkRequiredForRegister = (
  email: string,
  password: string,
  verifyPassword: string,
  profile: Profile
) => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return password === verifyPassword &&
    validatePassword(password, verifyPassword) &&
    reg.test(email) &&
    profile?.firstName.length! > 0
    ? false
    : true;
};
