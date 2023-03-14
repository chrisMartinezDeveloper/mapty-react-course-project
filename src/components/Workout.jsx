import { Fragment } from "react";
import "../css/style.css";

export default function Workout({
  workout,
  flyToMarker,
  deleteWorkout,
  showEditWorkoutForm,
  shouldShowElevation,
  showElevation,
  submitEditWorkoutForm,
  closeWorkoutEditForm,
}) {
  return (
    <Fragment>
      {workout.status === "view" && (
        <li
          className={`workout workout--${workout.type}`}
          data-key={workout.key}
          onClick={flyToMarker}
        >
          <div className="workout__header">
            <h2 className="workout__title">
              <span>{workout.type}</span> on {workout.date}
            </h2>
            <p className="workout__delete-icon" onClick={deleteWorkout}>
              x
            </p>
          </div>
          <div className="workout__data">
            <div className="workout__details">
              <span className="workout__label">
                {/* {workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`} */}
                Distance
              </span>
              <span className="workout__value">
                {workout.distance}
                <span className="workout__unit">km</span>
              </span>
            </div>
            <div className="workout__details">
              {/* <span className="workout__label">⏱</span> */}
              <span className="workout__label">Duration</span>
              <span className="workout__value">
                {workout.duration}
                <span className="workout__unit">min</span>
              </span>
            </div>
            {workout.type === `running` && (
              <Fragment>
                <div className="workout__details">
                  {/* <span className="workout__label">⚡️</span> */}
                  <span className="workout__label">Pace</span>
                  <span className="workout__value">
                    {workout.pace}
                    <span className="workout__unit">min/km</span>
                  </span>
                </div>
                <div className="workout__details">
                  {/* <span className="workout__label">🦶🏼</span> */}
                  <span className="workout__label">Cadence</span>
                  <span className="workout__value">
                    {workout.cadence}
                    <span className="workout__unit">spm</span>
                  </span>
                </div>
              </Fragment>
            )}
            {workout.type === `cycling` && (
              <Fragment>
                <div className="workout__details">
                  {/* <span className="workout__label">⚡️</span> */}
                  <span className="workout__label">Speed</span>
                  <span className="workout__value">
                    {workout.speed}
                    <span className="workout__unit">km/h</span>
                  </span>
                </div>
                <div className="workout__details">
                  {/* <span className="workout__label">⛰</span> */}
                  <span className="workout__label">Elevation</span>
                  <span className="workout__value">
                    {workout.elevation}
                    <span className="workout__unit">m</span>
                  </span>
                </div>
              </Fragment>
            )}
          </div>
          <div className="btn__container">
            <button className="btn workout__edit" onClick={showEditWorkoutForm}>
              Edit
            </button>
          </div>
        </li>
      )}
      {(workout.status === "edit" ||
        workout.status === "invalid form inputs") && (
        <li
          className={`workout workout--${workout.type}`}
          data-key={workout.key}
          onClick={flyToMarker}
        >
          <form className="form edit" onSubmit={submitEditWorkoutForm}>
            <div className="form__row">
              <label className="form__label">Type</label>
              <select
                name="type"
                className="form__input type"
                defaultValue={
                  workout
                    ? workout.type === "running"
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
                name="distance"
                className="form__input"
                placeholder="km"
                defaultValue={workout ? workout.distance : ""}
                type="number"
                min="0"
                autoFocus
              />
            </div>
            <div className="form__row edit">
              <label className="form__label">Duration</label>
              <input
                name="duration"
                className="form__input"
                placeholder="min"
                defaultValue={workout ? workout.duration : ""}
                type="number"
                min="0"
              />
            </div>
            {!shouldShowElevation && (
              <div className="form__row edit">
                <label className="form__label">Cadence</label>
                <input
                  name="cadence"
                  className="form__input"
                  placeholder="step/min"
                  defaultValue={workout ? workout.cadence : ""}
                  type="number"
                  min="0"
                />
              </div>
            )}
            {shouldShowElevation && (
              <div className="form__row edit">
                <label className="form__label">Elev Gain</label>
                <input
                  name="elevation"
                  className="form__input"
                  placeholder="meters"
                  defaultValue={workout ? workout.elevation : ""}
                  type="number"
                  min="0"
                />
              </div>
            )}
            {workout.status === "invalid form inputs" && (
              <p className="input__error__message edit">
                Please Enter Numbers above 0 for All Fields
              </p>
            )}
            <div className="form__row edit submit__edit">
              <input type="submit" className="btn submit" />
              <button className="btn cancel" onClick={closeWorkoutEditForm}>
                Cancel
              </button>
            </div>
          </form>
        </li>
      )}
    </Fragment>
  );
}
