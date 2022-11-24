import React from "react";

// do we even need a component for this?
export function Splash(props) {
    return (
        <div id="splash">
        <h1 className="text-center">Sign Up</h1>
        <form className="row g-3">
          <div className="form-floating mb-3 col-md-6">
            <input type="text" className="form-control" id="floatingInput" placeholder="First Name" />
            <label htmlFor="floatingInput">First Name</label>
          </div>
          <div className="form-floating mb-3 col-md-6">
            <input type="text" className="form-control" id="floatingInput" placeholder="Last Name" />
            <label htmlFor="floatingInput">Last Name</label>
          </div>
          <div className="form-floating mb-3 col-12">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3 col-12">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="col-12">
            <a className="btn btn-dark" href="index.html" role="button">Sign Up</a>
          </div>
        </form>
        </div>
    );
}