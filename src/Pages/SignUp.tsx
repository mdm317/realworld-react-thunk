import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../Component/ErrorMessage";
import { AppDispatch, RootState } from "../Redux";
import { signupThunk } from "../Thunk/user";
import baseUrl from "../baseurl";
export default function Login(): JSX.Element {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { isLodding, signupErr: errors } = useSelector(
    (state: RootState) => state.user
  );
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const usernameInput = form.elements.namedItem(
      "usernameInput"
    ) as HTMLInputElement;
    const useremailInput = form.elements.namedItem(
      "useremailInput"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "passwordInput"
    ) as HTMLInputElement;
    const signupUser = {
      username: usernameInput.value,
      email: useremailInput.value,
      password: passwordInput.value,
    };
    dispatch(signupThunk(signupUser))
      .then(() => {
        toast.success("Signup Success");

        history.push(`${baseUrl}/login`);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
    // const { usernameInput, passwordInput, useridInput } = form;
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="/login">Have an account?</Link>
            </p>

            {errors && <ErrorMessage errors={errors} />}

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  id="usernameInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                ></input>
              </fieldset>
              <fieldset className="form-group">
                <input
                  id="useremailInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                ></input>{" "}
              </fieldset>
              <fieldset className="form-group">
                <input
                  id="passwordInput"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                ></input>{" "}
              </fieldset>
              {isLodding ? (
                <button
                  type="button"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  ...Loading
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Sign Up
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
