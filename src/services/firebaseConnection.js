import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBoo3bs3Ru1q0CEF9bmeqq2L-e_XIvUjGY",
    authDomain: "sistema-chamados-14f43.firebaseapp.com",
    projectId: "sistema-chamados-14f43",
    storageBucket: "sistema-chamados-14f43.firebasestorage.app",
    messagingSenderId: "561138157000",
    appId: "1:561138157000:web:5c3003ab03ba75146dacfd",
    measurementId: "G-FE54SBMQRG"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);

  const auth = getAuth(firebaseApp);

  export { db, auth };