import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter} from "react-router-dom";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // after deployment may be the routes not working somehow so for over come this problem we just need to right HashRouter instead of Router(BrowerRouter).
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);
