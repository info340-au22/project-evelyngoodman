import React from 'react';
import { Link } from "react-router-dom";


function Bookshelf(props) {
    // props: title, privacy, cover
    let shelfData = props.shelfData;

    // make this its own component
    function privacyIcon() {
      if (shelfData.privacy === true) {
        return (
          <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
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
    let currentUser = props.currentUser;
    // for testing: console.log(props);

    let list = props.bookshelves.map((shelf) => {
      // pass in shelf data instead of 3 sep props
      return <Bookshelf currentUser={currentUser} shelfData={shelf} key={shelf.title}/>;
    })

    return (
      <>
        <div id="lib" className="container">
          <h2>Your Library</h2>
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