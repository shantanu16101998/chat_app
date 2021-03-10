import React from 'react';
import firebase from "../../components/Join/firebase"
import 'firebase/auth'
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';
import { Link } from 'react-router-dom';

function onlogout(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>Room</h3>
      {/* <h3>Room</h3> */}

    </div>
    <div className="rightInnerContainer">
    <Link onClick = {onlogout} to= {`/`}>
      <a href="/" onClick={onlogout}><img src={closeIcon} alt="close icon" /></a>
      </Link>
    </div>
  </div>
);

export default InfoBar;

