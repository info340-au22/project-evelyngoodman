import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

import DEFAULT_USERS from '../data/users.json';

// do we even need a component for this?
export function Splash(props) {
  const currentUser = props.currentUser;
  const loginFunction = props.loginCallback;

  //the authenticator
  const auth = getAuth();
    const navigateTo = useNavigate(); //navigation hook

  const configObj = {
    signInOptions: [
      { 
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID
      }
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => false //don't do anything special on signin
    },
    credentialHelper: 'none'
  }

//   onAuthStateChanged(auth, (firebaseUser) => {
//     if(firebaseUser){ //firebaseUser defined: is logged in
//       handleClick(firebaseUser);
//         console.log('logged in', firebaseUser.displayName);
//         //do something with firebaseUser (e.g. assign to a state variable)
//     }
//     else { //firebaseUser is undefined: is not logged in
//         console.log('logged out');
//     }
// });

  const handleClick = (userObj) => {
    // const userObj = firebaseUser.uid; //access button, not image
    loginFunction(userObj);
    navigateTo("");
  }

    return (
        <div id="splash">
        <h1 className="text-center">Sign In</h1>
        <div className="card bg-light">
      <div className="container card-body">
        <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} onClick={handleClick}/>
      </div>
    </div>
        </div>
    );
}