import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addPost, addPostAPI, editArticle } from "../../Api/article";
import { Article } from "../../db";
import Input from "../Input";
import TextArea from "../TextArea";

interface ArticleFormProp {
  article?: Article;
}
export default function ArticleForm({ article }: ArticleFormProp): JSX.Element {
  const history = useHistory();
  const initialTagList = article ? article.tagList : ([] as string[]);
  const [tagList, settagList] = useState<string[]>(initialTagList);
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = (e.target as HTMLInputElement).value;
      (e.target as HTMLInputElement).value = "";
      if (tagList.indexOf(value) !== -1) {
        toast.error("This tag has already been added!");
        return;
      }
      e.preventDefault();
      settagList([...tagList, value]);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      "description"
    ) as HTMLInputElement;
    const bodyInput = form.elements.namedItem("body") as HTMLInputElement;
    const addPostProp = {
      title: titleInput.value,
      description: descriptionInput.value,
      body: bodyInput.value,
      tagList,
    };
    // console.log("addPostProp", addPostProp);
    if (article?.slug) {
      editArticle(addPostProp, article.slug)
        .then(() => {
          toast.success("edit article success");
          history.push("/");
        })
        .catch((e) => {
          history.push("/");
          toast.error(e.message);
        });
    } else {
      addPost(addPostProp)
        .then(() => {
          toast.success("add post success");
          history.push("/");
        })
        .catch((e) => {
          history.push("/");
          toast.error(e.message);
        });
    }
  };
  const clickDeleteTagBtn = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const eraseTag = (e.target as HTMLElement).id;
    const newTagList = tagList.filter((tag) => eraseTag !== tag);
    settagList(newTagList);
  };
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <Input
                    id="title"
                    value={article?.title}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <Input
                    id="description"
                    value={article?.description}
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <TextArea
                    value={article?.body}
                    id="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    required
                  ></TextArea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    onKeyDown={handleAddTag}
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                  />
                  <div role="list" aria-label="tagList" className="tag-list">
                    {tagList.map((tag) => (
                      <span
                        role="listitem"
                        className="tag-default tag-pill"
                        key={tag}
                      >
                        {tag}
                        <span
                          id={tag}
                          role="button"
                          onClick={clickDeleteTagBtn}
                          className="ion-close-round"
                        >
                          ❌
                        </span>
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
