
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAdbi3Cy17TduKcLrtFHh7WQge78f1r4gU",
  authDomain: "docsave-1037a.firebaseapp.com",
  projectId: "docsave-1037a",
  storageBucket: "docsave-1037a.appspot.com",
  messagingSenderId: "156424469641",
  appId: "1:156424469641:web:a57bc838a54b03a5fc5a58"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Export
export const docsDb = firebase.storage();
export default firebase;