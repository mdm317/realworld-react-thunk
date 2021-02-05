import { createReducer } from "typesafe-actions";

export const GET_TAGS_REQUEST = "GET_TAGS_REQUEST";
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";

export const getTagsRequestAction = () =>
  ({
    type: GET_TAGS_REQUEST,
  } as const);
export const getTagsSuccessAction = (tagList: string[]) =>
  ({
    type: GET_TAGS_SUCCESS,
    payload: tagList,
  } as const);

export type tagAction =
  | ReturnType<typeof getTagsSuccessAction>
  | ReturnType<typeof getTagsRequestAction>;
interface TagState {
  tagList: string[] | undefined;
}
const initialState = {
  tagList: undefined,
};
const tagReducer = createReducer<TagState, tagAction>(initialState, {
  GET_TAGS_REQUEST: (state) => ({ ...state, tagList: undefined }),
  GET_TAGS_SUCCESS: (state, action) => ({ ...state, tagList: action.payload }),
});
export default tagReducer;
