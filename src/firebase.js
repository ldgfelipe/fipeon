import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfajGFXwdIYtIB8pWnTHg_qz_vbC0aVJM",
    authDomain: "fipeon.firebaseapp.com",
    projectId: "fipeon",
    storageBucket: "fipeon.appspot.com",
    messagingSenderId: "70029987665",
    appId: "1:70029987665:web:bb3b00b770b6c6d3070d70",
    measurementId: "G-9ZYLC67S0Q"
  };

firebase.initializeApp(firebaseConfig)
export const fb = firebase
export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
