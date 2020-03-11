import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyARmXfu6R2dfWKjBaa1lJIwzYJS0UxF7EE',
  authDomain: 'crwn-db-27b10.firebaseapp.com',
  databaseURL: 'https://crwn-db-27b10.firebaseio.com',
  projectId: 'crwn-db-27b10',
  storageBucket: 'crwn-db-27b10.appspot.com',
  messagingSenderId: '152298961711',
  appId: '1:152298961711:web:6fed2b70300d9208b9bfda',
  measurementId: 'G-PHNM0L62L8'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('Error creating a user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
