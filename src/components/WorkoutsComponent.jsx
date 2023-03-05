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
          />
        ))}
      </ul>
    </React.Fragment>
  );
}

export default WorkoutsComponent;
