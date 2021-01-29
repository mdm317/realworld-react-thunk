import React from "react";
import {
  findByRole,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderDefault } from "../util";
import { articleFakeResponse } from "../ApiResponse/article";
import ArticleDetail from "../../src/Pages/ArticleDetail";
import { Route } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Article, url } from "../../src/db";
import { userFakeResponse } from "../ApiResponse/user";
import { loginSucAction } from "../../src/Redux/User/action";
import { hasToastId } from "react-toastify/dist/utils";
import {
  commentFakeResponse,
  commentsFakeResponse,
} from "../ApiResponse/comments";
const server = setupServer();
server.listen();

// const response = await axios.get(url + `/articles/${slug}/comments`);
// url + `/articles/${slug}/comments`,
// url + `/articles/${slug}/comments/${id}`,
server.use(
  rest.get(url + `/articles/:slug`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(articleFakeResponse));
  })
);
server.use(
  rest.get(url + `/articles/:slug/comments`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(commentsFakeResponse));
  }),
  rest.post(url + `/articles/:slug/comments`, (req, res, ctx) => {
    const { slug } = req.params;
    // const { body } = req.body;
    // console.log(req.body);

    // console.log(slug);
    // const newComment = { ...commentFakeResponse.comment };
    // newComment.body = body;
    return res(ctx.json(commentFakeResponse));
  }),
  rest.delete(url + `/articles/:slug/comments/:id`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res();
  })
);

//prop slug user
test("댓글이 보여져야 한다. ", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  store.dispatch(loginSucAction(userFakeResponse.user));

  //api 반환된 댓글 리스트
  const commentsReturn = commentsFakeResponse.comments;

  const list = await screen.findByRole("list", { name: /comment list/i });
  const commentListElems = within(list).getAllByRole("listitem");
  expect(commentListElems.length).toBe(commentsReturn.length);

  commentListElems.forEach((element, i) => {
    expect(element).toHaveTextContent(commentsReturn[i].body);
  });
});
test("댓글이 등록. ", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  store.dispatch(loginSucAction(userFakeResponse.user));

  //form 을 찾고
  const form = await screen.findByRole("form");
  //내용을 입력하고
  const textarea = within(form).getByRole("textbox");
  fireEvent.change(textarea, {
    target: { value: commentFakeResponse.comment.body },
  });
  //클릭
  const submitBtn = within(form).getByRole("button");
  fireEvent.click(submitBtn);
  //
  await screen.findByText(commentFakeResponse.comment.body);
});

test("댓글이 삭제 . ", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  //댓글 작성자의 이름으로 로그인
  const newUser = { ...userFakeResponse.user };
  newUser.username = commentsFakeResponse.comments[0].author.username;
  store.dispatch(loginSucAction(newUser));

  //api 반환된 댓글 리스트
  const deleteBtn = await screen.findByText(/delete comment/i);

  fireEvent.click(deleteBtn);

  expect(await screen.findByRole("alert")).toHaveTextContent(
    /delete comment success/
  );
  expect(screen.queryByText(commentsFakeResponse.comments[0].body)).toBeNull();
});
