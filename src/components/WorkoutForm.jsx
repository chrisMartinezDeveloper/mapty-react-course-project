export default function WorkoutForm(props) {
  return (
    <form className="form" onSubmit={props.submitWorkoutForm}>
      <div className="form__row">
        <label className="form__label">Type</label>
        <select
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
      {props.shouldShowErrorMessage && (
        <p className="input__error__message">
          Invalid Inputs: Please enter positive numbers only
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
