import React from "react";
import { Link } from "react-router-dom";

export function Header(props) {
    return (
        <header className="site-header">
          <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Goodreads</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
                  <li className="nav-item"><Link className="nav-link" to="/">Browse</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/bookshelves">Bookshelves</Link></li>
                </ul>
                <span className="navbar-text text-end">
                  <Link to="/signin"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="profile bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></Link>
                </span>
              </div>
            </div>
          </nav>
        </header>
    )
}