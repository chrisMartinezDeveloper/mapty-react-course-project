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
        cadence:
          workoutType === "running"
            ? +formElement.querySelector(".cadence").value
            : null,
        elevation:
          workoutType === "cycling"
            ? +formElement.querySelector(".elevation").value
            : null,
        pace: pace,
        speed: speed,
      });
    });
    this.setState({ shouldShowForm: false });
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

  submitEditWorkoutForm(e) {
    e.preventDefault();

    let workoutElement = e.target.closest(".workout");
    let workoutId = workoutElement.id;
    let workoutEditForm = e.target;
    let workoutType = workoutEditForm.querySelector(".type").value;
    let editFormData = {
      type: workoutType,
      distance: +workoutEditForm.querySelector(".distance").value,
      duration: +workoutEditForm.querySelector(".duration").value,
      cadence:
        workoutType === "running"
          ? +workoutEditForm.querySelector(".cadence").value
          : null,
      elevation:
        workoutType === "cycling"
          ? +workoutEditForm.querySelector(".elevation").value
          : null,
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

      return {
        workouts: state.workouts,
      };
    });

    console.log(workoutEditForm);
    console.log(workoutId);

    this.setState({ shouldShowEditWorkoutForm: false });
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

class controller {
  test() {
    console.log("TEST - Controller");
  }

  // Controls toggling the workout form input type
  toggleInputType() {
    View.toggleElevationField();
  }

  // Controls submitting the workout form
  async submitWorkout() {
    try {
      // Clear error message, if any
      View.clearInputErrorMessage();

      // Create workout in state
      Model.createNewWorkout(View.getWorkoutFormData());

      // Render workout and marker
      await View.renderWorkout(Model.getWorkout());
      View.renderWorkoutMarker(Model.getMap(), Model.getWorkout());
      View.hideForm();

      // Event Listeners
      View.addHandlerDeleteWorkout(this.controlDeleteWorkout);
      View.addHandlerNewWorkoutEdit(this.controlEditWorkout);

      // Set Local Storage
      Model.setLocalStorage();
    } catch (error) {
      if (error.message === "Invalid Inputs") View.displayInputErrorMessage();
      console.error(`🔥 ${error}`);
    }
  }

  // Controls moving the map view to the workout clicked by the user
  moveToMarker = function (event) {
    View.moveToMarker(event, Model.getMap(), Model.getWorkouts());
  };

  controlDeleteWorkout(event) {
    View.deleteWorkoutElement(event);

    const workout = Model.getCurrentWorkout(View.getElementID(event));
    View.removeMarker(Model.getMap(), workout);

    Model.deleteWorkout(View.getElementID(event));
  }

  controlEditWorkout(event, workoutElement) {
    View.renderEditView(event, Model.getWorkouts());

    View.addHandlerSubmitWorkoutEdits(
      this.controlSubmitWorkoutEdits,
      this.workoutElement
    );
  }

  // Controls submitting edits to the workout
  submitWorkoutEdits(event, workoutElement, editFormElement) {
    try {
      // Model.editWorkout() returns the editedWorkout
      const editFormData = View.getEditFormData(this.editFormElement);
      const editedWorkout = Model.editWorkout(this.editFormData);

      View.updateWorkout(workoutElement, editedWorkout);

      // Event Listeners
      View.addHandlerDeleteWorkout(this.controlDeleteWorkout);
      // Allows the edit btn to be clicked after edits have been submitted
      View.addHandlerEditWorkout(this.controlEditWorkout, this.workoutElement);
    } catch (error) {
      if (error.message === "Invalid Inputs")
        View.displayInputErrorMessage(event);
      console.error(`🔥 ${error}`);
    }
  }

  // Welcomes a dev to the application
  welcome() {
    console.log("Welcome to the application!");
  }

  // Initializes the application
  init() {
    // Publisher/Subscriber method
    this.welcome();
    View.addHandlerLoadMap(this.controlLoadMap);
    View.addHandlerWorkoutSubmit(this.controlSubmitWorkout);
    View.addHandlerToggleInputType(this.controlToggleInputType);
    View.addHandlerMoveToWorkouts(this.controlMoveToMarker);
  }
}

// export default new controller();
