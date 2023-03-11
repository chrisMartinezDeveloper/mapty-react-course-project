import { StrictMode } from "react";
import { validInputs } from "./helpers";
import { Component } from "react";
import View from "./View";

export class ControllerComponent extends Component {
  constructor(props) {
    console.log("Welcome to Mapty!");

    super(props);
    this.state = {
      markers: [],
      workouts: [],
      workoutToEdit: null,
      shouldShowForm: false,
      shouldShowElevation: false,
      shouldShowErrorMessage: false,
      shouldFlyToMarker: [false, []],
    };
  }

  addMarker(e) {
    let newMarker = {
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

  showElevation(e) {
    this.setState({
      shouldShowElevation: e.currentTarget.value === "cycling" ? true : false,
    });
  }

  submitWorkoutForm(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let workoutType = formData.get("type");
    let distance = +formData.get("distance") || null;
    let duration = +formData.get("duration") || null;
    let cadence = workoutType === "running" ? +formData.get("cadence") : null;
    let elevation =
      workoutType === "cycling" ? +formData.get("elevation") : null;
    let pace = (duration / distance).toFixed(2) || null;
    let speed = (distance / (duration / 60)).toFixed(2) || null;
    let date = new Date().toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
    });

    if (!validInputs([distance, duration, cadence ?? elevation]))
      return this.setState({ shouldShowErrorMessage: true });

    this.setState((prevState) => {
      let markersCopy = prevState.markers;
      let key = markersCopy[0].key;
      return {
        workouts: [
          {
            key,
            status: "view",
            type: workoutType,
            date,
            distance,
            duration,
            cadence,
            elevation,
            pace,
            speed,
          },
          ...prevState.workouts,
        ],
      };
    });
    this.setState({ shouldShowElevation: false });
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
  }

  closeWorkoutForm() {
    this.setState({ shouldShowEditWorkoutForm: false });
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
    this.setState(function (prevState) {
      let markersCopy = prevState.markers;
      markersCopy.splice(-1);
      return { markers: markersCopy };
    });
  }

  showEditWorkoutForm(e) {
    let workoutToEditElement = e.currentTarget.closest(".workout");
    let workoutKey = workoutToEditElement.dataset.key;
    // let workoutsCopy = this.state.workouts;
    // let selectedWorkout = workoutsCopy.find(
    //   (workout) => workout.key === workoutKey
    // );
    // selectedWorkout.status = "edit";

    this.setState((prevState) => {
      let workoutsCopy = prevState.workouts;
      let selectedWorkout = prevState.workouts.find(
        (workout) => workout.key === workoutKey
      );
      selectedWorkout.status = "edit";

      return {
        workouts: workoutsCopy,
      };
    });
    // this.setState({ workoutToEdit: selectedWorkout });
    // this.setState({
    //   shouldShowElevation: selectedWorkout.type === "cycling" ? true : false,
    // });
  }

  submitEditWorkoutForm(e) {
    e.preventDefault();

    let workoutElement = e.currentTarget.closest(".workout");
    let workoutKey = workoutElement.dataset.key;
    let formData = new FormData(e.currentTarget);
    let workoutType = formData.get("type");
    let distance = +formData.get("distance") || null;
    let duration = +formData.get("duration") || null;
    let cadence = workoutType === "running" ? +formData.get("cadence") : null;
    let elevation =
      workoutType === "cycling" ? +formData.get("elevation") : null;
    let pace = (duration / distance).toFixed(2) || null;
    let speed = (distance / (duration / 60)).toFixed(2) || null;

    if (!validInputs([distance, duration, cadence ?? elevation]))
      return this.setState((prevState) => {
        let workoutsCopy = prevState.workouts;
        let selectedWorkout = prevState.workouts.find(
          (workout) => workout.key === workoutKey
        );
        selectedWorkout.status = "invalid form inputs";

        return {
          workouts: workoutsCopy,
        };
      });

    this.setState((prevState) => {
      let workoutsCopy = prevState.workouts;
      let selectedWorkout = prevState.workouts.find(
        (workout) => workout.key === workoutKey
      );

      selectedWorkout.type = workoutType;
      selectedWorkout.status = "view";
      selectedWorkout.distance = distance;
      selectedWorkout.duration = duration;
      selectedWorkout.cadence = cadence;
      selectedWorkout.elevation = elevation;
      selectedWorkout.pace = pace;
      selectedWorkout.speed = speed;

      return {
        workouts: workoutsCopy,
      };
    });
    this.setState({ shouldShowErrorMessage: false });
  }

  closeWorkoutEditForm(e) {
    this.setState((prevState) => {
      let workoutElement = e.target.closest(".workout");
      let workoutKey = workoutElement.dataset.key;
      let workoutsCopy = prevState.workouts;
      let selectedWorkout = prevState.workouts.find(
        (workout) => workout.key === workoutKey
      );
      selectedWorkout.status = "view";

      return { workouts: workoutsCopy };
    });
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
  }

  flyToMarker(e) {
    let workout = e.currentTarget.closest(".workout");
    let id = workout.dataset.key.split(" ");
    let lat = +id[0].slice(0, -1);
    let lng = +id[1];
    let coords = [lat, lng];

    this.setState({ shouldFlyToMarker: [true, coords] });
  }

  deleteWorkout(e) {
    let workoutElement = e.currentTarget.closest(".workout");
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
      <StrictMode>
        <View
          workouts={this.state.workouts}
          markers={this.state.markers}
          // Workout Form
          showForm={this.showWorkoutForm.bind(this)}
          showElevation={this.showElevation.bind(this)}
          submitWorkoutForm={this.submitWorkoutForm.bind(this)}
          shouldShowForm={this.state.shouldShowForm}
          shouldShowElevation={this.state.shouldShowElevation}
          shouldShowErrorMessage={this.state.shouldShowErrorMessage}
          closeWorkoutForm={this.closeWorkoutForm.bind(this)}
          deleteWorkout={this.deleteWorkout.bind(this)}
          // Workout Edit Form
          showEditWorkoutForm={this.showEditWorkoutForm.bind(this)}
          submitEditWorkoutForm={this.submitEditWorkoutForm.bind(this)}
          closeWorkoutEditForm={this.closeWorkoutEditForm.bind(this)}
          // Markers
          addMarker={this.addMarker.bind(this)}
          flyToMarker={this.flyToMarker.bind(this)}
          shouldFlyToMarker={this.state.shouldFlyToMarker}
        />
      </StrictMode>
    );
  }
}
