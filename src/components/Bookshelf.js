import React from "react";

function Bookshelf(props) {
    // props: title, privacy, cover
    return (
        <div className="col">
        <div className="card border-light text-start" id="bookshelf-card">
          <a href="shelf.html"><img src="img/index-ex2.png" className="card-img-top" alt="bookshelf photo" /></a>
          <div className="card-body">
            <p className="card-text"><a href="shelf.html">{props.title}</a></p>
            <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16" >
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg><small className="text-muted"> {props.privacy}</small></p>
          </div>
        </div>
      </div>
    );
}

export function ShelfList() {
    return (
        <div className="container text-center px-4">
          <div className="row">
            <h2>Filter</h2>
            
          </div>
            <div className="row gx-5 gy-5">
                {/* <Bookshelf /> */}
            </div>
        </div>
    )
}