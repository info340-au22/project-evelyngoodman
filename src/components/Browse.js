import React from "react";
import { BookList } from "./BookLists";
import { Link } from "react-router-dom";
import WOC_DATA from '../data/WOC_data.json';
import D_DATA from '../data/D_data.json';

// props: title
// QUESTION: How do I make sure the rec list contains unique books?
// do i pass in an array of objects?
// props: data, title
function Recommended (props){
    return (
        <>
        <div id="rec-title" className="container">
        <h2>{props.title}</h2>
        <p><Link to='/'>See all <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg></Link></p>
        </div>
        <div className="container">
            <div className="row">
                <BookList bookshelves={props.bookshelves} bookData={props.data} currentUser={props.currentUser}/>
            </div>
        </div>
    </>
    );
}

export function Browse (props) {
    return (
        <>
    <div id="header" className="container">
      <div id="header-text" className="item">
        <h1>Find Your Next Read</h1>
        <p>Explore book lists curated for you that prioritize underrepresented authors, stories, and characters.</p>
        <a href="#explore"><button type="button" className="btn btn-dark btn-lg rounded-0">Explore</button></a>
        {/* for button interaction: scroll to rec lists on same page */}
      </div>
      <div className="item">
        <div id="header-covers" className="container">
          <div className="item header-item">
            {/* <!-- start card --> */}
              <img id="card-odd" src="img/header2.jpg" className="card-img-top" alt="..." />
            {/* <!-- end card --> */}
          </div>
          <div className="item header-item">
            {/* <!-- start card --> */}
              <img id="card-even" src="img/header1.jpg" className="card-img-top" alt="..." />
            {/* <!-- end card --> */}
          </div>
          <div className="item header-item">
            {/* <!-- start card --> */}
              <img id="card-odd" src="img/header3.jpg" className="card-img-top" alt="..." />
            {/* <!-- end card --> */}
          </div>
        </div>
      </div>
    </div>
    <div id="explore">
    <Recommended title="Written by Women of Color" data={WOC_DATA} bookshelves={props.bookshelves} currentUser={props.currentUser}/>
    <Recommended title="Featuring Characters with Disabilities" data={D_DATA} bookshelves={props.bookshelves} currentUser={props.currentUser}/>
    </div>
    {/* get data from: https://electricliterature.com/62-books-by-women-of-color-to-read-in-2022/ */}
    </>
    );
}