import { GET_ALL_POSTS } from "../actions/post.action";

const initialState = {};

export default function allPostReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
}
