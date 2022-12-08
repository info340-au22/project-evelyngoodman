import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';
import RECLIST_DATA from '../data/reclist_data.json'

// CONTAINS: Components for generic book cards used throughout the app
//           List components for the reccommended lists on the browse page
//           List components for the shelvedbooks in a particular bookshelf

// generic book card
function BookCard (props) {

    // TODO: delete book from shelf
    // cant add book multiple times

    let bookData = props.bookData;
    let addToShelf= props.addToShelf;
    const [selectInputs, setSelectInputs] = useState(null)

    const handleChange = (event) => {
        console.log(event.value);
        setSelectInputs(event.value); //
    }

    const handleClick = (event) => {
        // form being submitted
        // prevents the submit button from refreshing the page
        event.preventDefault();
        // now i need to send this book data to the right shelf
        return addToShelf(selectInputs, bookData);
      }
  
      const onClick = (event) => {
        handleClick(event);
      }

    // TODO: i only want to be able to ADD to a bookshelf when im not already in a shelf... 
    // do i just check what my URL address is and then render content?

    // loop through existing state shelves and map each to a select option
    let shelves = props.bookshelves.map((shelf) => {
        return <option value={shelf.title} key={shelf.title}>{shelf.title}</option>
    })

    return (
        <div id="book-card" className="card border-0">
        <img src={bookData.cover} className="card-img-top" alt={bookData.title} />
        <div className="card-body">
          <h5 className="card-title">{bookData.title}</h5>
          <p className="card-text">By {bookData.author}</p>
          <button type="button" className="btn btn-dark btn-sm rounded-0" data-bs-toggle="modal" data-bs-target="#readMoreModal">Read More</button>
          {/* Modal */}
            <div className="modal fade" id="readMoreModal" tabIndex="-1" aria-labelledby="readMoreModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="readMoreModalLabel">{bookData.title} by {bookData.author}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <p>{bookData.description}</p>
                <p>Add to bookshelf? <small className="text-muted">*optional</small></p>
                <select className="form-select" aria-label="Default select example" name="shelf" onChange={handleChange}>
                    {/* do i set value to {newshelf.cover} or the actual image link it refers to? */}
                    <option value="N/A" selected>No</option>
                    {shelves}
                </select>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClick}>Save</button>
                </div>
                </div>
            </div>
            </div>
        {/* end modal */}
        </div>
      </div>
    );
}

// for browse page
// props: object containing book info
export function BookList (props) {
    const data =  props.bookData;
    let list = data.map((book) => {
        return <BookCard bookshelves={props.bookshelves} bookData={book} addToShelf={props.addToShelf} key={book.title}/>;
    });
    // console.log(list);
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
export function ShelfContent (props) {
    const title = props.title;
    let shelfContent = props.shelfContent;

    // use params
    // not title, id

    // // id should be from route
    // let content = []
    // for (const id in shelfContent) {
    //     if (id === title) {
    //         content = shelfContent[id].books;
    //     }
    // }

    return (
        <>
        <div id="lib" className="container">
        <p><Link to='/bookshelves'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg> back to bookshelves</Link></p>
        </div>
        <div className="container justify-content-center">
        <h1>{title}</h1>
        </div>
        <div className="flex-container">
            <section className="one">
                {/* TODO: how to add tags */}
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
                        <BookList bookData={content}/>
                    </div>
            </section>
    </div>
    </>
    );
}