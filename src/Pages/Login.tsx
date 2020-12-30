import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ErrorMessage from "../Component/ErrorMessage";
import { AppDispatch, RootState } from "../Redux";
import { Link, useHistory } from "react-router-dom";
import { loginThunk } from "../Thunk/user";

export default function Login(): JSX.Element {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { isLodding, loginErr: errors } = useSelector(
    (state: RootState) => state.user
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem(
      "emailInput"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "passwordInput"
    ) as HTMLInputElement;

    dispatch(
      loginThunk({
        email: emailInput.value,
        password: passwordInput.value,
      })
    )
      .then(() => {
        toast.success("login success!");
        history.push("/");
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };
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
