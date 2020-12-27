import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ErrorMessage from "../Component/ErrorMessage";
import { AppDispatch, RootState } from "../Redux";
import { useHistory } from "react-router-dom";
import { loginThunk } from "../Thunk/user";

export default function Login(): JSX.Element {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { isLodding, loginErr: errors } = useSelector(
  //   (state: RootState) => state.user
  // );
  // useEffect(() => {
  //   console.log("isLodding update");
  // }, [isLodding]);
  // const [errors, setErr] = useState<null | string>(null);
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("isSubmit");
  //   // toast.error("ddd");

  //   setTimeout(() => {
  //     setErr("email or password is invalid");
  //     toast.error("ddd");
  //   }, 1000);
  // };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("issubmitted");

    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem(
      "emailInput"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "passwordInput"
    ) as HTMLInputElement;

    const pro = dispatch(
      loginThunk({
        email: emailInput.value,
        password: passwordInput.value,
      })
    ) as any;
    // toast.success("request success");
    pro
      .then(() => {
        toast.success("login success!");
        history.push("/");
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Log in</h1>
            {/* {errors && <ErrorMessage errors={errors} />}
            {errors && <div role="alert">{errors}</div>} */}
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
              <button
                id="btn"
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Log in
              </button>
              {/* {isLodding ? (
                <button
                  type="button"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  ...Loding
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Log in
                </button>
              )} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
