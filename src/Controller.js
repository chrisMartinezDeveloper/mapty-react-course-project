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
      shouldShowEditWorkoutForm: false,
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
    this.setState(function (state) {
      const newMarkers = state.markers;
      newMarkers.push({
        key: `${e.latlng.lat}, ${e.latlng.lng}`,
        coords: e.latlng,
      });

      return { markers: newMarkers };
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
        let key = newMarkers.slice(-1)[0].key;
        return {
          workouts: state.workouts.concat({
            key: key,
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
          }),
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
    let workoutId = workoutElement.id;
    let workoutEditForm = e.target;
    let workoutType = workoutEditForm.querySelector(".type").value;
    console.log(workoutType);
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

    if ((validInputs(editFormDataArray), allPositive(editFormDataArray))) {
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
      this.setState({ shouldShowErrorMessage: false });
    } else {
      // workoutElement.style.height = "20rem";
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

    this.setState({
      shouldShowElevation: selectedWorkout.type === "cycling" ? true : false,
    });
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
          closeWorkoutEditForm={this.closeWorkoutEditForm.bind(this)}
          shouldShowErrorMessage={this.state.shouldShowErrorMessage}
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
