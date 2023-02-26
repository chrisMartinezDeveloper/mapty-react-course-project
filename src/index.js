import React from "react";
import model from "./Model";
import View from "./View";
import ReactDOM from "react-dom/client";
import Controller from "./View";
import "./css/style.css";
import reportWebVitals from "./tests/reportWebVitals";

/* ////////////////// */
/* Controller         */
/* ////////////////// */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Controller />
  </React.StrictMode>
);

/* ////////////////// */
/* Analytics          */
/* ////////////////// */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
