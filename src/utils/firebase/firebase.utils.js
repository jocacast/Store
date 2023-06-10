import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0SY6Br76iJ-8FHuvBwhOk0xEunDSXW1o",
  authDomain: "store-db-b7b23.firebaseapp.com",
  projectId: "store-db-b7b23",
  storageBucket: "store-db-b7b23.appspot.com",
  messagingSenderId: "396941877374",
  appId: "1:396941877374:web:82f30f6f686a180003b82f",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);



export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation,
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const snapshot = await getDoc(userDocRef);
  if (!snapshot.exists()) {
    console.log('User not exists, creating...')
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
        console.log(error);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };

export const signOutUser =async () => await signOut(auth);

export const onAuthStateChangedListener=(callback)=>onAuthStateChanged(auth, callback);