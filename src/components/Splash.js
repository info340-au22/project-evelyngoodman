import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
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

    return (
        <div id="splash">
        <h1 className="text-center">Sign In</h1>
        <div className="card bg-light">
      <div className="container card-body">
        <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj}/>
      </div>
    </div>
        </div>
    );
}