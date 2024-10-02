
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCB_WqC55mGO3iW0y_885QduJNM5WEXV7g",
  authDomain: "aura-ai-8310f.firebaseapp.com",
  projectId: "aura-ai-8310f",
  storageBucket: "aura-ai-8310f.appspot.com",
  messagingSenderId: "157301921692",
  appId: "1:157301921692:web:c56a1cd511e4a8d1d4da59",
  measurementId: "G-XG5F5GMCQH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Export
export const docsDb = firebase.storage();
export default firebase;