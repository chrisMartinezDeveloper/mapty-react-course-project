import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./tests/reportWebVitals";
import { ViewComponent } from "./View";
import Controller from "./Controller";
import "./css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ViewComponent loadMap={Controller.controlLoadMap} />
  </React.StrictMode>
);

// Controller.init();
// Controller.loadMap();

/* ////////////////// */
/* Analytics          */
/* ////////////////// */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
