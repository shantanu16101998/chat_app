import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import firebase from "../Join/firebase"
import 'firebase/auth'
import { DoEncrypt,DoDecrypt } from "./aes"


import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';
const messageRef=firebase.firestore().collection('messages');
const ENDPOINT = 'http://localhost:5000/';

let socket;

var aes256 = require("aes256");
var key="fUjXnZr4u7x!A%D*G-aPdSgVkYp3s5v8";



const Chat = ({ location }) => {
  var [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    
    var { name,room } = queryString.parse(location.search);
    console.log("room : "+room)
    
    socket = io(ENDPOINT);
    
    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
      
      const query=messageRef.orderBy("time").limit(10);
      
      /*
        Room filter will filter chat acc to room. 
      */
      const room_filter = messageRef.orderBy("time").limit(400).where("reciever","==",room);
      // console.log("room filtered chats "+ room_filter + room);
      
  room_filter
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

          var message = {
            text: doc.data().data,
            user: doc.data().sender.toLowerCase(),
          }

          console.log("db fetch",message.text);
      

          var mii="";
          
        if(message && message.user != "admin" && message.text != ""){
          try{
            mii=aes256.decrypt(key,message.text);
          }
          catch(e){
            console.log("catch block message",message.text);
          }

        }
        
        console.log("mii is",mii);

        
        message.text = mii;

          setMessages(messages => [ ...messages, message]);
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
      // console.log("Message which gave error ",message);
  });

    });
  }, [ENDPOINT, location.search]);
 
  // var room_key = aes256.encrypt(room,master_key);
  



  useEffect(() => {
    
    socket.on('message', message => {
      
      /*
        Decrytion will be done here...........
      */
     var m = message;
     m.user = message.user;

        try{
          if(message.user !== "admin"){
            m.text =  aes256.decrypt(key,message.text);
            console.log("Decrypted message",m.text);
          }
          
        }
        catch (e){
          console.log(e,message);
        }

      setMessages(messages => [ ...messages, m ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);


  const sendMessage = async(event) => {


      
    event.preventDefault();
    
    var m="";
    
    if(message) {
      m =  aes256.encrypt(key,message);
    }

      
      
      // socket.emit('sendMessage', message, () => setMessage(''));

      if(m !== ""){
        console.log("U sent",m);
        socket.emit('sendMessage', m, () => setMessage(''));
        await messageRef.add({
          data:m,
          room:{room},
          sender: firebase.auth().currentUser.displayName,
          time:firebase.firestore.FieldValue.serverTimestamp(),
          reciever: room,
          
        })
      }
      
        
      
    }

    
  return (
    <div className="outerContainer" style={{ 
      backgroundImage: `url("https://i.pinimg.com/originals/2b/70/66/2b7066bfc69977ed519b7773e6f3b1fa.jpg")` 
    }}>
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>

      <TextContainer users={users} room={room}/>
    </div>
  );
}

export default Chat;
