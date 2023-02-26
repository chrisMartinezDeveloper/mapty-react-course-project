import React, { Component } from "react";
import model from "./Model";
import Sidebar from "./components/sidebarComponent";
import Map from "./components/mapComponent";
import "./css/style.css";

class Controller extends Component {
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
