import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import baseUrl from "../../baseurl";
import { AppDispatch, RootState } from "../../Redux";
import { updateUserThunk } from "../../Thunk/user";
import { UpdateUserProp } from "../../types";
import SettingUserPresenter from "./SettingUserPresenter";

export default function SettingUserContainer(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((state: RootState) => state.user.updateUserErr);
  const user = useSelector((state: RootState) => state.user.user);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const userimageInput = form.elements.namedItem(
      "userimageInput"
    ) as HTMLInputElement;
    const usernameInput = form.elements.namedItem(
      "usernameInput"
    ) as HTMLInputElement;
    const userbioInput = form.elements.namedItem(
      "userbioInput"
    ) as HTMLInputElement;
    const useremailInput = form.elements.namedItem(
      "useremailInput"
    ) as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      "passwordInput"
    ) as HTMLInputElement;
    const newUser: UpdateUserProp = {
      image: userimageInput.value ? userimageInput.value : undefined,
      username: usernameInput.value ? usernameInput.value : undefined,
      bio: userbioInput.value ? userbioInput.value : undefined,
      email: useremailInput.value ? useremailInput.value : undefined,
      password: passwordInput.value ? passwordInput.value : undefined,
    };
    dispatch(updateUserThunk(newUser))
      .then(() => {
        toast.success("Change user success!");
        history.push(`${baseUrl}/`);
      })
      .catch((e: Error) => {
        toast.error(e.message);
      });
  };
  return (
    <SettingUserPresenter
      errors={errors}
      handleSubmit={handleSubmit}
      user={user}
    ></SettingUserPresenter>
  );
}
