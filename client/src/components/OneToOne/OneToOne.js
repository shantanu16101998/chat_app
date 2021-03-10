
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from "../Join/firebase"

import 'firebase/auth';

import './OneToOne.css';



// var admin = require("firebase-admin");

// var serviceAccount = require("../OneToOne/nodejs-chat-app-af80c-firebase-adminsdk-mcdnd-beeb227943.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nodejs-chat-app-af80c-default-rtdb.firebaseio.com"
// });





export default function OnetoOne(){

  var [room, setRoom] = useState('');
  var [name, setName] = useState('');




  function onsubmit(){
  
    var my_email = encodeURI(firebase.auth().currentUser.email);
    setName(firebase.auth().currentUser.displayName);
    room = encodeURI(room);
    // alert(room);
    var room_url = []

    room_url.push(my_email);
    room_url.push(encodeURI(room));
    room_url.sort();


    var finalurl = encodeURI(room_url[0] + room_url[1]);
    room = finalurl;
    setRoom(room);
    setName(firebase.auth().currentUser.displayName);
    window.location.replace(`/chat?name=${firebase.auth().currentUser.displayName}&room=${finalurl}`);
    


  }

  // function email_to_uid_mapper(email){
    
  //   alert("Email you gave "+ email);

  //   try{
  //     var opponent_user = admin.auth().getUserByEmail(email);
  //     console.log(opponent_user);
  //     // return opponent_user.uid;
  //   }
  //   catch (e){
  //     alert("referrence error");
  //     alert(e);
  //   }
  //   if(!opponent_user.email){
  //     alert("no user exist.");
  //     return {};
  //   }

  //   // console.log(opponent_user);
    
  // }

  return (
        <div className="joinOuterContainer" style={{ 
          backgroundImage: `url("https://i.pinimg.com/originals/2b/70/66/2b7066bfc69977ed519b7773e6f3b1fa.jpg")` 
        }}>
          <div className="joinInnerContainer">
            <h1 className="heading">Email id of friend!</h1>
            <div>
              {/* <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /> */}
            </div>
            <div>
              <input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => room = event.target.value} />
            </div>
            <button className={'button mt-20'} type="submit" onClick={onsubmit}>submit</button>
          </div>
        </div>
      );
}