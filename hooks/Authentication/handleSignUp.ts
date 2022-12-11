import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export const handleSignUp = (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log(`Registered user: ${user.email}`);
    })
    .catch((error) => alert(error.message));
};
