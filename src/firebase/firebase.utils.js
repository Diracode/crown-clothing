import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBB4HrCb4javgBLkpO3lmttXARpo_betq0",
    authDomain: "crown-clothing-db-ac520.firebaseapp.com",
    projectId: "crown-clothing-db-ac520",
    storageBucket: "crown-clothing-db-ac520.appspot.com",
    messagingSenderId: "224183648078",
    appId: "1:224183648078:web:2d6d27696445fc39a8281f",
    measurementId: "G-N2YPT8X56X"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
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
      console.log('error creating user', error.message);
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