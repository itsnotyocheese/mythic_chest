// components/FirebaseAuthUI.js
'use client';
import { useEffect } from 'react';
import { auth } from '../lib/firebaseConfig';
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const FirebaseAuthUI = () => {
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase.
    const ui =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        //GoogleAuthProvider.PROVIDER_ID,
      ],
      requireDisplayName: false,
      signInSuccessUrl: '/profile', // Redirect after sign-in
      signInFlow: 'popup', // Popup mode instead of redirect
      tosUrl: '/terms', // Terms of service URL
      privacyPolicyUrl: '/privacy-policy', // Privacy policy URL
    };

    // Start the Firebase UI.
    ui.start('#firebaseui-auth-container', uiConfig);

    // Clean up UI on unmount
    return () => {
      ui.reset();
    };
  }, []);

  return <div id="firebaseui-auth-container"></div>;
};

export default FirebaseAuthUI;
