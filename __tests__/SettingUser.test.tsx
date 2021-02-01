import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { fireEvent, screen } from "@testing-library/react";
import SettingUser from "../src/Pages/SettingUser";
import { LoginUser, url } from "../src/db";
import { renderDefault } from "./util";
import { loginSucAction } from "../src/Redux/User/action";
import { userFakeResponse } from "./ApiResponse/user";
const server = setupServer();

beforeAll(() => server.listen());
afterAll(() => server.close());
const newimage = "new image";
const newusername = "new name";
const newbio = "new bio";
const newemail = "new@email";
const newpassword = "new pass";
server.use(
  rest.put(url + "/user", (req, res, ctx) => {
    const { user } = req.body as any;
    console.log("user", user);

    if (user.image !== newimage) {
      return res(ctx.status(404));
    }
    if (user.username !== newusername) {
      return res(ctx.status(404));
    }
    if (user.bio !== newbio) {
      return res(ctx.status(404));
    }
    if (user.password !== newpassword) {
      return res(ctx.status(404));
    }
    if (user.email !== newemail) {
      return res(ctx.status(404));
    }
    const newUser = { ...userFakeResponse };
    newUser.user.image = newimage;
    newUser.user.username = newusername;
    newUser.user.bio = newbio;
    newUser.user.email = newemail;
    return res(ctx.json(userFakeResponse));
  })
);
test("유저 정보가 보여야 한다.", async () => {
  const { history, store } = renderDefault(<SettingUser />);

  const user = userFakeResponse.user;
  //로그인
  store.dispatch(loginSucAction(user));

  //input 들
  const userimageInput = screen.getByPlaceholderText(
    /URL of profile picture/i
  ) as HTMLInputElement;
  const usernameInput = screen.getByPlaceholderText(
    /Your Name/i
  ) as HTMLInputElement;
  const userbioInput = screen.getByPlaceholderText(
    /Short bio about you/i
  ) as HTMLInputElement;
  const useremailInput = screen.getByPlaceholderText(
    /Email/i
  ) as HTMLInputElement;
  const passwordInput = screen.getByPlaceholderText(
    /New Password/i
  ) as HTMLInputElement;

  //email, username, password, image, bio
  expect(userimageInput.value).toBe(user.image);
  expect(usernameInput.value).toBe(user.username);
  expect(userbioInput.value).toBe(user.bio);
  expect(useremailInput.value).toBe(user.email);

  //  유저 정보 변경
  fireEvent.change(userimageInput, { target: { value: newimage } });
  fireEvent.change(usernameInput, { target: { value: newusername } });
  fireEvent.change(userbioInput, { target: { value: newbio } });
  fireEvent.change(useremailInput, { target: { value: newemail } });
  fireEvent.change(passwordInput, { target: { value: newpassword } });

  fireEvent.click(screen.getByText(/Update Settings/i));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    /Change user success!/i
  );

  //redirect 확인
  expect(history.location.pathname).toBe("/");

  //reducer 동작 확인
  const newUserInfo = store.getState().user.user as LoginUser;
  expect(newUserInfo).not.toEqual(undefined);

  expect(newUserInfo.image).toEqual(newimage);
  expect(newUserInfo.username).toBe(newusername);
  expect(newUserInfo.bio).toBe(newbio);
  expect(newUserInfo.email).toBe(newemail);
});
