import logo from "../img/logo.png";
import "../css/style.css";
import WorkoutForm from "./WorkoutForm";
import Workouts from "./Workouts";
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

      <Workouts
        workouts={props.workouts}
        flyToMarker={props.flyToMarker}
        showEditWorkoutForm={props.showEditWorkoutForm}
        shouldShowElevation={props.shouldShowElevation}
        showElevation={props.showElevation}
        deleteWorkout={props.deleteWorkout}
        submitEditWorkoutForm={props.submitEditWorkoutForm}
        closeWorkoutEditForm={props.closeWorkoutEditForm}
      />

      <Copyright />
    </div>
  );
}
