import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
// dev tools
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger"; //afaka esorina
import { applyMiddleware, createStore } from "redux";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.action";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
