import React from "react";

export default function Login(): JSX.Element {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { usernameInput, passwordInput, useridInput } = form;
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <label htmlFor="usernameInput"></label>
                <input
                  id="usernameInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                ></input>
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="useridInput"></label>
                <input
                  id="useridInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                ></input>{" "}
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="passwordInput"></label>
                <input
                  id="passwordInput"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                ></input>{" "}
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
