import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    'AIzaSyDo4DV6CQqyWzKkyuwKbTtewRPjvxYFCYM',
  authDomain: 'verse-ff44d.firebaseapp.com',
  projectId: 'verse-ff44d',
  storageBucket: 'verse-ff44d.appspot.com',
  messagingSenderId: '32842026326',
  appId:
    '1:32842026326:web:feed0a987c6cabfdc05af7',
};

// Initialize Firebase
const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider =
  new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
