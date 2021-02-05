import { ThunkAction } from "redux-thunk";
import { getTagListAPI } from "../Api/tag";
import { RootState } from "../Redux";
import {
  getTagsRequestAction,
  getTagsSuccessAction,
  tagAction,
} from "../Redux/Tag";

export function getTagListThunk(): ThunkAction<
  Promise<void>,
  RootState,
  null,
  tagAction
> {
  return async (dispatch) => {
    try {
      dispatch(getTagsRequestAction());
      const tagList = await getTagListAPI();
      dispatch(getTagsSuccessAction(tagList));
      return;
    } catch (e) {
      throw Error("Internal Server Error! Try rater!");
    }
  };
}
