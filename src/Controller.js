import React, { Component } from "react";
import Sidebar from "./components/sidebarComponent";
import Map from "./components/mapComponent";
import "./css/style.css";

class Controller extends Component {
  state = {};

  /* //////////////////// */
  /* View                 */
  /* //////////////////// */
  render() {
    return (
      <div className="Controller">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default Controller;
