import React from "react";
import ReactDOM from "react-dom";
import Root from "components/Root";
import configureStore from "redux-mock-store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const store = configureStore()({}); //mock
  ReactDOM.render(<Root store={store} />, div);
});
