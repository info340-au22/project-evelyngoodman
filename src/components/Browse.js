import React from "react";
import { BookList } from "./BookLists";
import { Link } from "react-router-dom";
import WOC_DATA from '../data/WOC_data.json';
import D_DATA from '../data/D_data.json';

// props: data, title
function Recommended (props){
    return (
        <>
        <div id="rec-title" className="container">
        <h2>{props.title}</h2>
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