import React, { forwardRef } from "react";
import logo from "../img/logo.png";
import "../css/style.css";
import WorkoutForm from "./workoutFormComponent";
import Workouts from "./WorkoutsComponent";
import Copyright from "./copyrightComponent";

function SidebarComponent(props) {
  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" className="logo" />

      {props.shouldShowForm && <WorkoutForm />}

      <Workouts />

      <Copyright />
    </div>
  );
}

export default SidebarComponent;
