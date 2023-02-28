import React, { Component } from "react";
import logo from "../img/logo.png";
import "../css/style.css";
import WorkoutForm from "./workoutFormComponent";
import Copyright from "./copyrightComponent";

class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />

        <WorkoutForm />

        <ul className="workouts"></ul>

        <Copyright />
      </div>
    );
  }
}

export default Sidebar;
