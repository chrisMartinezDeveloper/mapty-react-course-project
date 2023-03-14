import { Fragment } from "react";
import Workout from "./Workout";
import "../css/style.css";

export default function Workouts(props) {
  return (
    <Fragment>
      <ul className="workouts">
        {props.workouts.map((workout) => (
          <Workout
            key={workout.key}
            workout={workout}
            flyToMarker={props.flyToMarker}
            showEditWorkoutForm={props.showEditWorkoutForm}
            shouldShowElevation={props.shouldShowElevation}
            showElevation={props.showElevation}
            deleteWorkout={props.deleteWorkout}
            submitEditWorkoutForm={props.submitEditWorkoutForm}
            closeWorkoutEditForm={props.closeWorkoutEditForm}
          />
        ))}
      </ul>
    </Fragment>
  );
}
