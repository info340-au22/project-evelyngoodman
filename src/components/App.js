import React, { useState } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

// import pages
import { Splash } from "./Splash.js"
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";
import { Browse } from "./Browse.js";
import { BookShelfList } from "./Bookshelf.js";
import { NewShelfForm } from "./NewShelfForm.js";
import { ShelfList } from "./BookLists"

export default function App(props) {

  const [bookshelves, setBookshelves] = useState([
    // give default shelf at first
    {cover: "img/index-ex1.png",
    title: "To Read",
    description: "Your to read shelf!",
    privacy: false}
  ]);

  // pass in to addshelfform
  function addShelfCallback(newShelf) {
    setBookshelves([...bookshelves, newShelf]);
  };

  console.log(bookshelves);

    return (
      <div>
        <Header />
        <Routes>
          <Route index element={<Browse />} />
          <Route path="/bookshelves" element={<BookShelfList bookshelves={bookshelves}/>} />
          <Route path="/newshelf" element={<NewShelfForm addShelfCallback={addShelfCallback} />} />
          <Route path="/shelf-list" element={<ShelfList />} />
          <Route path="/signin" element={<Splash />} />
        </ Routes>
      <Footer />
      </div>
    );
  }

  // To do:
  // 1. Figure out open a modal to add a shelf or read more about a book
  // 2. Organize components into 'pages' for demo
  // 3. Build 1 interactivity — add book from browse to bookshelf?
  //                          - create new bookshelf?
  //                          - filter bookshelves?

  // Questions for Office Hours:
  // 1. How do we connect diff pages to a 'home page?'
  // 2. Do we need components for splash page?