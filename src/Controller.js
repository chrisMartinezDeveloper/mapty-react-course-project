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
      shouldShowForm: true,
      shouldShowElevation: false,
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
    console.log("Submit");
    console.log(e);
    // console.log(this.state.markers.slice(-1).key);
    // let workoutType = e.target.closest("type").value;
    // this.setState((state) => {
    //   workouts: state.workouts.push({
    //     id: 0,
    //     // id: state.markers.slice(-1).key,
    //     // type: workoutType,
    //     // distance: e.target.closest("distance").value,
    //     // duration: e.target.closest("duration").value,
    //     // cadence:
    //     //   workoutType === "running" ? e.target.closest("duration").value : null,
    //     // elevation:
    //     //   workoutType === "cycling" ? e.target.closest("duration").value : null,
    //   });
    // });
    // console.log(this.state.workouts);
    // this.setState({ shouldShowForm: false });
  }

  test() {
    console.log("TEST - Submit");
  }

  showElevation(e) {
    this.setState({
      shouldShowElevation: e.target.value === "cycling" ? true : false,
    });
  }

  render() {
    return (
      <React.StrictMode>
        <ViewComponent
          shouldShowForm={this.state.shouldShowForm}
          shouldShowElevation={this.state.shouldShowElevation}
          showElevation={this.showElevation.bind(this)}
          submitWorkoutForm={this.submitWorkoutForm.bind(this)}
          test={this.test.bind(this)}
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
