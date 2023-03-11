class Model {
  // Saves the workouts to local storage
  setLocalStorage() {
    // Browser provided API
    // Only to be used for small amounts of data
    // Bad because it is Blocking
    localStorage.setItem(`workouts`, JSON.stringify(this.state.workouts));
  }

  // Gets the workouts from local storage
  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(`workouts`));

    if (!data) return;

    this.state.workouts = data;
  }

  // Updates local storage
  updateLocalStorage() {
    localStorage.removeItem(`workouts`);
    this.setLocalStorage();
  }
}

export default new Model();
