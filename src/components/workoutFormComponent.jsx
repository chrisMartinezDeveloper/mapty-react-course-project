import React, { Component, useRef } from "react";
import "../css/style.css";

function WorkoutForm(props) {
  return (
    <form className="form" onChange={props.submitWorkoutForm}>
      <div className="form__row">
        <label className="form__label">Type</label>
        <select className="form__input type" onChange={props.showElevation}>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>
      <div className="form__row">
        <label className="form__label">Distance</label>
        <input className="form__input distance" placeholder="km" autoFocus />
      </div>
      <div className="form__row">
        <label className="form__label">Duration</label>
        <input className="form__input duration" placeholder="min" />
      </div>
      {!props.shouldShowElevation && (
        <div className="form__row">
          <label className="form__label">Cadence</label>
          <input className="form__input cadence" placeholder="step/min" />
        </div>
      )}
      {props.shouldShowElevation && (
        <div className="form__row">
          <label className="form__label">Elevation Gain</label>
          <input className="form__input elevation" placeholder="meters" />
        </div>
      )}
      <div className="form__row btnSubmit">
        <input type="submit" className="btn submit" />
      </div>
    </form>
  );
}

export default WorkoutForm;
