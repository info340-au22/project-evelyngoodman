import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ShelfContent } from './BookLists';
import { getDatabase, ref, set as firebaseSet, onValue, push as firebasePush } from 'firebase/database'; //realtime


function Bookshelf(props) {
    // props: title, privacy, cover
    let shelfData = props.shelfData;
    let shelfContent = props.shelfContent;

    // make this its own component
    function privacyIcon() {
      if (shelfData.privacy === true) {
        return (
          <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16" >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg><small className="text-muted"> private</small></p>
        );
      } else {
        return (
          <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                  <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg><small className="text-muted"> public</small></p>
        );
      }
    }
  
    // create a shelf id for firebase key
    return (
        <div className="col">
        <div className="card border-light text-start" id="bookshelf-card">
          {/* TODO: how do i link to new shelf? */}
          <Link to={"/shelf-list/"+shelfData.title}><img src={shelfData.cover} className="card-img-top" alt={shelfData.title} /></Link>
          <div className="card-body">
            <p className="card-text">{shelfData.title}</p>
            <div>{privacyIcon()}</div>
          </div>
        </div>
      </div>
    );
}

// lift bookshleves state to app
export function BookShelfList(props) {
    let shelfContent = props.shelfContent;
    // for testing: console.log(props);
    let list = props.bookshelves.map((shelf) => {
      // pass in shelf data instead of 3 sep props
      return <Bookshelf shelfContent={shelfContent} shelfData={shelf} key={shelf.title}/>;
    })
    
    //useEffect(() => {
    //   // database stuff
    //   const db = getDatabase(); //"the database"
    //   const allShelvesRef = ref(db, "shelves");
  
    //   console.log(props.currentUser); // test
  
    //   // check for current user,
    //   // if user logged in, attach user to bookshelves
    //   // if no user, just display default shelf
    //   const offFunction = onValue(allShelvesRef, (snapshot) => {
    //     let value = snapshot.child(props.currentUser.uid).val();
    //     if (value !== null) {
    //       const keys = Object.keys(value);
    //       const objArray = keys.map((key) => {
    //         const copy = {
    //           ...value[key]
    //         };
    //         copy.key = key;
    //         return key;
    //       })
    //       props.setBookshelves(objArray);
    //     } else {
    //       props.setBookshelves(
    //         [{
    //           cover: "img/index-ex1.png",
    //           title: "To Read",
    //           description: "Your to read shelf!",
    //           privacy: false,
    //           books: {}
    //         }] // test this to see if i should set this to an empty array
    //       )
    //     }
    //   })
    // }, [ ]) // specify what thing that changes needs to rerun

   // modal is not working correctly
    return (
      <>
        <div id="lib" className="container">
          <h2>Your Library</h2>
          {/* TODO: add link to new page */}
          <Link to="/newshelf"><button type="button" className="btn btn-dark btn-md rounded-0">Create Shelf</button></Link>
        </div>
        <div className="container px-4">
            <div className="row gx-5 gy-5">
                {list}
            </div>
        </div>
      </>
    );
}