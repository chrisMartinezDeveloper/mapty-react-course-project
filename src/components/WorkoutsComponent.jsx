import React, { Component } from "react";
import WorkoutComponent from "./WorkoutComponent";
import "../css/style.css";

function WorkoutsComponent(props) {
  return (
    <React.Fragment>
      <ul className="workouts">
        {props.workouts.map((workout) => (
          <WorkoutComponent
            key={workout.key}
            coords={workout.key}
            workout={workout}
            flyToMarker={props.flyToMarker}
            editWorkout={props.editWorkout}
            deleteWorkout={props.deleteWorkout}
            shouldShowElevation={props.shouldShowElevation}
            showElevation={props.showElevation}
            shouldShowEditWorkoutForm={props.shouldShowEditWorkoutForm}
            workoutToEdit={props.workoutToEdit}
            submitEditWorkoutForm={props.submitEditWorkoutForm}
            closeWorkoutEditForm={props.closeWorkoutEditForm}
          />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default WorkoutsComponent;
