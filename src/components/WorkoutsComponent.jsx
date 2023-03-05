import React, { Component } from "react";
import WorkoutComponent from "./WorkoutComponent";
import "../css/style.css";

function WorkoutsComponent(props) {
  return (
    <React.Fragment>
      <ul className="workouts">
        {console.log(props.workouts)}
        {props.workouts.map((workout) => (
          <WorkoutComponent key={workout.key} workout={workout} />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default WorkoutsComponent;
