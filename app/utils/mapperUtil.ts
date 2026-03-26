import { CreateExerciseDto, CreateSetDto, CreateWorkoutDto } from "../dto/workoutDtos";
import { Workout } from "../models/workoutModel";

export function mapToCreateWorkoutDto(workout: Workout) {
  const workoutDto: CreateWorkoutDto = {
    userId: 2,
    workoutType: workout.workoutType,
    workoutAlias: workout.workoutAlias,
    // notes: workout.notes,
    // startedAt: workout.startedAt ? workout.startedAt.toISOString() : null,
    // finishedAt: workout.finishedAt ? workout.finishedAt.toISOString() : null,
    exercises: [],
  };
  const exercisesDto: CreateExerciseDto[] = [];
  workout.exercises.forEach((e) => {
    let exerciseDto: CreateExerciseDto = {
      exerciseKey: e.excerciseKey,
      exerciseName: e.excerciseName,
      orderIndex: e.orderIndex,
      sets: [],
    };
    e.sets.forEach((s) => {
      let setDTo: CreateSetDto = {
        setNumber: s.setNumber,
        reps: s.reps,
        weight: s.weight,
      };
      exerciseDto.sets.push(setDTo);
    });
    exercisesDto.push(exerciseDto);
  });
  workoutDto.exercises = exercisesDto;

  return workoutDto;
}
