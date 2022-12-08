import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';

export function Header(props) {
  const currentUser = props.currentUser;
  const handleSignOut = (event) => {
    signOut(getAuth());
  }  

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
                {currentUser.userId && 
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/bookshelves">Bookshelves</Link></li>
                    <li className="nav-item">
                    <span className="navbar-text text-end">
                      <button className="btn btn-secondary ms-2" onClick={handleSignOut}>Sign Out</button>
                      </span>
                    </li>
                  </>
                }{!currentUser.userId &&
                  <li className="nav-item">
                    <span className="navbar-text text-end">
                  <Link to="/signin"><button className="btn btn-secondary ms-2">Sign In</button></Link>
                </span>
                  </li>
                }
                </ul>
              </div>
            </div>
          </nav>
        </header>
    )
}