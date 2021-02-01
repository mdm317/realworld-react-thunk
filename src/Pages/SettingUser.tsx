import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../Component/ErrorMessage";
import Input from "../Component/Input";
import Loading from "../Component/Loading";
import TextArea from "../Component/TextArea";
import { AppDispatch, RootState } from "../Redux";
import { updateUserThunk } from "../Thunk/user";
import { UpdateUserProp } from "../types";

export default function SettingUser(): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const errors = useSelector((state: RootState) => state.user.updateUserErr);
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) {
    return <Loading />;
  }
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
        history.push("/");
      })
      .catch((e: Error) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            {errors && <ErrorMessage errors={errors} />}
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    id="userimageInput"
                    value={user.image || undefined}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    id="usernameInput"
                    value={user?.username}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextArea
                    id="userbioInput"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    value={user.bio}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    id="useremailInput"
                    value={user?.email}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    id="passwordInput"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
