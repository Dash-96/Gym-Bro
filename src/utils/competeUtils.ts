//. calculate the relative volume of the users lifted weights
export function calculateLiftingScore(totalWeightLifted: number, userWeight: number, userGender: "man" | "woman") {
  const coefficients = {
    man: {
      first: -216.0475144,
      second: 16.2606339,
      third: -0.002388645,
      fourth: -0.00113732,
      fifth: 7.01863 * Math.pow(10, -6),
      sixth: -1.291 * Math.pow(10, -8),
    },
    woman: {
      first: 594.31747775582,
      second: -27.23842536447,
      third: 0.82112226871,
      fourth: -0.00930733913,
      fifth: 4.731582 * Math.pow(10, -5),
      sixth: -9.054 * Math.pow(10, -8),
    },
  };

  const co = coefficients[userGender];
  const delimeter =
    co.fifth +
    co.second * userWeight +
    co.third * Math.pow(userWeight, 2) +
    co.fourth * Math.pow(userWeight, 3) +
    co.fifth * Math.pow(userWeight, 4) +
    co.sixth * Math.pow(userWeight, 5);
  const score = totalWeightLifted * (500 / delimeter);
  return Number(score.toFixed(2));
}

//. Define the leaderboard categories
export const leaderBoardTabs = ["Workouts", "Volume", "R.Volume"] as const;
export type leaderBoardTabValue = (typeof leaderBoardTabs)[number];
