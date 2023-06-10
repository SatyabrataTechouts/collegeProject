import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: 'AIzaSyCXqdu2nhRE6FGVuprD1glbCJS_Xcvw90k',
    authDomain: '498449385469-on8ib26v0lpvj2latsc3arsnib2hs49g.apps.googleusercontent.com',
    projectId: 'foodapp-db4be',
    storageBucket: 'foodapp-db4be.appspot.com',
    messagingSenderId: '498449385469',
    appId: '1:498449385469:android:51a87ddac61e7ad4883b94',
  };
  
 
  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);