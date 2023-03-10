import logo from "../img/logo.png";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";
import Copyright from "./Copyright";

export default function Sidebar(props) {
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

      <WorkoutList
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
