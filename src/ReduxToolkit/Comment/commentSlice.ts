import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCommentAPI,
  deleteCommentAPI,
  getCommentsAPI,
} from "../../Api/article";
import { Comment } from "../../db";
import { RootState } from "../store";

interface CommentState {
  commentList: Comment[];
}
const initialState: CommentState = {
  commentList: [],
};

export const getCommentListThunk = createAsyncThunk(
  "comment/fetchList",
  async (slug: string, { rejectWithValue }) => {
    try {
      return await getCommentsAPI(slug);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addCommentThunk = createAsyncThunk(
  "comment/add",
  async (commentData: { slug: string; body: string }, { rejectWithValue }) => {
    try {
      const { slug, body } = commentData;
      return await addCommentAPI(slug, body);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteCommentThunk = createAsyncThunk(
  "comment/delete",
  async (commentData: { slug: string; id: string }, { rejectWithValue }) => {
    try {
      const { slug, id } = commentData;
      return await deleteCommentAPI(slug, id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentListThunk.fulfilled, (state, action) => {
        state.commentList = action.payload;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        state.commentList.push(action.payload);
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.commentList = state.commentList.filter(
          (commentEl) => commentEl.body !== action.payload
        );
      });
  },
});
export default commentSlice.reducer;
export const selectCommentList = (state: RootState): Comment[] =>
  state.comment.commentList;
