class Model {
  // async initializeDB(database) {
  //   try {
  //     let dbRequest = await window.indexedDB.open("maptyDB", 1);
  //     let result = dbRequest.readyState || null;
  //     let errorMessage = dbRequest.error.message || null;
  //     let request = {
  //       result,
  //       errorMessage,
  //     };

  //     console.log("Request: ", request);

  //     return request;
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // }

  // Saves the workouts to local storage
  setLocalStorage(workouts, markers) {
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
