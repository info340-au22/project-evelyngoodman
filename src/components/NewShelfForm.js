import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const priv = <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /></svg><p>Private</p></div>;

export function NewShelfForm (props) {
    // one state for newshelf and one state for list of shelves?
    // i want there to be a default list

    const [errorMessage, setErrorMessage] = useState(null);
    const [formInputs, setFormInputs] = useState({
      cover: "img/index-ex1.png", // default image
      title: "",
      description: "",
      privacy: false,
      books: {}
    });

    const handleChange = (event) => {
      setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
      if (event.target.name === 'privacy') {
        if (event.target.checked) {
          setFormInputs({ ...formInputs, [event.target.name]: true });
        } else {
          setFormInputs({ ...formInputs, [event.target.name]: false });
        }
      }
    }

    let navigate = useNavigate(); // is this redundant?
    // following this tutorial: https://stackoverflow.com/questions/50644976/react-button-onclick-redirect-page
    const routeChange = () =>{ 
      let path = '/bookshelves'; 
      navigate(path);
    }

    const handleClick = (event) => {
      // form being submitted
      // prevents the submit button from refreshing the page
      event.preventDefault();
      //check to make sure title is unique
      console.log(props.bookshelves)
        for (const shelf of props.bookshelves) {
          if (formInputs.title === shelf.title) {
            setErrorMessage("You already have a title named "+formInputs.title+"!");
            return
          } 
      }
      if (formInputs.title === "") {
        setErrorMessage("You must input a title!");
        return
      }
      routeChange();
      return props.addShelfCallback(formInputs);
    }

    return (
      <>
      <div className="new-shelf-form">
        <Form>
          <div className="mb-3">
            <Form.Label>Bookshelf Title</Form.Label>
            <Form.Control id="titleInput" name="title" onChange={handleChange}/>
            <p id="title-error-message" className="d-">{errorMessage}</p>
          </div>
          <div className="mb-3">
            <Form.Label>Add a description</Form.Label>
            <Form.Control type="text" name="description" onChange={handleChange}/>
          </div>
          <p>Upload bookshelf photo <small className="text-muted">*optional</small></p>
          <Form.Select aria-label="Default select example" name="cover" onChange={handleChange}>
            {/* do i set value to {newshelf.cover} or the actual image link it refers to? */}
            <option value="img/index-ex1.png" onChange={handleChange}>Cover 1</option>
            <option value="img/index-ex2.png" onChange={handleChange}>Cover 2</option>
            <option value="img/index-ex3.png" onChange={handleChange}>Cover 3</option>
            <option value="img/index-ex4.png" onChange={handleChange}>Cover 4</option>
            <option value="img/index-ex5.png" onChange={handleChange}>Cover 5</option>
            <option value="img/index-ex6.png" onChange={handleChange}>Cover 6</option>
            <option value="img/index-ex7.png" onChange={handleChange}>Cover 7</option>
          </Form.Select>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="privacy" onChange={handleChange}/>
            <Form.Check>
              {priv}
            </Form.Check>
          </div>
          <Link to="/bookshelves"><button type="click" className="btn btn-dark" onClick={handleClick}>Create Bookshelf</button></Link>
        </Form>
    </div>
  </>
  );
}