// src/boot/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCYCkY7zFM1O57jY-cK_-HDkPb72yPzQDk',
  authDomain: 'lojinha-jocenir.firebaseapp.com',
  projectId: 'lojinha-jocenir',
  storageBucket: 'lojinha-jocenir.firebasestorage.app',
  messagingSenderId: '67843352739',
  appId: '1:67843352739:web:85563f72f22569f501b716',
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

export { db }
