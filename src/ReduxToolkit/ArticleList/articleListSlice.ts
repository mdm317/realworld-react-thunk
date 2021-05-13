import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetArticleCondition, getArticleListAPI } from "../../Api/article";
import * as types from "./types";
import { Article } from "../../db";

const initialState: types.ArticleState = {
  articleList: {
    global: [],
    byUser: [],
    byFavorited: [],
  },
  numberOfArticle: {
    global: 0,
    byUser: 0,
    byFavorited: 0,
  },
  isLoading: {
    global: false,
    byUser: false,
    byFavorited: false,
  },
};
const makeThunkAndBuild = (type: types.ArticleListFilter) => {
  const thunk = createAsyncThunk(
    "articleList/fetch" + type,
    async (condition: GetArticleCondition, { rejectWithValue }) => {
      try {
        const articleListAndCount = await getArticleListAPI(condition);
        return articleListAndCount;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  const build: types.BuilderF = (builder) => {
    builder
      .addCase(thunk.pending, (state) => {
        state.isLoading[type] = true;
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state.isLoading[type] = false;
        state.articleList[type] = action.payload.articleList;
        state.numberOfArticle[type] = action.payload.articlesCount;
      })
      .addCase(thunk.rejected, (state, action) => {
        state.isLoading[type] = false;
        console.log(action.payload);
      });
  };
  return { thunk, build };
};
export const {
  thunk: getArticleListThunkTK,
  build: buildGlobal,
} = makeThunkAndBuild("global");
export const {
  thunk: getArticleListByFavoritedThunkTK,
  build: buildByFavorited,
} = makeThunkAndBuild("byFavorited");
export const {
  thunk: getArticleListByUserThunkTK,
  build: buildByUser,
} = makeThunkAndBuild("byUser");
export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    buildGlobal(builder);
    buildByFavorited(builder);
    buildByUser(builder);
  },
});

export default articleSlice.reducer;
