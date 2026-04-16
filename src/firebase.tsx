import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyByaHsJYQgYp2R7jMTJWwOIV5lms0lYinU",
    authDomain: "lib-videogames.firebaseapp.com",
    projectId: "lib-videogames",
    storageBucket: "lib-videogames.firebasestorage.app",
    messagingSenderId: "340806760643",
    appId: "1:340806760643:web:1f073a0658567588f94a76"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);