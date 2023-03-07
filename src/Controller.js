import React from "react";
import { Component, createRef } from "react";
import { ViewComponent } from "./View";
import { Marker, Popup } from "react-leaflet";
import Model from "./Model";
import View from "./View";

export class ControllerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      workouts: [],
      workoutToEdit: null,
      shouldShowForm: false,
      shouldShowEditWorkoutForm: false,
      shouldShowElevation: false,
      shouldFlyToMarker: [false, []],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  }

  addMarker(e) {
    this.setState((state) => {
      markers: state.markers.push({
        key: `${e.latlng.lat}, ${e.latlng.lng}`,
        coords: e.latlng,
      });
    });
  }

  showWorkoutForm() {
    this.setState({ shouldShowForm: true });
  }

  submitWorkoutForm(e) {
    e.preventDefault();

    const formElement = e.target.closest("form");
    let workoutType = formElement.querySelector(".type").value;
    let distance = +formElement.querySelector(".distance").value;
    let duration = +formElement.querySelector(".duration").value;
    let cadence =
      workoutType === "running"
        ? +formElement.querySelector(".cadence").value
        : null;
    let elevation =
      workoutType === "cycling"
        ? +formElement.querySelector(".elevation").value
        : null;
    let pace = (duration / distance).toFixed(2);
    let speed = (distance / (duration / 60)).toFixed(2);
    let today = new Date();
    let month = this.state.months[today.getMonth()];
    let day = today.getDate();
    let date = `${month} ${day}`;

    this.setState((state) => {
      workouts: state.workouts.push({
        key: state.markers.slice(-1)[0].key,
        discription: `${workoutType
          .slice(0, 1)
          .toUpperCase()}${workoutType.slice(1)} on ${date}`,
        type: workoutType,
        distance: +formElement.querySelector(".distance").value,
        duration: +formElement.querySelector(".duration").value,
        cadence: cadence ? cadence : null,
        elevation: elevation ? elevation : null,
        pace: pace,
        speed: speed,
      });
    });
    this.setState({ shouldShowElevation: false });
    this.setState({ shouldShowForm: false });
  }

  submitEditWorkoutForm(e) {
    e.preventDefault();

    let workoutElement = e.target.closest(".workout");
    let workoutId = workoutElement.id;
    let workoutEditForm = e.target;
    let workoutType = workoutEditForm.querySelector(".type").value;
    let distance = +workoutEditForm.querySelector(".distance").value;
    let duration = +workoutEditForm.querySelector(".duration").value;
    let cadence =
      workoutType === "running"
        ? +workoutEditForm.querySelector(".cadence").value
        : null;
    let elevation =
      workoutType === "cycling"
        ? +workoutEditForm.querySelector(".elevation").value
        : null;
    let pace = (duration / distance).toFixed(2);
    let speed = (distance / (duration / 60)).toFixed(2);
    let editFormData = {
      type: workoutType,
      distance: +workoutEditForm.querySelector(".distance").value,
      duration: +workoutEditForm.querySelector(".duration").value,
      cadence: cadence ? cadence : null,
      elevation: elevation ? elevation : null,
      pace: pace,
      speed: speed,
    };

    this.setState(function (state) {
      let selectedWorkoutIndex = state.workouts.findIndex(
        (workout) => workout.key === workoutId
      );

      state.workouts[selectedWorkoutIndex].type = editFormData.type;
      state.workouts[selectedWorkoutIndex].distance = editFormData.distance;
      state.workouts[selectedWorkoutIndex].duration = editFormData.duration;
      state.workouts[selectedWorkoutIndex].cadence = editFormData.cadence;
      state.workouts[selectedWorkoutIndex].elevation = editFormData.elevation;
      state.workouts[selectedWorkoutIndex].pace = editFormData.pace
        ? editFormData.pace
        : null;
      state.workouts[selectedWorkoutIndex].speed = editFormData.speed
        ? editFormData.speed
        : null;

      return {
        workouts: state.workouts,
      };
    });

    this.setState({ shouldShowEditWorkoutForm: false });
  }

  closeWorkoutForm() {
    this.setState({ shouldShowForm: false });
    this.setState((state) => {
      markers: state.markers.splice(-1);
    });
  }

  showElevation(e) {
    this.setState({
      shouldShowElevation: e.target.value === "cycling" ? true : false,
    });
  }

  flyToMarker(e) {
    let workout = e.target.closest(".workout");
    let id = workout.id.split(" ");
    let lat = +id[0].slice(0, -1);
    let lng = +id[1];
    let coords = [lat, lng];

    this.setState({ shouldFlyToMarker: [true, coords] });
  }

  resetShouldFlyToMarker() {
    this.setState({ shouldFlyToMarker: [false, []] });
  }

  editWorkout(e) {
    let workoutToEditElement = e.target.closest(".workout");
    let workoutId = workoutToEditElement.id;
    let selectedWorkout = this.state.workouts.find(
      (workout) => workout.key === workoutId
    );

    this.setState({ workoutToEdit: selectedWorkout });
    this.setState({ shouldShowEditWorkoutForm: true });
  }

  deleteWorkout(e) {
    let workoutlement = e.target.closest(".workout");
    let workoutId = workoutlement.id;
    let workoutsCopy = this.state.workouts;
    let filteredWorkoutsCopy = workoutsCopy.filter(
      (workout) => workout.key !== workoutId
    );
    let markersCopy = this.state.markers;
    let filteredMarkersCopy = markersCopy.filter(
      (marker) => marker.key !== workoutId
    );

    this.setState({ workouts: filteredWorkoutsCopy });
    // this.setState((state) => {
    //   workouts: state.workouts.filter(
    //     (workout) => workout.key !== workoutlement.id
    //   );
    // });
    this.setState({ markers: filteredMarkersCopy });
  }

  render() {
    return (
      <React.StrictMode>
        <ViewComponent
          shouldShowForm={this.state.shouldShowForm}
          shouldShowElevation={this.state.shouldShowElevation}
          showElevation={this.showElevation.bind(this)}
          submitWorkoutForm={this.submitWorkoutForm.bind(this)}
          closeWorkoutForm={this.closeWorkoutForm.bind(this)}
          workouts={this.state.workouts}
          shouldFlyToMarker={this.state.shouldFlyToMarker}
          resetShouldFlyToMarker={this.resetShouldFlyToMarker.bind(this)}
          flyToMarker={this.flyToMarker.bind(this)}
          deleteWorkout={this.deleteWorkout.bind(this)}
          editWorkout={this.editWorkout.bind(this)}
          shouldShowEditWorkoutForm={this.state.shouldShowEditWorkoutForm}
          workoutToEdit={this.state.workoutToEdit}
          submitEditWorkoutForm={this.submitEditWorkoutForm.bind(this)}
          showForm={this.showWorkoutForm.bind(this)}
          markers={this.state.markers}
          addMarker={this.addMarker.bind(this)}
        />
      </React.StrictMode>
    );
  }
}
