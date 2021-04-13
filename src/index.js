import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import "./index.scss";
import App from "./App";
import reducers from "./reducers";
import rootSaga from "./sagas";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? "https://global-todo.herokuapp.com/api/v1"
    : "http://localhost:4040/api/v1";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
