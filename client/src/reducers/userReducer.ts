import { Action } from "redux";

const defaultState = {
  currentUser: {},
  isAuth: false,
};

export default function userReducer(state = defaultState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
