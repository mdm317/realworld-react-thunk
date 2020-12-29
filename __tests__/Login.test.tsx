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
import { Router } from "react-router-dom";
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

  const alert = await screen.findByRole("alert");
  //toast message 로 check error message 를 표시한다.
  expect(alert).toHaveTextContent(/check error message/i);

  //error의 내용을 표시한다
  expect(
    await screen.findByText(/email or password is invalid/i)
  ).toBeVisible();

  //token 이 저장되지 않아야한다.
  expect(getToken()).toBeNull();
});

test("로그인 성공", async () => {
  server.use(
    rest.post(url + "/users/login", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeUserResponse));
    })
  );
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <Login />
    </Router>
  );

  renderWithProvidersAndToast(component);

  // fill out the form
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "gpffh@a.a" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "gpffh12" },
  });
  const submitBtn = screen.getByRole("button", { name: /log in/i });
  fireEvent.click(submitBtn);

  //toast elem  이 생기는것을 찾는다.
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/login success/i);
  expect(getToken()).toEqual(fakeUserResponse.user.token);
  expect(history.location.pathname).toBe("/");
});
test("서버 에러", async () => {
  server.use(
    rest.post(url + "/users/login", (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: "Internal server error" })
      );
    })
  );

  renderWithProvidersAndToast(<Login />);

  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "gpffh@a.a" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "gpffh12" },
  });
  const submitBtn = screen.getByRole("button", { name: /log in/i });
  fireEvent.click(submitBtn);

  // wait for the error message
  const alert = await screen.findByRole("alert");

  expect(alert).toHaveTextContent(/try rater/i);
  expect(getToken()).toBeNull();
});
