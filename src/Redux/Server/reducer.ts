import { LoginUser } from "../../db";
import { ActionType, createReducer } from "typesafe-actions";
import { storeToken } from "../../Jwt/jwt";

interface ServerState {
  serverErr: null | string;
}
const initialState: ServerState = {
  serverErr: null,
};
const SERVER_FAIL = "SERVER_FAIL";
export const serverFailAction = (err: string) =>
  ({
    type: SERVER_FAIL,
    payload: err,
  } as const);
export type ServerAction = ReturnType<typeof serverFailAction>;
const serverReducer = (
  state = initialState,
  action: ServerAction
): ServerState => {
  switch (action.type) {
    case SERVER_FAIL:
      return {
        ...state,
        serverErr: action.payload,
      };
    default:
      return { ...state };
  }
};
export default serverReducer;
