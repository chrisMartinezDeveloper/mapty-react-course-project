import React from "react";
import { validInputs, allPositive } from "./helpers";
import { Component } from "react";
import { ViewComponent } from "./View";

export class ControllerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      workouts: [],
      workoutToEdit: null,
      shouldShowForm: false,
      shouldShowElevation: false,
      shouldShowErrorMessage: false,
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
    const newMarker = {
      key: `${e.latlng.lat}, ${e.latlng.lng}`,
      coords: e.latlng,
    };

    this.setState((prevState) => ({
      markers: [newMarker, ...prevState.markers],
    }));
    this.setState({ shouldFlyToMarker: [false, []] });
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
    // formDataArray - used for form data validation
    let formDataArray = [distance, duration];
    formDataArray.push(workoutType === "running" ? cadence : elevation);
    // let formData = {
    //   type: workoutType,
    //   distance: distance,
    //   duration: duration,
    //   cadence: cadence ? cadence : null,
    //   elevation: elevation ? elevation : null,
    //   pace: pace,
    //   speed: speed,
    // };

    if ((validInputs(formDataArray), allPositive(formDataArray))) {
      this.setState(function (state) {
        const newMarkers = state.markers;
        let key = newMarkers[0].key;
        return {
          workouts: [
            {
              key: key,
              discription: `${workoutType
                .slice(0, 1)
                .toUpperCase()}${workoutType.slice(1)} on ${date}`,
              type: workoutType,
              status: "view",
              distance: +formElement.querySelector(".distance").value,
              duration: +formElement.querySelector(".duration").value,
              cadence: cadence ? cadence : null,
              elevation: elevation ? elevation : null,
              pace: pace,
              speed: speed,
            },
            ...state.workouts,
          ],
        };
      });
      this.setState({ shouldShowElevation: false });
      this.setState({ shouldShowErrorMessage: false });
      this.setState({ shouldShowForm: false });
    } else {
      this.setState({ shouldShowErrorMessage: true });
    }
  }

  submitEditWorkoutForm(e) {
    e.preventDefault();

    let workoutElement = e.target.closest(".workout");
    let workoutKey = workoutElement.dataset.key;
    console.log("Workout Element: ", workoutElement);
    console.log("Workout Key: ", workoutKey);
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
    // editFormDataArray - used for form data validation
    let editFormDataArray = [distance, duration];
    editFormDataArray.push(workoutType === "running" ? cadence : elevation);
    let editFormData = {
      type: workoutType,
      distance: distance,
      duration: duration,
      cadence: cadence ? cadence : null,
      elevation: elevation ? elevation : null,
      pace: pace,
      speed: speed,
    };

    let workoutsCopy = this.state.workouts;
    let selectedWorkout = workoutsCopy.find(
      (workout) => workout.key === workoutKey
    );
    selectedWorkout.status = "view";
    // console.log("Workouts Copoy: ", workoutsCopy);

    if ((validInputs(editFormDataArray), allPositive(editFormDataArray))) {
      this.setState(function (prevState) {
        let selectedWorkoutIndex = prevState.workouts.findIndex(
          (workout) => workout.key === workoutKey
        );

        prevState.workouts[selectedWorkoutIndex].type = editFormData.type;
        prevState.workouts[selectedWorkoutIndex].distance =
          editFormData.distance;
        prevState.workouts[selectedWorkoutIndex].duration =
          editFormData.duration;
        prevState.workouts[selectedWorkoutIndex].cadence = editFormData.cadence;
        prevState.workouts[selectedWorkoutIndex].elevation =
          editFormData.elevation;
        prevState.workouts[selectedWorkoutIndex].pace = editFormData.pace
          ? editFormData.pace
          : null;
        prevState.workouts[selectedWorkoutIndex].speed = editFormData.speed
          ? editFormData.speed
          : null;

        return {
          workouts: prevState.workouts,
        };
      });
      this.setState({ workouts: workoutsCopy });
      this.setState({ shouldShowErrorMessage: false });
    } else {
      this.setState({ shouldShowErrorMessage: true });
    }
  }

  closeWorkoutForm() {
    this.setState({ shouldShowEditWorkoutForm: false });
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
    this.setState(function (state) {
      const newMarkers = state.markers;
      newMarkers.splice(-1);
      return { markers: newMarkers };
    });
  }

  closeWorkoutEditForm() {
    this.setState({ shouldShowEditWorkoutForm: false });
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
  }

  showElevation(e) {
    this.setState({
      shouldShowElevation: e.target.value === "cycling" ? true : false,
    });
  }

  flyToMarker(e) {
    let workout = e.target.closest(".workout");
    let id = workout.dataset.key.split(" ");
    let lat = +id[0].slice(0, -1);
    let lng = +id[1];
    let coords = [lat, lng];

    this.setState({ shouldFlyToMarker: [true, coords] });
  }

  resetShouldFlyToMarker() {
    this.setState({ shouldFlyToMarker: [false, []] });
  }

  showEditWorkoutForm(e) {
    let workoutToEditElement = e.target.closest(".workout");
    let workoutKey = workoutToEditElement.dataset.key;
    let workoutsCopy = this.state.workouts;
    let selectedWorkout = workoutsCopy.find(
      (workout) => workout.key === workoutKey
    );
    selectedWorkout.status = "edit";

    this.setState({ workouts: workoutsCopy });
    this.setState({ workoutToEdit: selectedWorkout });
    this.setState({
      shouldShowElevation: selectedWorkout.type === "cycling" ? true : false,
    });
  }

  deleteWorkout(e) {
    let workoutElement = e.target.closest(".workout");
    let workoutKey = workoutElement.dataset.key;
    let workoutsCopy = this.state.workouts;
    let filteredWorkoutsCopy = workoutsCopy.filter(
      (workout) => workout.key !== workoutKey
    );
    let markersCopy = this.state.markers;
    let filteredMarkersCopy = markersCopy.filter(
      (marker) => marker.key !== workoutKey
    );

    this.setState({ workouts: filteredWorkoutsCopy });
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
          closeWorkoutEditForm={this.closeWorkoutEditForm.bind(this)}
          shouldShowErrorMessage={this.state.shouldShowErrorMessage}
          workouts={this.state.workouts}
          shouldFlyToMarker={this.state.shouldFlyToMarker}
          resetShouldFlyToMarker={this.resetShouldFlyToMarker.bind(this)}
          flyToMarker={this.flyToMarker.bind(this)}
          deleteWorkout={this.deleteWorkout.bind(this)}
          showEditWorkoutForm={this.showEditWorkoutForm.bind(this)}
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
