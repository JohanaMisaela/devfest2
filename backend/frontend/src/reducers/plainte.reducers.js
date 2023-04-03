import { GET_PLAINTES } from "../actions/plainte.action";

const initialState = {};

export default function allPostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PLAINTES:
      return action.payload;
    default:
      return state;
  }
}
