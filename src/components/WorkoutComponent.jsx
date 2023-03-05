import React, { Component } from "react";
import "../css/style.css";
// import { library, icon } from "@fortawesome/fontawesome-svg-core";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// library.add(faXmark);

// async function getXIcon() {
//   try {
//     const x = await icon(faXmark, {
//       classes: ["workout__delete-icon"],
//     }).html;

//     return x;
//   } catch (error) {
//     console.error(error);
//   }
// }

function WorkoutComponent({
  workout,
  coords,
  flyToMarker,
  deleteWorkout,
  editWorkout,
}) {
  return (
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
          <span className="workout__icon">
            {workout.type === `running` ? `🏃‍♂️` : `🚴‍♀️`}
          </span>
          <span className="workout__value">{workout.distance}</span>
          <span className="workout__unit">km</span>
        </div>
        <div className="workout__details">
          <span className="workout__icon">⏱</span>
          <span className="workout__value">{workout.duration}</span>
          <span className="workout__unit">min</span>
        </div>
        {workout.type === `running` && (
          <React.Fragment>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">${workout.pace}</span>
              <span className="workout__unit">min/km</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">🦶🏼</span>
              <span className="workout__value">{workout.cadence}</span>
              <span className="workout__unit">spm</span>
            </div>
          </React.Fragment>
        )}
        {workout.type === `cycling` && (
          <React.Fragment>
            <div className="workout__details">
              <span className="workout__icon">⚡️</span>
              <span className="workout__value">{workout.speed}</span>
              <span className="workout__unit">km/h</span>
            </div>
            <div className="workout__details">
              <span className="workout__icon">⛰</span>
              <span className="workout__value">{workout.elevation}</span>
              <span className="workout__unit">m</span>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="btn__container">
        <button className="btn workout__edit">Edit</button>
      </div>
    </li>
  );
}

export default WorkoutComponent;
