import Model from "./Model";
import View from "./View";

class Controller {
  // Controls loading the map from the Leaflet API
  async controlLoadMap() {
    try {
      // Loads the map
      await Model.loadMap();

      // Event Listener
      View.addHandlerMapClick(Model.getMap());

      // Gets local storage
      Model.getLocalStorage();

      // Awaiting the FontAwesome xIcon loading
      await View.renderWorkouts(Model.getWorkouts());

      // Event Listeners
      View.addHandlerDeleteWorkout(controlDeleteWorkout);
      View.addHandlerEditWorkouts(controlEditWorkout);

      // Renders the workout marker
      View.renderWorkoutMarkers(Model.getMap(), Model.getWorkouts());
    } catch (error) {
      console.error(`🔥 ${error}`);
    }
  }

  // Controls toggling the workout form input type
  controlToggleInputType() {
    View.toggleElevationField();
  }

  // Controls submitting the workout form
  async controlSubmitWorkout() {
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
      View.addHandlerDeleteWorkout(controlDeleteWorkout);
      View.addHandlerNewWorkoutEdit(controlEditWorkout);

      // Set Local Storage
      Model.setLocalStorage();
    } catch (error) {
      if (error.message === "Invalid Inputs") View.displayInputErrorMessage();
      console.error(`🔥 ${error}`);
    }
  }

  // Controls moving the map view to the workout clicked by the user
  controlMoveToMarker = function (event) {
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
      controlSubmitWorkoutEdits,
      workoutElement
    );
  }

  // Controls submitting edits to the workout
  controlSubmitWorkoutEdits(event, workoutElement, editFormElement) {
    try {
      // Model.editWorkout() returns the editedWorkout
      const editFormData = View.getEditFormData(editFormElement);
      const editedWorkout = Model.editWorkout(editFormData);

      View.updateWorkout(workoutElement, editedWorkout);

      // Event Listeners
      View.addHandlerDeleteWorkout(controlDeleteWorkout);
      // Allows the edit btn to be clicked after edits have been submitted
      View.addHandlerEditWorkout(controlEditWorkout, workoutElement);
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
    welcome();
    View.addHandlerLoadMap(controlLoadMap);
    View.addHandlerWorkoutSubmit(controlSubmitWorkout);
    View.addHandlerToggleInputType(controlToggleInputType);
    View.addHandlerMoveToWorkouts(controlMoveToMarker);
  }
}

export default new Controller();
