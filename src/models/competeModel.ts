import { Workout } from "./workoutModel";

export type rival = {
  userTotalWeightLifted: number;
  rivalTotalWeightLifted: number;
  rivalName: string;
};

export type LeaderBoardFriend = {
  userName: string;
  workouts: Workout[];
};
