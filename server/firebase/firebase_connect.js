const firebase = require('firebase');

const app = firebase.initializeApp({
    apiKey: "AIzaSyBJ1XBgrU83WWBkli1RIECrB990-Paxi3s",
    authDomain: "nodejs-chat-app-af80c.firebaseapp.com",
    databaseURL: "https://nodejs-chat-app-af80c-default-rtdb.firebaseio.com/",
});

module.exports = app;


