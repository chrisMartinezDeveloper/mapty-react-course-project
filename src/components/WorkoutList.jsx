import Workout from "./Workout";

export default function WorkoutList(props) {
	return (
		<ul className="workouts">
			{props.workouts.map((workout) => (
				<Workout
					key={workout.key}
					workout={workout}
					flyToMarker={props.flyToMarker}
					showEditWorkoutForm={props.showEditWorkoutForm}
					deleteWorkout={props.deleteWorkout}
					shouldShowElevation={props.shouldShowElevation}
					showElevation={props.showElevation}
					workoutToEdit={props.workoutToEdit}
					submitEditWorkoutForm={props.submitEditWorkoutForm}
					closeWorkoutEditForm={props.closeWorkoutEditForm}
					shouldShowErrorMessage={props.shouldShowErrorMessage}
				/>
			))}
		</ul>
	);
}
