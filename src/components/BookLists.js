import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import { getDatabase, ref, get, push as firebasePush, onValue, remove as firebaseRemove} from 'firebase/database'; //realtime
import { useParams } from 'react-router-dom';

// CONTAINS: Components for generic book cards used throughout the app
//           List components for the reccommended lists on the browse page
//           List components for the shelvedbooks in a particular bookshelf

// generic book card
function BookCard (props) {

    // TODO: delete book from shelf
    // cant add book multiple times
    let bookData = props.bookData;
    //console.log(bookData)
    const [selectInputs, setSelectInputs] = useState(null)

    const handleChange = (event) => {
        console.log(event.target.value); // why is this undefined
        setSelectInputs(event.target.value); //
    }

    const handleClick = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        let currentUser = props.currentUser;
        console.log(currentUser);
        if (currentUser.userId !== null) {
            const db = getDatabase();
            const userShelves = ref(db, "shelves/"+currentUser.userId);
            // loop through snapshot of current ststa eof user booksgelves to match
            // the given selectInputs to a specific bookshelf
            console.log(selectInputs)
            let title = selectInputs.toLowerCase();
            title = title.replace(" ", "");
            const uniqueShelfRef = ref(db, "shelves/"+currentUser.userId+"/"+title+"/books");
            firebasePush(uniqueShelfRef, bookData);
            // // lift ot state
            // const shelfKey = get(userShelves).then((snapshot) => {
            //     if (snapshot.exists()) {
            //         const snapshotArr = snapshot.val();
            //         console.log(snapshotArr);
            //         // find which bookshelf is == to the input title 
            //         // add bookcard to that shelf
            //         let id = 0;
            //         snapshot.forEach((shelf) => {
            //             // console.log(shelf.title)
            //             id +=1;
            //             // console.log(id)
            //             if (shelf.title === selectInputs) {
            //                 const uniqueShelfRef = ref(db, "shelves/"+currentUser.userId+"/"+(id-1)+"/books");
            //                 firebasePush(uniqueShelfRef, bookData);
            //             }
            //         })
            //     } else {
            //     console.log("No data available");
            //     }
            // }).catch((error) => {
            //     console.error(error);
            // });
        }
        setShow(false);
      }

    // TODO: i only want to be able to ADD to a bookshelf when im not already in a shelf... 
    // do i just check what my URL address is and then render content?

    // loop through existing state shelves and map each to a select option
    //console.log(props.bookshelves);
    let shelves = props.bookshelves.map((shelf) => {
        return <option value={shelf.title} key={shelf.title}>{shelf.title}</option>;
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div id="book-card" className="card border-0">
        <img src={bookData.cover} className="card-img-top" alt={bookData.title} />
        <div className="card-body">
          <h5 className="card-title">{bookData.title}</h5>
          <p className="card-text">By {bookData.author}</p>
          <button variant="primary" className="btn btn-dark btn-sm rounded-0" onClick={handleShow}>Read More</button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{bookData.title} by {bookData.author}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{bookData.description}</p>
                <p><a href={bookData.link}>Read more</a></p>
                <select className="form-select" aria-label="Default select example" name="shelf" onChange={handleChange}>
                    <option value="N/A" selected>No</option>
                    {shelves}
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClick}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        </div>
      </div>
    );
}

// for browse page
// props: object containing book info
export function BookList (props) {
    // OLD:
    const data =  props.bookData;
    //if (data == null) {
    //    let list = <Link to=""><p>Add books now!</p></Link>;
    //} else {
    let list = data.map((book) => {
        return <BookCard bookshelves={props.bookshelves} bookData={book} currentUser={props.currentUser} key={book.title}/>;
    });
    //}
    // const currentUser = props.currentUser;
    // const db = getDatabase();
    // // TODO: get ref for specific book list of spcefic shelf
    // const shelfContentRef = ref(db, "shelves/"+currentUser.userId);
    // onValue(shelfContentRef, (snapshot) => {
    // let list =snapshot.forEach((book)=> {
    //     return <BookCard bookshelves={props.bookshelves} bookData={book} currentUser={props.currentUser}/>;
    // })
    return (
        <>{list}</>
        );
    // console.log(list);
}

// props: tag
function Tag(props) {
    return (
        <span className="badge rounded-pill bg-secondary">{props.tag}</span>
    );
}

// for bookshelves
export function ShelfContent (props) {
    const currentUser = props.currentUser;
    //let content=shelfData.books;
    const [content, setContent] = useState([]);
    // const shelfId = props.shelfId;
    const urlParamObj = useParams(); 
    console.log(urlParamObj.shelfId);
    let title = urlParamObj.shelfId;
    title = title.toLowerCase();
    title = title.replace(" ", "");
    useEffect(() => {
        const db = getDatabase();
        const shelfRef = ref(db, "shelves/"+currentUser.userId+"/"+title+"/books");
        onValue(shelfRef, (snapshot) => {
            // this is where app will find data to display
              if (snapshot.exists()) {
                const snapshotArr = snapshot.val();
                let books = Object.values(snapshotArr)
                console.log(books);
                setContent(books);
              }
          })
    }, [])
    // const db = getDatabase();
    // const shelfRef = ref(db, "shelves/"+currentUser.userId+"/"+title+"/books");
    // get(shelfRef).then((snapshot) => {
    //     const data = snapshot.val();
    //     console.log(data);
    //     content = data;
    //     console.log(content)
    // })
    // .catch((err) => {
    //     console.error(err);
    // });
    // console.log(content)
    // loop through snapshot of current ststa eof user booksgelves to match
    // the given selectInputs to a specific bookshelf
    // Q: Should this be onvalue in case the user adds a book?
    // const rightShelf = get(userShelves).then((snapshot) => {
    //     if (snapshot.exists()) {
    //         // find which bookshelf is == to the input title 
    //         // retreive books data
    //         snapshot.forEach((shelf) => {
    //              let key = shelf.key;
    //              let shelfData = shelf.val();
    //             //  console.log(key)
    //             // console.log(id)
    //             if (shelfData.title === urlParamObj.shelfId) {
    //                 console.log("found it!");
    //                 console.log(shelfData);
    //                 return shelfData;
    //             }
    //         })
    //     } else {
    //     console.log("No data available");
    //     }
    // }).catch((error) => {
    //     console.error(error);
    // });

    const handleClick = (event) => {
        // delete shelf
        console.log("deleted!");
        // how to get  contents of rightShelf
        let title = urlParamObj.shelfId;
        title = title.toLowerCase();
        title = title.replace(" ", "");
        const db = getDatabase();
        const removeRef = ref(db, "shelves/"+currentUser.userId+"/"+title);
        firebaseRemove(removeRef);
    }

    return (
        <>
        <div id="lib" className="container">
        <p><Link to='/bookshelves'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
        </svg> back to bookshelves</Link></p>
        </div>
        <div className="container justify-content-center">
        <h1>{urlParamObj.shelfId}</h1>
        </div>
        <div className="flex-container">
            <section className="one">
                <button className="btn btn-secondary ms-2" onClick={handleClick}>Delete Bookshelf</button>
            </section>
    
            <section className="two">
                    <div id="shelf-cards" className="card-container">
                        <BookList bookshelves={props.bookshelves} bookData={content} currentUser={props.currentUser}/>
                    </div>
            </section>
    </div>
    </>
    );
}