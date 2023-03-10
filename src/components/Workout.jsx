export default function Workout({
	workout,
	flyToMarker,
	deleteWorkout,
	showEditWorkoutForm,
	shouldShowElevation,
	showElevation,
	workoutToEdit,
	submitEditWorkoutForm,
	closeWorkoutEditForm,
	shouldShowErrorMessage,
}) {
	return (
		<>
			{workout.status === "view" && (
				<li
					className={`workout workout--${workout.type}`}
					data-key={workout.key}
					onClick={flyToMarker}>
					<div className="workout__header">
						<h2 className="workout__title">
							{workout.discription}
						</h2>
						<p
							className="workout__delete-icon"
							onClick={deleteWorkout}>
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
							<>
								<div className="workout__details">
									{/* <span className="workout__label">⚡️</span> */}
									<span className="workout__label">Pace</span>
									<span className="workout__value">
										{workout.pace}
										<span className="workout__unit">
											min/km
										</span>
									</span>
								</div>
								<div className="workout__details">
									{/* <span className="workout__label">🦶🏼</span> */}
									<span className="workout__label">
										Cadence
									</span>
									<span className="workout__value">
										{workout.cadence}
										<span className="workout__unit">
											spm
										</span>
									</span>
								</div>
							</>
						)}
						{workout.type === `cycling` && (
							<>
								<div className="workout__details">
									{/* <span className="workout__label">⚡️</span> */}
									<span className="workout__label">
										Speed
									</span>
									<span className="workout__value">
										{workout.speed}
										<span className="workout__unit">
											km/h
										</span>
									</span>
								</div>
								<div className="workout__details">
									{/* <span className="workout__label">⛰</span> */}
									<span className="workout__label">
										Elevation
									</span>
									<span className="workout__value">
										{workout.elevation}
										<span className="workout__unit">m</span>
									</span>
								</div>
							</>
						)}
					</div>
					<div className="btn__container">
						<button
							className="btn workout__edit"
							onClick={showEditWorkoutForm}>
							Edit
						</button>
					</div>
				</li>
			)}
			{workout.status === "edit" && (
				<li
					className={`workout workout--${workoutToEdit.type}`}
					data-key={workout.key}
					onClick={flyToMarker}>
					<form
						className="form edit"
						onSubmit={submitEditWorkoutForm}>
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
								onChange={showElevation}>
								<option value="running">Running</option>
								<option value="cycling">Cycling</option>
							</select>
						</div>
						<div className="form__row edit">
							<label className="form__label">Distance</label>
							<input
								className="form__input distance"
								placeholder="km"
								defaultValue={
									workoutToEdit ? workoutToEdit.distance : ""
								}
								autoFocus
							/>
						</div>
						<div className="form__row edit">
							<label className="form__label">Duration</label>
							<input
								className="form__input duration"
								placeholder="min"
								defaultValue={
									workoutToEdit ? workoutToEdit.duration : ""
								}
							/>
						</div>
						{!shouldShowElevation && (
							<div className="form__row edit">
								<label className="form__label">Cadence</label>
								<input
									className="form__input cadence"
									placeholder="step/min"
									defaultValue={
										workoutToEdit
											? workoutToEdit.cadence
											: ""
									}
								/>
							</div>
						)}
						{shouldShowElevation && (
							<div className="form__row edit">
								<label className="form__label">Elev Gain</label>
								<input
									className="form__input elevation"
									placeholder="meters"
									defaultValue={
										workoutToEdit
											? workoutToEdit.elevation
											: ""
									}
								/>
							</div>
						)}
						{shouldShowErrorMessage && (
							<p className="input__error__message edit">
								Invalid Inputs: Please enter positive numbers
								only
							</p>
						)}
						<div className="form__row edit submit__edit">
							<input type="submit" className="btn submit" />
							<button
								className="btn cancel"
								onClick={closeWorkoutEditForm}>
								Cancel
							</button>
						</div>
					</form>
				</li>
			)}
		</>
	);
}