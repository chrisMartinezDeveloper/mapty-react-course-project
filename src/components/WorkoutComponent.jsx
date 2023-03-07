import React, { Component } from "react";
import "../css/style.css";

function WorkoutComponent({
  workout,
  coords,
  flyToMarker,
  deleteWorkout,
  editWorkout,
  shouldShowElevation,
  showElevation,
  shouldShowEditWorkoutForm,
  workoutToEdit,
  submitEditWorkoutForm,
}) {
  const editLiStyle = {
    height: "40%",
    display: "flex",
    padding: "0rem",
  };

  return (
    <React.Fragment>
      {!shouldShowEditWorkoutForm && (
        <li
          className={`workout workout--${workout.type}`}
          data-id={workout.id}
          onClick={flyToMarker}
          id={coords}
        >
          <div className="workout__header">
            <h2 className="workout__title">{workout.discription}</h2>
            <p className="workout__delete-icon" onClick={deleteWorkout}>
              x
            </p>
          </div>
          <div className="workout__data">
            <div className="workout__details">
              {/* <span className="workout__icon">
                {workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}
              </span> */}
              <span className="workout__value">{workout.distance}</span>
              <span className="workout__unit">km</span>
            </div>
            <div className="workout__details">
              {/* <span className="workout__icon">⏱</span> */}
              <span className="workout__value">{workout.duration}</span>
              <span className="workout__unit">min</span>
            </div>
            {workout.type === `running` && (
              <React.Fragment>
                <div className="workout__details">
                  {/* <span className="workout__icon">⚡️</span> */}
                  <span className="workout__value">{workout.pace}</span>
                  <span className="workout__unit">min/km</span>
                </div>
                <div className="workout__details">
                  {/* <span className="workout__icon">🦶🏼</span> */}
                  <span className="workout__value">
                    {workout.cadence}
                    <span className="workout__unit">spm</span>
                  </span>
                </div>
              </React.Fragment>
            )}
            {workout.type === `cycling` && (
              <React.Fragment>
                <div className="workout__details">
                  {/* <span className="workout__icon">⚡️</span> */}
                  <span className="workout__value">{workout.speed}</span>
                  <span className="workout__unit">km/h</span>
                </div>
                <div className="workout__details">
                  {/* <span className="workout__icon">⛰</span> */}
                  <span className="workout__value">{workout.elevation}</span>
                  <span className="workout__unit">m</span>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="btn__container">
            <button className="btn workout__edit" onClick={editWorkout}>
              Edit
            </button>
          </div>
        </li>
      )}
      {shouldShowEditWorkoutForm && (
        <li
          className={`workout workout--${workout.type}`}
          style={editLiStyle}
          data-id={workout.id}
          onClick={flyToMarker}
          id={coords}
        >
          <form className="form edit" onSubmit={submitEditWorkoutForm}>
            <div className="form__row">
              <label className="form__label">Type</label>
              <select
                className="form__input type"
                defaultValue={
                  workoutToEdit
                    ? workoutToEdit.type === "running"
                      ? "running"
                      : "cycling"
                    : ""
                }
                onChange={showElevation}
              >
                <option value="running">Running</option>
                <option value="cycling">Cycling</option>
              </select>
            </div>
            <div className="form__row edit">
              <label className="form__label">Distance</label>
              <input
                className="form__input distance"
                placeholder="km"
                defaultValue={workoutToEdit ? workoutToEdit.distance : ""}
                autoFocus
              />
            </div>
            <div className="form__row edit">
              <label className="form__label">Duration</label>
              <input
                className="form__input duration"
                placeholder="min"
                defaultValue={workoutToEdit ? workoutToEdit.duration : ""}
              />
            </div>
            {!shouldShowElevation && (
              <div className="form__row edit">
                <label className="form__label">Cadence</label>
                <input
                  className="form__input cadence"
                  placeholder="step/min"
                  defaultValue={workoutToEdit ? workoutToEdit.cadence : ""}
                />
              </div>
            )}
            {shouldShowElevation && (
              <div className="form__row edit">
                <label className="form__label">Elev Gain</label>
                <input
                  className="form__input elevation"
                  placeholder="meters"
                  defaultValue={workoutToEdit ? workoutToEdit.elevation : ""}
                />
              </div>
            )}
            <div className="form__row edit submit__edit">
              <input type="submit" className="btn submit" />
            </div>
          </form>
        </li>
      )}
    </React.Fragment>
  );
}

export default WorkoutComponent;
