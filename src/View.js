import React, { Component } from "react";
import Sidebar from "./components/sidebarComponent";
import Map from "./components/mapComponent";
import "./css/style.css";

class View extends Component {
  render() {
    return (
      <div className="View">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default View;
