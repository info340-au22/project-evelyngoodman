import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';

export function Header(props) {
  const currentUser = props.currentUser;

  const handleSignOut = (event) => {
    signOut(getAuth());
  }  
  console.log(currentUser.userId)

    return (
        <header className="site-header">
        {/* <Navbar bg="dark" variant="dark" fixed="top" >
          <Container>
            <Navbar.Brand href="/">Goodreads</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Browse</Nav.Link>
              {currentUser.userId !== null && 
                    <>
                      <Nav.Link href="/bookshelves">Bookshelves</Nav.Link>
                      <Nav.Link href="/signin"><button className="btn btn-secondary ms-2" onClick={handleSignOut}>Sign Out</button></Nav.Link>
                    </>
              }{currentUser.userId === null &&
                    <Link to="signin"><button className="btn btn-secondary ms-2">Sign In</button></Link>
                  }
            </Nav>
          </Container>
        </Navbar> */}
          <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">Goodreads</a>
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