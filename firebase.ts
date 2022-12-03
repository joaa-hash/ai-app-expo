// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBd17CWCLO0cRi8ijOr8iwcOZy8-eS7vD4',
  authDomain: 'triv-ai.firebaseapp.com',
  projectId: 'triv-ai',
  storageBucket: 'triv-ai.appspot.com',
  messagingSenderId: '1064475691026',
  appId: '1:1064475691026:web:11d1eca2735ca693a5f0cb',
  measurementId: 'G-FEZGKTCJHM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { auth, db };
