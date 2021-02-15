import React from "react";
import { screen } from "@testing-library/react";
import ArticleDetail from "../../src/Pages/ArticleDetail";
import "@testing-library/jest-dom";
import marked from "marked";

import { rest } from "msw";
import { setupServer } from "msw/node";
import { url } from "../../src/db";
import { renderDefault } from "../util";
import { articleFakeResponse } from "../ApiResponse/article";
import { Route } from "react-router-dom";
import { loginSucAction } from "../../src/Redux/User/action";
import { userFakeResponse } from "../ApiResponse/user";
import { commentsFakeResponse } from "../ApiResponse/comments";

const server = setupServer();
// const response = await axios.get(url + `/articles/${slug}`, header);
server.listen();
const article = articleFakeResponse.article;

//  articleDetail
//    --ArticleUserCard
//    --commentBox
server.use(
  rest.get(url + `/articles/:slug`, (req, res, ctx) => {
    const { slug } = req.params;
    // console.log(slug);
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(articleFakeResponse));
  })
);
// const response = await axios.get(url + `/articles/${slug}/comments`);

server.use(
  rest.get(url + `/articles/:slug/comments`, (req, res, ctx) => {
    const { slug } = req.params;
    const tokenStr = (req.headers as any).map?.authorization;
    return res(ctx.json(commentsFakeResponse));
  })
);

test("글의 제목과 내용이 보여야함", async () => {
  const { history } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  //제목이 보이는지 확인
  await screen.findByText(article.title);

  //markdown to html
  const strMarkdown = marked(articleFakeResponse.article.body);
  // console.log("strMarkdown", strMarkdown);

  //html 에서 텍스트만 분리
  const re = /<[^>]+>/gi;
  const tags = strMarkdown.split(re);
  // console.log("tags", tags);

  const textList = tags.reduce((ac: string[], cu) => {
    const text = cu.trim();
    if (text !== "" && text !== "\n") {
      ac.push(text);
    }
    return ac;
  }, []);

  // //text화면에 있는지 확인
  // //error 가 남 foreach 에 async 로 find 는 불가능????
  // textList.forEach(async (text) => {
  //   await screen.findByText(text);
  // });
  // ==> 콜백으로 async await 을 주면 test 가 끝나버려서 err 가 나느느듯하다.
  // for of 로 바꾸면 될듯

  //text화면에 있는지 확인
  textList.forEach((text) => {
    screen.getByText(text);
  });
});
test("내 글일 경우 delete edit 버튼이 보여야함", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );

  //글 작성자가 로그인한 유저일수 있게 user 정보를 만든다
  const authorFake = { ...userFakeResponse.user };
  authorFake.username = articleFakeResponse.article.author.username;

  //login
  store.dispatch(loginSucAction(authorFake));
  //render
  history.push("/article/articleSlug");

  // edit post 버튼은 두개여야 한다
  const editpostBtn = await screen.findAllByText(/edit post/i);
  expect(editpostBtn).toHaveLength(2);

  // delete post 버튼은 두개여야 한다
  const deletePostBtn = await screen.findAllByText(/delete post/i);
  expect(deletePostBtn).toHaveLength(2);
});
test("다른 사람의 글일 경우 follow favorite 버튼이 보여야함", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );

  //login
  store.dispatch(loginSucAction(userFakeResponse.user));
  //render
  history.push("/article/articleSlug");

  // follow post 버튼은 두개여야 한다
  const editpostBtn = await screen.findAllByText(/follow/i);
  expect(editpostBtn).toHaveLength(2);

  // favorite post 버튼은 두개여야 한다
  const deletePostBtn = await screen.findAllByText(/favorite/i);
  expect(deletePostBtn).toHaveLength(2);
});

test("tag list 가 보여야 한다.", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );
  history.push("/article/articleSlug");
  for (const tag of article.tagList) {
    const el = await screen.findByText(tag);
  }
});
test("로그인 상태일 경우 댓글 등록 창이 보여야함", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );

  //login
  store.dispatch(loginSucAction(userFakeResponse.user));
  //render
  history.push("/article/articleSlug");

  await screen.findByRole("form", { name: /Add a comment/i });
});

test("댓글들이 보여야 한다.", async () => {
  const { history, store } = renderDefault(
    <Route path="/article/:slug">
      <ArticleDetail />
    </Route>
  );

  //render
  history.push("/article/articleSlug");

  //댓글들이 보여야 한다.
  for (const comment of commentsFakeResponse.comments) {
    await screen.findByText(comment.body);
  }
});

//add comment 가능
//delete comment 기능
//==>commentBox
