import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import the function from the realtime database module
//alias the `set` function as `firebaseSet`
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database'; //realtime

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
  const [bookshelves, setBookshelves] = useState([
    // give default shelf at first
    {cover: "img/index-ex1.png",
    title: "To Read",
    description: "Your to read shelf!",
    privacy: false,
    books: {}
  }
    // add book array to this state value, rename
    // only time u change state is in the use effect method
    // update database to update state
  ]);

  // // list of books per shelf state
  // const [shelfContent, setShelfContent] = useState([
  //   // give default shelf at first
  //   {
  //     id: null,
  //     books:
  //       [{cover: "",
  //       title: "",
  //       author: "",
  //       description: ""}
  //       // {cover: "",
  //       // title: "",
  //       // author: "",
  //       // description: ""} this is what the rest of the list would look like
  //       // question for OH: how would you access a book item..?
  //     ]
  //   }
  // ]);

  // pass in to addshelfform
  function addShelfCallback(newShelf) {
    // const userObj = currentUser;
    setBookshelves([...bookshelves, newShelf]);
  };

  // function addToShelfCallback(shelfId, bookData) {
  //   // loop through shelf
  //   for (const id in shelfContent) {
  //     if (id === shelfId) {
  //       setShelfContent(...shelfContent, shelfContent[id].books.push(bookData)); //???
  //     }
  //   }
  // }

  const navigateTo = useNavigate(); //navigation hook

  //effect to run when the component first loads
  useEffect(() => {
    //log in
    const auth = getAuth();
    //                 authenticator, a callback
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("signing in as", firebaseUser.displayName)
        console.log(firebaseUser);
        firebaseUser.userId = firebaseUser.uid;
        firebaseUser.userName = firebaseUser.displayName;
        firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
        setCurrentUser(firebaseUser);
      } else { //no user
        console.log("signed out");
        setCurrentUser(DEFAULT_USERS[0]); //change the null user
      }
    })

    // database stuff
    const db = getDatabase(); //"the database"
    const allShelvesRef = ref(db, "shelves/"+currentUser.uid);
    console.log(allShelvesRef);

    //when db value changes
    const offFunction = onValue(allShelvesRef, (snapshot) => {
      const valueObj = snapshot.val();
      //convert object into array
      const objKeys = Object.keys(valueObj);
      const objArray = objKeys.map((keyString) => {
        const theShelfObj = valueObj[keyString];
        theShelfObj.key = keyString;
        return theShelfObj;
      })
      setBookshelves(objArray);
    })

    function cleanup() {
      //when the component goes away, we turn off the listener
      offFunction();
    }
    return cleanup; //return instructions on how to turn off lights
  }, []) //array is list of variables that will cause this to rerun if changed

  const db = getDatabase(); //"the database"
  const allShelvesRef = ref(db, 'shelves');
  firebasePush(allShelvesRef, bookshelves);

  const loginUser = (userObj) => {
    console.log("logging in as", userObj.userName);
    console.log(userObj);
    setCurrentUser(userObj);
    if (userObj.userId !== null) {
      navigateTo("/"); //go to browse after login
    }
  }
  console.log(currentUser);
  console.log(bookshelves);

    return (
      <div>
        <Header currentUser={currentUser}/>
        <Routes>
          <Route index element={<Browse bookshelves={bookshelves}/>} />
          <Route path="/signin" element={<Splash currentUser={currentUser} loginCallback={loginUser} />} />

          <Route element={<ProtectedPage currentUser={currentUser} />}>
            <Route path="/bookshelves" element={<BookShelfList currentUser={currentUser} bookshelves={bookshelves}/>} />
            <Route path="/newshelf" element={<NewShelfForm addShelfCallback={addShelfCallback} />} />
            <Route path="/shelf-list/:shelfId" element={<ShelfContent bookshelves={bookshelves}/>} />
          </Route>
        </ Routes>
      <Footer />
      </div>
    );
  }

  function ProtectedPage(props) {
    //...determine if user is logged in
    if(props.currentUser.userId === null) { //if no user, send to sign in
      return <Navigate to="/signin" />
    }
    else { //otherwise, show the child route content
      return <Outlet />
    }
  }

  // O.Hour QUESTIONS:
  // 1. how to nav to browse AFTER sign in?
  // 2. creating a new shelf page everytime you create a new shelf