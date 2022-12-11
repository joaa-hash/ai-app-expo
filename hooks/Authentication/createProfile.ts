import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const createProfile = async () => {
  try {
    const docRef = await addDoc(collection(db, 'profiles'), {
      firstName: '',
    });
  } catch (error) {
    console.error(`Error adding document: ${error}`);
  }
};
