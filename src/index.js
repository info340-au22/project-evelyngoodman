import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

// firebase statements
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMITG6t6dPHkDP0plTYfQPS6uc6vcPjtk",
  authDomain: "goodreads-8d2c2.firebaseapp.com",
  projectId: "goodreads-8d2c2",
  storageBucket: "goodreads-8d2c2.appspot.com",
  messagingSenderId: "291691585436",
  appId: "1:291691585436:web:0c6585e9df96df4cc03259"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<App />
</BrowserRouter>);
