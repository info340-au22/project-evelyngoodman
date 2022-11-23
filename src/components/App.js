import React from "react";

import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export default function App(props) {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  }

  // To do:
  // 1. Figure out how to flip a card in Bootstrap to see more info
  // 2. Organize components into 'pages' for demo
  // 3. Build 1 interactivity — add book from browse to bookshelf?
  //                          - create new bookshelf?
  //                          - filter bookshelves?

  // Questions for Office Hours:
  // 1. How do we connect diff pages to a 'home page?'
  // 2. Do we need components for splash page?
  // 3. How do we connect css?
  // 4. Can we connect Boostrap JS for some of the interactions (carousel)