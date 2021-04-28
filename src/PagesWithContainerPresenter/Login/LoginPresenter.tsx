import React from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../../Component/ErrorMessage";
import { AuthError } from "../../Redux/User/action";

interface LoginPresenterProp {
  errors: AuthError | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

export default function LoginPresenter({
  errors,
  handleSubmit,
  isLoading,
}: LoginPresenterProp): JSX.Element {
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Log in</h1>
            <p className="text-xs-center">
              <Link to="signup">{"Don't Have an account?"}</Link>
            </p>
            {errors && <ErrorMessage errors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  id="emailInput"
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  required={true}
                ></input>{" "}
              </fieldset>
              <fieldset className="form-group">
                <input
                  id="passwordInput"
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  required={true}
                ></input>{" "}
              </fieldset>
              {isLoading ? (
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
                  Log in
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
