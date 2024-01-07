import { Reducer, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import appReducer from "./appReducer";
import uploadReducer from "./uploadReducer";

const rootReducer: Reducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer,
  app: appReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
