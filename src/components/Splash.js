import React from 'react';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

// do we even need a component for this?
export function Splash(props) {

  //the authenticator
  const auth = getAuth();

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