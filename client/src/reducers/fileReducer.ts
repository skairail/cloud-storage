import { Action } from "redux";

const defaultState = {};

export default function fileReducer(state = defaultState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
