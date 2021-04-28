import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import baseUrl from "../../baseurl";
import { AppDispatch, RootState } from "../../Redux";
import { loginThunk } from "../../Thunk/user";
import LoginPresenter from "./LoginPresenter";

export default function LoginContainer(): JSX.Element {
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
        history.push(`${baseUrl}/`);
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };
  return (
    <LoginPresenter
      errors={errors}
      handleSubmit={handleSubmit}
      isLoading={isLodding}
    ></LoginPresenter>
  );
}
