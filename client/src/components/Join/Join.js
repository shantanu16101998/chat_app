import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "./firebase.js"
import 'firebase/auth'

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ref = firebase.firestore().collection("users");
  // console.log(ref);
  var items = [];
  
  function getUser(){
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        items.push(doc.data());
      });
    })
  };

function onsubmit(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      window.location.replace(`/OneToOne`);

      // window.location.replace(`/chat?name=${user.displayName}&room=${room}`);
    } else {
      console.log("No user");
    }
  });
}

  


  return (
    <div className="joinOuterContainer" style={{ 
      backgroundImage: `url("https://i.pinimg.com/originals/2b/70/66/2b7066bfc69977ed519b7773e6f3b1fa.jpg")` 
    }}>
      <div className="joinInnerContainer">
        <h1 className="heading">Be a part of a beautiful Journey</h1>
        <div>
          {/* <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /> */}
        </div>
        <div>
          {/* <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /> */}
        </div>
        <button className={'button mt-20'} onClick={onsubmit} type="submit">Authenticate</button>

        
        <Link onClick = {e => (!name || !room) ? e.preventDefault() : null} to= {`/chat?name=${name}&room=${room}`}>
          {/* <button className={'button mt-20'} type="submit">Sign In</button> */}
        </Link>
      </div>
    </div>
  );
}
