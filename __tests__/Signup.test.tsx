import "@testing-library/jest-dom";
import * as React from "react";
// import API mocking utilities from Mock Service Worker.
import { rest } from "msw";
import { setupServer } from "msw/node";
// import testing utilities
import { render, fireEvent, screen } from "@testing-library/react";
import SignUp from "../src/Pages/SignUp";
import { Provider } from "react-redux";
import makeStore from "../src/Redux";
import { url } from "../src/db";
import { getToken, destroyToken } from "../src/Jwt/jwt";
import { ToastContainer } from "react-toastify";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
const server = setupServer();
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
const fakeErrorResponse = {
  errors: {
    email: ["is invalid"],
    password: ["is too short (minimum is 8 characters)"],
    username: ["has already been taken"],
  },
};
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  destroyToken();
});
afterAll(() => server.close());
function wrapWithRouter(component: JSX.Element, history: any) {
  return <Router history={history}>{component}</Router>;
}
function renderWithProvidersAndToast(component: JSX.Element) {
  const store = makeStore();
  return render(
    <Provider store={store}>
      {component}
      <ToastContainer />
    </Provider>
  );
}

test("signup fail", async () => {
  server.use(
    rest.post(url + "/users", (req, res, ctx) => {
      return res(ctx.status(402), ctx.json(fakeErrorResponse));
    })
  );

  const history = createMemoryHistory();
  renderWithProvidersAndToast(wrapWithRouter(<SignUp />, history));

  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "name" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/check error message/i);

  //에러 메시지들이 화면에 표시되어야 한다.
  for (const errorTitle in fakeErrorResponse.errors) {
    // console.log((fakeErrorResponse.errors as any)[errorTitle]);
    for (const errorContent of (fakeErrorResponse.errors as any)[errorTitle]) {
      const errorMessage = errorTitle + " " + errorContent;
      //   console.log(errorMessage);
      expect(await screen.findByText(errorMessage)).toBeVisible();
    }
  }
});
test("sign up success", async () => {
  server.use(
    rest.post(url + "/users", (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(fakeUserResponse));
    })
  );
  const history = createMemoryHistory();
  renderWithProvidersAndToast(wrapWithRouter(<SignUp />, history));

  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { value: "name" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "email" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
  const alert = await screen.findByRole("alert");
  expect(alert).toHaveTextContent(/Signup Success/i);
  expect(history.location.pathname).toBe("/login");
  //에러 메시지들이 화면에 표시되어야 한다.
});
