import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
//import the function from the realtime database module
//alias the `set` function as `firebaseSet`
import { getDatabase, ref, child, get, update, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database'; //realtime

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

  //const [booklist, setBooklist] = useState([]);

  // pass in to addshelfform
  function addShelfCallback(newShelf) {
    // Get a key for a new Post.
    // const newPostKey = firebasePush(child(ref(db), 'shelves/'+currentUser.userId)).key;
    // const updates = {};
    // updates['shelves/'+ currentUser.userId + "/" + newPostKey] = newShelf;
    // setBookshelves([...bookshelves, newShelf]);
    // add shelf shelf to db
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
        }
    })
  }, [currentUser.userId])
  // .catch((error) => {
  //      console.error(error);
  // });

  // // when bookshelves changes, execute this use effect
  // // state variable is fed from database not the other way around
  // useEffect(() => {
  //   if (currentUser.userId !== null) {
  //     const db = getDatabase();
  //     const userShelvesRef = ref(db, "shelves/"+currentUser.userId);
  //     bookshelves.forEach((shelf) => {
  //       let title = "";
  //       title = shelf.title.toLowerCase();
  //       title = title.replace(" ", "");
  //       console.log(title);
  //       const shelfRef = ref(db, "shelves/"+currentUser.userId+"/"+title);
  //       console.log(shelfRef);
  //       firebaseSet(shelfRef, shelf);
  //     })
  //     //firebaseSet(userShelvesRef, bookshelves);
  //   }
  // }, [bookshelves]) 

  // // pass in to addshelfform
  // function addBookCallback(bookObj, shelfkey) {
  //   // Get a key for a new Post.
  //   // const newPostKey = firebasePush(child(ref(db), 'shelves/'+currentUser.userId)).key;
  //   // const updates = {};
  //   // updates['shelves/'+ currentUser.userId + "/" + newPostKey] = newShelf;
  //   setBooklist([...booklist, bookObj]);
  //   return shelfkey;
  // };

  // // when bookshelves changes, execute this use effect
  // useEffect(() => {
  //   if (currentUser.userId !== null) {

  //     const db = getDatabase();
  //     const userShelvesRef = ref(db, "shelves/"+currentUser.userId);
  //     firebaseSet(userShelvesRef, bookshelves);
  //   }
  // }, [booklist]) 

  const navigateTo = useNavigate(); //navigation hook

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
        // console.log(currentUser);

        // // database stuff
        // const db = getDatabase(); //"the database"
        // const userShelvesRef = ref(db, "shelves/"+user.userId);
        // // firebaseSet(userShelvesRef, bookshelves);
        // get(userShelvesRef).then((snapshot) => {
        //   if (snapshot.exists()) {
        //     console.log(snapshot.val());
        //     setBookshelves(snapshot.val());
        //   } else {
        //     console.log("No data available");
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
      } else { //no user
        console.log("signed out");
        setCurrentUser(DEFAULT_USERS[0]); //change the null user
      }
    })
    // console.log(currentUser);

    // database stuff
    // const db = getDatabase(); //"the database"
   //  const userShelvesRef = ref(db, "shelves/"+currentUser.userId);
    // firebaseSet(userShelvesRef, bookshelves);
    // allShelvesRef.removeValue();

    // //when db value changes
    // const offFunction = onValue(userShelvesRef, (snapshot) => {
    //   const valueObj = snapshot.val();
    //   //convert object into array
    //   const objKeys = Object.keys(valueObj);
    //   const objArray = objKeys.map((keyString) => {
    //     const theShelfObj = valueObj[keyString];
    //     theShelfObj.key = keyString;
    //     return theShelfObj;
    //   })
    //   setBookshelves(objArray);
    // })

    // function cleanup() {
    //   //when the component goes away, we turn off the listener
    //   offFunction();
    // }
    // return cleanup; //return instructions on how to turn off lights
  }, []) //array is list of variables that will cause this to rerun if changed

  // const db = getDatabase(); //"the database"
  // const allShelvesRef = ref(db, 'shelves');
  // firebasePush(allShelvesRef, bookshelves);
  // console.log(currentUser);
   console.log(bookshelves);

    return (
      <div>
        <Header currentUser={currentUser}/>
        <Routes>
          <Route index element={<Browse currentUser={currentUser} bookshelves={bookshelves}/>} />
          <Route path="/signin" element={<Splash currentUser={currentUser} />} />

          <Route element={<ProtectedPage currentUser={currentUser} />}>
            <Route path="/bookshelves" element={<BookShelfList currentUser={currentUser} bookshelves={bookshelves}/>} />
            <Route path="/newshelf" element={<NewShelfForm addShelfCallback={addShelfCallback} />} />
            <Route path="/shelf-list/:shelfId" element={<ShelfContent bookshelves={bookshelves} currentUser={currentUser}/>} />
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