import React, { Component } from "react";
import logo from "../img/logo.png";
import "../css/style.css";
import WorkoutForm from "./workoutFormComponent";
import Workouts from "./WorkoutsComponent";
import Copyright from "./copyrightComponent";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />

        <WorkoutForm />

        <Workouts />

        <Copyright />
      </div>
    );
  }
}

export default Sidebar;
