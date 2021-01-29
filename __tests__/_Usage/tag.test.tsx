import "@testing-library/jest-dom";
import { render, fireEvent, screen, within } from "@testing-library/react";

import React from "react";
// import Hello from "./Hello";
import marked from "marked";

const Hello = () => {
  return <h1>Hello</h1>;
};
const Hello2 = () => {
  return <h1>🔨 follow</h1>;
};
const Hello3 = () => {
  return <h1 data-testid="g1">🔨 follow</h1>;
};

test("should ", async () => {
  render(<Hello3 />);
  await screen.findByTestId("g1");
});
// test("should ", () => {
//   render(<Hello />);
//   const strMarkdown = marked(
//     "* App\n   * Home\n      *  ArticleBoxUserFeed\n#### sdfsadf\n### sdfsadfsdf\n## sadfasdf"
//   );

//   const re = /<\w+>/;
//   const tags = strMarkdown.split(re);
//   // console.log(nameList);
//   const textList = tags.reduce((ac, cu) => {
//     const text = cu.trim();
//     if (text !== "" && text !== "\n") {
//       ac.push(text);
//     }
//     return ac;
//   }, []);

//   textList.forEach(async (text) => {
//     await screen.findByText(text);
//   });
// });
