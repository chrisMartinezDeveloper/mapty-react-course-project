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

      {props.shouldShowForm && (
        <WorkoutForm
          shouldShowElevation={props.shouldShowElevation}
          showElevation={props.showElevation}
          submitWorkoutForm={props.submitWorkoutForm}
          test={props.test}
        />
      )}

      <Workouts
        workouts={props.workouts}
        flyToMarker={props.flyToMarker}
        editWorkout={props.editWorkout}
        deleteWorkout={props.deleteWorkout}
        shouldShowEditWorkoutForm={props.shouldShowEditWorkoutForm}
        workoutToEdit={props.workoutToEdit}
        submitEditWorkoutForm={props.submitEditWorkoutForm}
      />

      <Copyright />
    </div>
  );
}

export default SidebarComponent;
