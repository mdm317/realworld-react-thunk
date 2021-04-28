import React from "react";
import ErrorMessage from "../../Component/ErrorMessage";
import Input from "../../Component/Input";
import Loading from "../../Component/Loading";
import TextArea from "../../Component/TextArea";
import { LoginUser } from "../../db";
import { AuthError } from "../../Redux/User/action";

interface SettingUserPresenterProp {
  errors: AuthError | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  user: LoginUser | undefined;
}

export default function SettingUserPresenter({
  errors,
  handleSubmit,
  user,
}: SettingUserPresenterProp): JSX.Element {
  if (!user) {
    return <Loading />;
  }
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
