import React from "react";
import { Link } from "react-router-dom";
import RECLIST_DATA from '../data/reclist_data.json'

// CONTAINS: Components for generic book cards used throughout the app
//           List components for the reccommended lists on the browse page
//           List components for the shelvedbooks in a particular bookshelf

// generic book card
function BookCard (props) {
    let bookData = props.bookData;
    // props: cover, title, author
    return (
        <div id="book-card" className="card border-0">
        <img src={bookData.cover} className="card-img-top" alt={bookData.title} />
        <div className="card-body">
          <h5 className="card-title">{bookData.title}</h5>
          <p className="card-text">By {bookData.author}</p>
          <button type="button" className="btn btn-dark btn-sm rounded-0">Read More</button>
        </div>
      </div>
    );
}

// for browse page
// props: object containing book info
export function RecList (props) {
    const data =  props.bookData;
    let list = data.map((book) => {
        return <BookCard bookData={book} key={book.title}/>;
    });
    console.log(list)
    return (
        <>{list}</>
    );
}

// props: tag
function Tag(props) {
    return (
        <span className="badge rounded-pill bg-secondary">{props.tag}</span>
    );
}

// for bookshelves
export function ShelfList (props) {
    return (
        <>
        <div id="lib" className="container">
        <p><Link to='/bookshelves'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg> back to bookshelves</Link></p>
        </div>
        <div className="container justify-content-center">
        <h1>To Read</h1>
        </div>
        <div className="flex-container">
            <section className="one">
            <h2 className="text-start" id="tags">Tags</h2>
            <Tag tag="Fiction"/>
            <Tag tag="YA"/>
            <Tag tag="Fantasy"/>
            <Tag tag="Female Authors"/>
            <Tag tag="Coming of age"/>
            <Tag tag="Contemporary"/>
            <Tag tag="Romance"/>
            </section>
    
            <section className="two">
                    <div id="shelf-cards" className="card-container">
                        <RecList bookData={RECLIST_DATA} />
                    </div>
            </section>
    </div>
    </>
    );
}