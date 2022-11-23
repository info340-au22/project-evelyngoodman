import React from "react";

export function Header(props) {
    return (
        <header className="site-header">
          <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Goodreads <em>re-imagined</em></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item"><a className="nav-link active" href="#" tabindex="-1" aria-disabled="true">Browse</a></li>
                  <li className="nav-item"><a className="nav-link" aria-current="page" href="#">Bookshelves</a></li>
                </ul>
                <span className="navbar-text text-end">
                  <a href="splash.html"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="profile bi bi-person-circle" viewBox="0 0 16 16">
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                    </svg></a>
                </span>
              </div>
            </div>
          </nav>
        </header>
    )
}