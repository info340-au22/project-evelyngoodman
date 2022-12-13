import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import the function from the realtime database module
//alias the `set` function as `firebaseSet`
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database'; //realtime

// import pages
import { Splash } from "./Splash.js"
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Browse } from "./Browse.js";
import { BookShelfList } from "./Bookshelf.js";
import { NewShelfForm } from "./NewShelfForm.js";
import { ShelfContent } from "./BookLists";

import DEFAULT_USERS from '../data/users.json';

export default function App(props) {

  // current user state
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]) //default to null user

  // bookshelves list state
  const [bookshelves, setBookshelves] = useState([]);

  function addShelfCallback(newShelf) {
    let title = newShelf.title.toLowerCase();
    title = title.replace(" ", "");
    const db = getDatabase();
    const shelfRef = ref(db, "shelves/"+currentUser.userId+"/"+title);
    firebaseSet(shelfRef, newShelf);
  };

  useEffect(() => {
    const db = getDatabase();
    const userShelvesRef = ref(db, "shelves/"+currentUser.userId);
    onValue(userShelvesRef, (snapshot) => {
      // this is where app will find data to display
        if (snapshot.exists()) {
          const snapshotArr = snapshot.val();
          let shelves = Object.values(snapshotArr)
          console.log(shelves);
          setBookshelves(shelves);
        } else {
          setBookshelves([]);
        }
    })
  }, [currentUser.userId])

  //effect to run when the component first loads
  useEffect(() => {
    // log in
    const auth = getAuth();
    // authenticator, a callback
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        let user = {};
        console.log("signing in as", firebaseUser.displayName)
        console.log(firebaseUser);
        user.userId = firebaseUser.uid;
        user.userName = firebaseUser.displayName;
        user.userImg = firebaseUser.photoURL || "/img/null.png";
        console.log(user);
        setCurrentUser(user);
      } else { //no user
        console.log("signed out");
        setCurrentUser(DEFAULT_USERS[0]); //change the null user
      }
    })
  }, []) //array is list of variables that will cause this to rerun if changed

  //testing:
  //console.log(bookshelves);
  //console.log(currentUser);

    return (
      <div>
        <Header currentUser={currentUser}/>
        <Routes>
          <Route index element={<Browse currentUser={currentUser} bookshelves={bookshelves}/>} />
          <Route path="/signin" element={<Splash currentUser={currentUser} />} />

          <Route element={<ProtectedPage currentUser={currentUser} />}>
            <Route path="/bookshelves" element={<BookShelfList currentUser={currentUser} bookshelves={bookshelves}/>} />
            <Route path="/newshelf" element={<NewShelfForm bookshelves={bookshelves} addShelfCallback={addShelfCallback} />} />
            <Route path="/shelf-list/:shelfId" element={<ShelfContent bookshelves={bookshelves} currentUser={currentUser}/>} />
          </Route>
        </ Routes>
      <Footer />
      </div>
    );
  }

  function ProtectedPage(props) {
    //...determine if user is logged in
    console.log(props.currentUser.userId)
    if(props.currentUser.userId === null) { //if no user, send to sign in
      return <Navigate to="/signin" />
    }
    else { //otherwise, show the child route content
      return <Outlet />
    }
  }