import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagState {
  tagList: string[] | undefined;
}
const initialState: TagState = {
  tagList: undefined,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    getTagRequest: (state) => {
      state.tagList = undefined;
    },
    getTagSuccess: (state, action: PayloadAction<string[]>) => {
      state.tagList = action.payload;
    },
  },
});

export const { getTagRequest, getTagSuccess } = tagSlice.actions;
export default tagSlice.reducer;
