import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import StakeComponent from "./GambleComponent";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <StakeComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
