import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0SY6Br76iJ-8FHuvBwhOk0xEunDSXW1o",
  authDomain: "store-db-b7b23.firebaseapp.com",
  projectId: "store-db-b7b23",
  storageBucket: "store-db-b7b23.appspot.com",
  messagingSenderId: "396941877374",
  appId: "1:396941877374:web:82f30f6f686a180003b82f",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt : 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup =() => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth)=> {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const snapshot = await getDoc(userDocRef);
    if(!snapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt
            })
        }catch(error){
            console.error(`Errro while creating user: ${error}`)
        }
    }

    return userDocRef;

}