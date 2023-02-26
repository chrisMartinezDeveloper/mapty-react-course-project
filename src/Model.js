import { L } from "leaflet";
import { MAP_ZOOM_LEVEL } from "./config";
import { validInputs, allPositive } from "./helpers";

const model = {
  state: {
    latitude: 0,
    longitude: 0,
    map: ``,
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
    workout: {},
    workouts: [],
  },

  // From JS Course
  // ---
  // const getPosition = function () {
  //   // Geolocation API
  //   if (navigator.geolocation)
  //     navigator.geolocation.getCurrentPosition(loadMap.bind(this), function () {
  //       alert(`Could not get your location.`);
  //     });
  // };

  loadMap: async function (position) {
    try {
      // From JS Course
      // ---
      // const { latitude } = position.coords;
      // const { longitude } = position.coords;

      // Lattitude and Longitude for New York City
      this.state.latitude = 40.7591703;
      this.state.longitude = -74.0394429;
      const coords = [this.state.latitude, this.tate.longitude];

      this.state.map = await L.map("map").setView(coords, MAP_ZOOM_LEVEL);

      await L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(this.state.map);
    } catch (error) {
      throw error;
    }
  },

  // Loads the map from the Leaflet Library
  //   loadMap: async function (position) {
  //     try {
  //       // From JS Course
  //       // ---
  //       // const { latitude } = position.coords;
  //       // const { longitude } = position.coords;

  //       // Lattitude and Longitude for New York City
  //       this.state.latitude = 40.7591703;
  //       this.state.longitude = -74.0394429;
  //       const coords = [this.state.latitude, this.state.longitude];

  //       this.state.map = await L.map("map").setView(coords, MAP_ZOOM_LEVEL);

  //       await L.tileLayer(
  //         "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
  //         {
  //           attribution:
  //             '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //         }
  //       ).addTo(this.state.map);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },

  // Gets the map from the state
  getMap: () => this.state.map,

  // Gets the current workout from the state
  getWorkout: () => this.state.workout,

  // Gets all the workouts from the state
  getWorkouts: () => this.state.workouts,

  // Create a new user defined workout
  createNewWorkout: function (workoutData) {
    const inputs = workoutData.getInputs();
    if (!validInputs(inputs) || !allPositive(inputs))
      throw new Error(`Invalid Inputs`);

    this.state.workout = {
      date: new Date(),
      id: (Date.now() + ``).slice(-10),
      type: workoutData.type,
      distance: workoutData.distance.toFixed(2),
      duration: workoutData.duration.toFixed(2),
      coords: [workoutData.latitude, workoutData.longitude],
      cadence: workoutData.type === "running" ? workoutData.cadence : 0,
      elevation: workoutData.type === "cycling" ? workoutData.elevation : 0,
      pace: +(workoutData.duration / workoutData.distance).toFixed(2),
      speed: +(workoutData.distance / (workoutData.duration / 60)).toFixed(2),
    };

    // prettier-ignore
    this.state.workout.discription = `${workoutData.type[0].toUpperCase()}${workoutData.type.slice(1)} on ${
        this.state.months[this.state.workout.date.getMonth()]
    } ${this.state.workout.date.getDate()}`;

    this.state.workouts.push(this.state.workout);
  },

  // Deletes the given workout
  deleteWorkout: function (id) {
    this.state.workouts.forEach((workout, i) => {
      if (workout.id === id) {
        this.state.workouts.splice(i, 1);
      }
    });

    this.updateLocalStorage();
  },

  // Makes user requested edits to the given workout
  editWorkout: function (editFormData) {
    const inputs = editFormData.getInputs();
    if (!validInputs(inputs) || !allPositive(inputs))
      throw new Error(`Invalid Inputs`);

    const workout = this.state.workouts.find(
      (wrkt) => wrkt.id === editFormData.id
    );

    workout.type =
      workout.type === editFormData.type ? workout.type : editFormData.type;
    workout.distance = editFormData.distance;
    workout.duration = editFormData.duration;
    workout.cadence = editFormData.cadence;
    workout.elevation = editFormData.elevation;
    if (editFormData.type === "running")
      workout.pace = +(editFormData.duration / editFormData.distance).toFixed(
        2
      );
    if (editFormData.type === "cycling")
      workout.pace = +(
        +editFormData.distance /
        (editFormData.duration / 60)
      ).toFixed(2);

    const parsedDescription = workout.discription;
    workout.discription =
      workout.type.slice(0, 1).toUpperCase() +
      workout.type.slice(1) +
      parsedDescription.slice(7);

    this.updateLocalStorage();

    return workout;
  },

  // Gets the current workout
  getCurrentWorkout: function (id) {
    return this.state.workouts.find((wrkt) => wrkt.id === id);
  },

  // Saves the workouts to local storage
  setLocalStorage: function () {
    // Browser provided API
    // Only to be used for small amounts of data
    // Bad because it is Blocking
    localStorage.setItem(`workouts`, JSON.stringify(this.state.workouts));
  },

  // Gets the workouts from local storage
  getLocalStorage: function () {
    const data = JSON.parse(localStorage.getItem(`workouts`));

    if (!data) return;

    this.state.workouts = data;
  },

  // Updates local storage
  updateLocalStorage: function () {
    localStorage.removeItem(`workouts`);
    this.setLocalStorage();
  },
};

export default model;
