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
    apiKey: "AIzaSyCXJDU3oif-x7Qeq5Y0-dEwZPLf8fFRDxs",
    authDomain: "task-manager-51f5a.firebaseapp.com",
    projectId: "task-manager-51f5a",
    storageBucket: "task-manager-51f5a.appspot.com",
    messagingSenderId: "628666499697",
    appId: "1:628666499697:web:2446c3ade44263e14fd1d0",
    measurementId: "G-F8102773B5"
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