import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./tests/reportWebVitals";
import model from "./Model";
import View from "./View";
import "./css/style.css";

/* ////////////////// */
/* Controller         */
/* ////////////////// */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);

// Controls loading the map from the Leaflet API
const controlLoadMap = async function () {
  try {
    // Loads the map
    await model.loadMap();

    // Event Listener
    View.addHandlerMapClick(model.getMap());

    // Gets local storage
    model.getLocalStorage();

    // Awaiting the FontAwesome xIcon loading
    await View.renderWorkouts(model.getWorkouts());

    // Event Listeners
    View.addHandlerDeleteWorkout(controlDeleteWorkout);
    View.addHandlerEditWorkouts(controlEditWorkout);

    // Renders the workout marker
    View.renderWorkoutMarkers(model.getMap(), model.getWorkouts());
  } catch (error) {
    console.error(`🔥 ${error}`);
  }
};

// Controls toggling the workout form input type
const controlToggleInputType = function () {
  View.toggleElevationField();
};

// Controls submitting the workout form
const controlSubmitWorkout = async function () {
  try {
    // Clear error message, if any
    View.clearInputErrorMessage();

    // Create workout in state
    model.createNewWorkout(View.getWorkoutFormData());

    // Render workout and marker
    await View.renderWorkout(model.getWorkout());
    View.renderWorkoutMarker(model.getMap(), model.getWorkout());
    View.hideForm();

    // Event Listeners
    View.addHandlerDeleteWorkout(controlDeleteWorkout);
    View.addHandlerNewWorkoutEdit(controlEditWorkout);

    // Set Local Storage
    model.setLocalStorage();
  } catch (error) {
    if (error.message === "Invalid Inputs") View.displayInputErrorMessage();
    console.error(`🔥 ${error}`);
  }
};

// Controls moving the map view to the workout clicked by the user
const controlMoveToMarker = function (event) {
  View.moveToMarker(event, model.getMap(), model.getWorkouts());
};

const controlDeleteWorkout = function (event) {
  View.deleteWorkoutElement(event);

  const workout = model.getCurrentWorkout(View.getElementID(event));
  View.removeMarker(model.getMap(), workout);

  model.deleteWorkout(View.getElementID(event));
};

const controlEditWorkout = function (event, workoutElement) {
  View.renderEditView(event, model.getWorkouts());

  View.addHandlerSubmitWorkoutEdits(controlSubmitWorkoutEdits, workoutElement);
};

// Controls submitting edits to the workout
const controlSubmitWorkoutEdits = function (
  event,
  workoutElement,
  editFormElement
) {
  try {
    // model.editWorkout() returns the editedWorkout
    const editFormData = View.getEditFormData(editFormElement);
    const editedWorkout = model.editWorkout(editFormData);

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
};

// Welcomes a dev to the application
const welcome = function () {
  console.log("Welcome to the application!");
};

// Initializes the application
const init = function () {
  // Publisher/Subscriber method
  welcome();
  View.addHandlerLoadMap(controlLoadMap);
  View.addHandlerWorkoutSubmit(controlSubmitWorkout);
  View.addHandlerToggleInputType(controlToggleInputType);
  View.addHandlerMoveToWorkouts(controlMoveToMarker);
};
init();

/* ////////////////// */
/* Analytics          */
/* ////////////////// */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
