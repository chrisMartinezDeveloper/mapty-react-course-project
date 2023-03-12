import { StrictMode } from "react";
import { validInputs } from "./helpers";
import { Component } from "react";
// import Model from "./Model";
import View from "./View";

export class ControllerComponent extends Component {
  constructor(props) {
    console.log("Welcome to Mapty!");
    super(props);

    // let maptyDBRequest = Model.initializeDB();

    this.state = {
      // maptyDB: maptyDBRequest.result || null,
      // dbErrorMessage: maptyDBRequest.errorMessage || null,
      markers: [],
      workouts: [],
      workoutToEdit: null,
      shouldShowForm: false,
      shouldShowElevation: false,
      shouldShowErrorMessage: false,
      shouldFlyToMarker: [false, []],
    };

    // console.log("DB: ", this.state.maptyDB);
    // console.log("Error Mesage: ", this.state.dbErrorMessage);
    // Model.setLocalStorage(this.state.workouts, this.state.markers);
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

  showElevation(e) {
    this.setState({
      shouldShowElevation: e.currentTarget.value === "cycling" ? true : false,
    });
  }

  submitWorkoutForm(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const workoutType = formData.get("type");
    const distance = +formData.get("distance") || null;
    const duration = +formData.get("duration") || null;
    const cadence = workoutType === "running" ? +formData.get("cadence") : null;
    const elevation =
      workoutType === "cycling" ? +formData.get("elevation") : null;
    const pace = (duration / distance).toFixed(2) || null;
    const speed = (distance / (duration / 60)).toFixed(2) || null;
    const date = new Date().toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
    });

    if (!validInputs([distance, duration, cadence ?? elevation]))
      return this.setState({ shouldShowErrorMessage: true });

    this.setState((prevState) => {
      const markersCopy = prevState.markers;
      const key = markersCopy[0].key;
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
    this.setState({ shouldShowErrorMessage: false });
    this.setState({ shouldShowForm: false });
    this.setState(function (prevState) {
      const markersCopy = prevState.markers;
      markersCopy.splice(0, 1);
      return { markers: markersCopy };
    });
  }

  showEditWorkoutForm(e) {
    const workoutToEditElement = e.currentTarget.closest(".workout");
    const workoutKey = workoutToEditElement.dataset.key;

    this.setState((prevState) => {
      const workoutsCopy = prevState.workouts;
      const selectedWorkout = prevState.workouts.find(
        (workout) => workout.key === workoutKey
      );
      selectedWorkout.status = "edit";

      return {
        workouts: workoutsCopy,
      };
    });
  }

  submitEditWorkoutForm(e) {
    e.preventDefault();

    const workoutElement = e.currentTarget.closest(".workout");
    const workoutKey = workoutElement.dataset.key;
    const formData = new FormData(e.currentTarget);
    const workoutType = formData.get("type");
    const distance = +formData.get("distance") || null;
    const duration = +formData.get("duration") || null;
    const cadence = workoutType === "running" ? +formData.get("cadence") : null;
    const elevation =
      workoutType === "cycling" ? +formData.get("elevation") : null;
    const pace = (duration / distance).toFixed(2) || null;
    const speed = (distance / (duration / 60)).toFixed(2) || null;

    if (!validInputs([distance, duration, cadence ?? elevation]))
      return this.setState((prevState) => {
        const workoutsCopy = prevState.workouts;
        const selectedWorkout = prevState.workouts.find(
          (workout) => workout.key === workoutKey
        );
        selectedWorkout.status = "invalid form inputs";

        return {
          workouts: workoutsCopy,
        };
      });

    this.setState((prevState) => {
      const workoutsCopy = prevState.workouts;
      const selectedWorkout = prevState.workouts.find(
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
  }

  closeWorkoutEditForm(e) {
    this.setState((prevState) => {
      const workoutElement = e.target.closest(".workout");
      const workoutKey = workoutElement.dataset.key;
      const workoutsCopy = prevState.workouts;
      const selectedWorkout = prevState.workouts.find(
        (workout) => workout.key === workoutKey
      );
      selectedWorkout.status = "view";

      return { workouts: workoutsCopy };
    });
  }

  deleteWorkout(e) {
    const workoutElement = e.currentTarget.closest(".workout");
    const workoutKey = workoutElement.dataset.key;
    const workoutsCopy = this.state.workouts;
    const filteredWorkoutsCopy = workoutsCopy.filter(
      (workout) => workout.key !== workoutKey
    );
    const markersCopy = this.state.markers;
    const filteredMarkersCopy = markersCopy.filter(
      (marker) => marker.key !== workoutKey
    );

    this.setState({ workouts: filteredWorkoutsCopy });
    this.setState({ markers: filteredMarkersCopy });
  }

  flyToMarker(e) {
    const workout = e.currentTarget.closest(".workout");
    const id = workout.dataset.key.split(" ");
    const lat = +id[0].slice(0, -1);
    const lng = +id[1];
    const coords = [lat, lng];

    this.setState({ shouldFlyToMarker: [true, coords] });
  }

  render() {
    return (
      <StrictMode>
        <View
          // State Variables
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
