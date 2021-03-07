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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  /** 
   * since we are making individual calls to add data to our firestore database
   * it is efficient to group the calls in one big batch so that whenever there is
   * an interruption in adding data to database (e.g failed internet connection),
   * the data that has already been added will fail and the database will
   * return back to the state it was b4 the said data started adding.
  */

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  /** 
   * batch.commit() to fire-off our batch requests
   * it returns a promise
   * when commit succeeds it will come back and resolve a void value(null value)
  */
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      /**
       * encodeURI converts a string into another string that a url can understand, process and use
       */
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;