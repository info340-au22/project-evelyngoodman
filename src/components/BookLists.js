import React from "react";

// CONTAINS: Components for generic book cards used throughout the app
//           List components for the reccommended lists on the browse page
//           List components for the shelvedbooks in a particular bookshelf

// generic book card
function BookCard (props) {
    // props: cover, alt, title, author
    return (
        <div id="book-card" className="card border-0">
        <img src={props.cover} className="card-img-top" alt={props.alt} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">By {author}</p>
          <button type="button" className="btn btn-dark btn-sm rounded-0">Read More</button>
        </div>
      </div>
    )
}

// for browse page
// props: object containing book info?
export function RecList (props) {
    const data =  props.bookData;
    let list = data.map((book) => {
        return <BookCard cover={data.cover} alt={data.title} title={data.title} author={data.author}/>;
    })
    return (
        <>
        <div className="container">
                <div className="item">
                    {list}
                </div>
        </div>
        </>
    )
}

// props: tag
function Tag(props) {
    return (
        <span className="badge rounded-pill bg-secondary">{props.tag}</span>
    )
}

// for bookshelves
export function ShelfList (props) {
    return (
        <>
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
                    <div className="card-container">
                    <BookCard cover="img/book-ex2.jpg" alt="Book cover" title="Example Title" author="Author"/>
                    </div>
            </section>
    </div>
    </>
    )
}