import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { defaultImage, LoginUser } from "../db";
import { RootState, AppDispatch } from "../Redux";
import { addCommentThunk, deleteCommentThunk } from "../Thunk/article";
import { getMonthDate } from "../util";

interface CommentBoxProp {
  user?: LoginUser;
  slug: string;
}
export default function CommentBox({
  slug,
  user,
}: CommentBoxProp): JSX.Element {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.article.comments);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const textarea = form.elements.namedItem("content") as HTMLInputElement;
    dispatch(addCommentThunk(slug, textarea.value))
      .then(() => {
        toast.success("add comment success");
        textarea.value = "";
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  const clickDeleteCommentBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch(deleteCommentThunk(slug, (e.target as HTMLElement).id))
      .then(() => {
        toast.success("delete comment success");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="col-xs-12 col-md-8 offset-md-2">
      {user && (
        <form
          onSubmit={handleSubmit}
          aria-label="Add a comment"
          className="card comment-form"
        >
          <div className="card-block">
            <textarea
              id="content"
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={user.image ? user.image : defaultImage}
              className="comment-author-img"
            />
            <button type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </form>
      )}
      <div role="list" aria-label="comment list">
        {comments.map((comment) => (
          <div role="listitem" className="card" key={comment.id}>
            <div className="card-block">
              <p className="card-text">{comment.body}</p>
            </div>
            <div className="card-footer">
              <a href="" className="comment-author">
                <img
                  src={comment.author.image}
                  className="comment-author-img"
                />
              </a>
              &nbsp;
              <a href="" className="comment-author">
                {comment.author.username}
              </a>
              <span className="date-posted">
                {getMonthDate(comment.createdAt)}
              </span>
              <span className="mod-options">
                <i className="ion-edit"></i>
                <i className="ion-trash-a"></i>
              </span>
              {comment.author.username === user?.username && (
                <>
                  &nbsp;
                  <button
                    id={comment.id.toString()}
                    onClick={clickDeleteCommentBtn}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="ion-plus-round"></i> &nbsp;🗑 delete Comment
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
