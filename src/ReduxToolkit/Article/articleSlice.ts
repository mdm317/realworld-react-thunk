import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticleAPI } from "../../Api/article";
import { Article } from "../../db";
import * as types from "./types";

const initialState: types.ArticleState = {
  articleDetail: null,
  isLoading: false,
};
export const getArticleDetailThunk = createAsyncThunk(
  "article/fetchArticle",
  async (slug: string, { rejectWithValue }) => {
    try {
      const articleDetail = await getArticleAPI(slug);
      return articleDetail;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const articleSlice = createSlice({
  name: "article",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArticleDetailThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getArticleDetailThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articleDetail = action.payload;
    });
    builder.addCase(getArticleDetailThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
  reducers: {},
});

export default articleSlice.reducer;
