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
      shouldShowForm: false,
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

  showForm() {
    this.setState({ isMapClicked: true });
  }

  render() {
    return (
      <React.StrictMode>
        <ViewComponent
          isMapClicked={this.state.shouldShowForm}
          showForm={this.showForm.bind(this)}
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
