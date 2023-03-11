import React from "react";
import "../css/style.css";

export default function WorkoutForm(props) {
  return (
    <form className="form" onSubmit={props.submitWorkoutForm}>
      <div className="form__row">
        <label className="form__label">Type</label>
        <select
          name="type"
          className="form__input type"
          defaultValue="running"
          onChange={props.showElevation}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>
      <div className="form__row">
        <label className="form__label">Distance</label>
        <input
          name="distance"
          className="form__input"
          placeholder="km"
          type="number"
          min="0"
          autoFocus
        />
      </div>
      <div className="form__row">
        <label className="form__label">Duration</label>
        <input
          name="duration"
          className="form__input"
          placeholder="min"
          type="number"
          min="0"
        />
      </div>
      {!props.shouldShowElevation && (
        <div className="form__row">
          <label className="form__label">Cadence</label>
          <input
            name="cadence"
            className="form__input"
            placeholder="step/min"
            type="number"
            min="0"
          />
        </div>
      )}
      {props.shouldShowElevation && (
        <div className="form__row">
          <label className="form__label">Elevation Gain</label>
          <input
            name="elevation"
            className="form__input"
            placeholder="meters"
            type="number"
            min="0"
          />
        </div>
      )}
      {props.shouldShowErrorMessage && (
        <p className="input__error__message">
          Please Enter Numbers above 0 for All Fields
        </p>
      )}
      <div className="form__row btnSubmit">
        <input type="submit" className="btn submit" />
        <button className="btn cancel" onClick={props.closeWorkoutForm}>
          Cancel
        </button>
      </div>
    </form>
  );
}
