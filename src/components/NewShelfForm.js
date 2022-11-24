import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const priv = <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" /></svg><p>Private</p></div>;

const pub = <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" /><path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" /></svg><p>Public</p></div>;

// rename file
export function NewShelfForm (props) {
    // one state for newshelf and one state for list of shelves?
    // i want there to be a default list

    const [formInputs, setFormInputs] = useState({
      cover: "",
      title: "",
      description: "",
      privacy: false
    });

    const handleChange = (event) => {
      setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
      if (event.target.name === 'privacy') {
        if (event.target.value === 'on') {
          setFormInputs({ ...formInputs, [event.target.name]: true });
        }
      }
      // console.log(formInputs)
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
      return props.addShelfCallback(formInputs);
    }

    const onClick = (event) => {
      routeChange();
      handleClick(event);
    }

    return (
      <>
      <div className="new-shelf-form">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Bookshelf Title</label>
            <input type="text" className="form-control" name="title" onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Add a description</label>
            <input type="text" className="form-control" name="description" onChange={handleChange}/>
          </div>
          <p>Upload bookshelf photo <small className="text-muted">*optional</small></p>
          <select className="form-select" aria-label="Default select example" name="cover" onChange={handleChange}>
            {/* do i set value to {newshelf.cover} or the actual image link it refers to? */}
            <option value="img/index-ex1.png" onChange={handleChange}>Cover 1</option>
            <option value="img/index-ex2.png" onChange={handleChange}>Cover 2</option>
            <option value="img/index-ex3.png" onChange={handleChange}>Cover 3</option>
            <option value="img/index-ex4.png" onChange={handleChange}>Cover 4</option>
            <option value="img/index-ex5.png" onChange={handleChange}>Cover 5</option>
            <option value="img/index-ex6.png" onChange={handleChange}>Cover 6</option>
            <option value="img/index-ex7.png" onChange={handleChange}>Cover 7</option>
          </select>

          {/* <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" name="privacy" onChange={handleChange}/>
            <label className="form-check-label" htmlFor="flexRadioDefault1">
            {pub}
            </label>
          </div> */}
          <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" name="privacy" onChange={handleChange}/>
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              {priv}
            </label>
          </div>
          <Link to="/bookshelves"><button type="click" className="btn btn-dark" onClick={onClick}>Create Bookshelf</button></Link>
        </form>
    </div>
  </>
    );
}