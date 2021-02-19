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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;