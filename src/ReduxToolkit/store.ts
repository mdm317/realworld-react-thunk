import { configureStore } from "@reduxjs/toolkit";
import tagReducer from "./Tag/tagSlice";
import articleReducer from "./Article/articleSlice";
import articleListReducer from "./ArticleList/articleListSlice";
import userReducer from "./User/userSlice";
import commentReducer from "./Comment/commentSlice";

export const store = configureStore({
  reducer: {
    article: articleReducer,
    articleList: articleListReducer,
    user: userReducer,
    tag: tagReducer,
    comment: commentReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
