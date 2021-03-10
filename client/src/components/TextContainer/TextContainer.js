import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import queryString from 'query-string';
import './TextContainer.css';

// hm logo ko function fire nhi krna redirect krna hai 
// function fire krke hi toh redicrect krenge?
//onclick pr keval ye function fire hoga redirect k liye href

function TextContainer({ users,room}){

  function linkGenerate(){
    // var { name,room } = queryString.parse(location.url);
    var link="http://localhost:4000/video/";

    window.location.href = link+encodeURI(room);

  }


  return(
  <div className="textContainer">
    

    <button className="button mt-20" onClick={linkGenerate}>Video call</button>
    <div>

    </div>
    {
      users
        ? (
          <div>
            <h1>People currently Online:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);
}

export default TextContainer;