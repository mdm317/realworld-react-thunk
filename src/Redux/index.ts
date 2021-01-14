import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import article from "./Article/reducer";
import user from "./User/reducer";
import server from "./Server/reducer";
import reduxThunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
const rootReducer = combineReducers({
  article,
  user,
});
// const configureStore = (context) => {
//   console.log(context);
//   const middlewares = [];
//   const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(reducer, enhancer);
//   return store;
// };
export type RootState = ReturnType<typeof rootReducer>;
const makeStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxThunk))
  );
  return store;
};
// createLogger()
// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(reduxThunk, createLogger()))
// );
// export default store;
// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export default makeStore;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
