// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    initializeAuth,
    getReactNativePersistence,
    sendPasswordResetEmail
} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    updateDoc,
    increment,
    onSnapshot
} from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    /* PRIVATE */
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(firebaseApp);

export {
    db,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    deleteDoc,
    updateDoc,
    increment,
    onSnapshot,
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
};
