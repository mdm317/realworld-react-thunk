import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../src/Pages/Login";
import { Provider } from "react-redux";
import makeStore from "../src/Redux";
import { url } from "../src/db";
import { getToken, destroyToken } from "../src/Jwt/jwt";
import { ToastContainer } from "react-toastify";
import { createMemoryHistory } from "history";
const fakeUserResponse = {
  user: {
    id: 125577,
    email: "gpffh@a.a",
    createdAt: "2020-11-24T07:00:04.578Z",
    updatedAt: "2020-11-25T09:12:21.871Z",
    username: "gpffh1",
    bio: "c",
    image: null,
    token: "eyJ0",
  },
};
const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  destroyToken();
});
afterAll(() => server.close());
function renderWithProvidersAndToast(component: JSX.Element) {
  const store = makeStore();
  return render(
    <Provider store={store}>
      {component}
      <ToastContainer />
    </Provider>
  );
}
test("로그인 실패", async () => {
  server.use(
    rest.post(url + "/users/login", (req, res, ctx) => {
      return res(
        ctx.status(402),
        ctx.json({ errors: { "email or password": ["is invalid"] } })
      );
    })
  );
  renderWithProvidersAndToast(<Login />);

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "gpffh@a.a" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "gpffh123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /log in/i }));
  //toast elem  이 생기는것을 찾는다.
  // const el = await screen.findByText(
  //   "/email or password is invalid/i"
  // );
  const el = await screen.findByRole("alert", {}, { timeout: 2000 });
  // const el = await screen.findAllByRole("alert");
  // const el2 = await screen.findAllByRole("alert");
  // const el3 = await screen.findAllByRole("alert");
  console.log(el.textContent);
  // console.log(el[0].textContent);
  // console.log(el2[0].textContent);
  // console.log(el3[0].textContent);

  // const alert = await screen.findByRole("alert");
  // expect(alert).toHaveTextContent(/login success/i);
  // expect(getToken()).toEqual(fakeUserResponse.user.token);
});
