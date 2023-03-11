import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import "./css/style.css";
library.add(faXmark);

export default function View(props) {
  return (
    <div className="View">
      <Sidebar
        workouts={props.workouts}
        shouldShowForm={props.shouldShowForm}
        shouldShowElevation={props.shouldShowElevation}
        showElevation={props.showElevation}
        submitWorkoutForm={props.submitWorkoutForm}
        closeWorkoutForm={props.closeWorkoutForm}
        closeWorkoutEditForm={props.closeWorkoutEditForm}
        shouldShowErrorMessage={props.shouldShowErrorMessage}
        flyToMarker={props.flyToMarker}
        deleteWorkout={props.deleteWorkout}
        showEditWorkoutForm={props.showEditWorkoutForm}
        submitEditWorkoutForm={props.submitEditWorkoutForm}
      />
      <Map
        showForm={props.showForm}
        shouldShowForm={props.shouldShowForm}
        markers={props.markers}
        addMarker={props.addMarker}
        shouldFlyToMarker={props.shouldFlyToMarker}
      />
    </div>
  );
}
