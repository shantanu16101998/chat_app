import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJ1XBgrU83WWBkli1RIECrB990-Paxi3s",
    authDomain: "nodejs-chat-app-af80c.firebaseapp.com",
    databaseURL: "https://nodejs-chat-app-af80c-default-rtdb.firebaseio.com",
    projectId: "nodejs-chat-app-af80c",
    storageBucket: "nodejs-chat-app-af80c.appspot.com",
    messagingSenderId: "367132506442",
    appId: "1:367132506442:web:b69861570c5badd98669b3",
    measurementId: "G-0M0DKYNV7W"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;