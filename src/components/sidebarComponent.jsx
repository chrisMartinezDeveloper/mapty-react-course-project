import React from "react";
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
          closeWorkoutForm={props.closeWorkoutForm}
          shouldShowErrorMessage={props.shouldShowErrorMessage}
        />
      )}

      <Workouts
        workouts={props.workouts}
        flyToMarker={props.flyToMarker}
        showEditWorkoutForm={props.showEditWorkoutForm}
        deleteWorkout={props.deleteWorkout}
        shouldShowElevation={props.shouldShowElevation}
        showElevation={props.showElevation}
        workoutToEdit={props.workoutToEdit}
        submitEditWorkoutForm={props.submitEditWorkoutForm}
        closeWorkoutEditForm={props.closeWorkoutEditForm}
        shouldShowErrorMessage={props.shouldShowErrorMessage}
      />

      <Copyright />
    </div>
  );
}

export default SidebarComponent;
