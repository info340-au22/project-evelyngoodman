import React from "react";
import { RecList } from "./BookLists";

// props: title
// QUESTION: How do I make sure the rec list contains unique books?
// do i pass in an array of objects?
// props: data, title
function Recommended (props){
    return (
        <>
        <div id="rec-title" className="container">
        <h2>{props.title}</h2>
        </div>
        <div className="container">
            <div className="item">
                <RecList bookData={props.data}/>
            </div>
        </div>
    </>
    )
}

export function Browse (props) {
    return (
        <>
    <div id="header" className="container">
      <div id="header-text" className="item">
        <h1>Find Your Next Read</h1>
        <p>Explore book lists curated for you that prioritize underrepresented authors, stories, and characters.</p>
        <button type="button" className="btn btn-dark btn-lg rounded-0">Explore</button>
      </div>
      <div className="item">
        <div className="container">
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
    {/* <Recommended title="Written by Women of Color" data={}/>  */}
    {/* get data from: https://electricliterature.com/62-books-by-women-of-color-to-read-in-2022/ */}
    </>
    )
}