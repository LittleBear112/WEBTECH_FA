// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyAf5ojPd3-60LVb2vmp5wW7C56HpUTVwIk",
authDomain: "campus-lost-found-10931.firebaseapp.com",
projectId: "campus-lost-found-10931",
storageBucket: "campus-lost-found-10931.firebasestorage.app",
messagingSenderId: "993678137361",
appId: "1:993678137361:web:e5f82df404b95d516bf9b0"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };