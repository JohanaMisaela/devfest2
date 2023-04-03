import { GTE_USRERS } from "../actions/users.actions";

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GTE_USRERS:
      return action.payload;
    default:
      return state;
  }
}
