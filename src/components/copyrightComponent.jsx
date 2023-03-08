import React from "react";
import "../css/style.css";

// Stateless Functional Component
function Copyright() {
  return (
    <p className="copyright">
      &copy; Copyright by&nbsp;
      <a
        className="twitter-link"
        target="_blank"
        rel="noreferrer"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
      . Use for learning or your portfolio. Don't use to teach. Don't claim as
      your own.
    </p>
  );
}

export default Copyright;
