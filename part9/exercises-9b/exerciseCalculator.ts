/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNotNumber } from './utils';

interface ExerciseArgumentValues {
  dailyHours: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseArgumentValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  let dailyHours: number[] = [];
  for (let index = 3; index < args.length; index++) {
    if (!isNotNumber(args[index])) {
      dailyHours = [...dailyHours, Number(args[index])];
    } else {
      throw new Error('Exercise hours must be a number.');
    }
  }

  let target = 0;
  if (!isNotNumber(args[3])) {
    target = Number(args[3]);
  }

  return {
    dailyHours,
    target,
  };
};

export const parseExercisesArguments = (
  dailyExercises: any[],
  target: any
): ExerciseArgumentValues => {
  if (dailyExercises.length < 1) throw new Error('malformatted parameters');

  let dailyHours: number[] = [];
  for (let index = 0; index < dailyExercises.length; index++) {
    if (!isNotNumber(dailyExercises[index])) {
      dailyHours = [...dailyHours, Number(dailyExercises[index])];
    } else {
      throw new Error('malformatted parameters');
    }
  }

  let parsedTarget: number = 0;
  if (!isNotNumber(target)) {
    parsedTarget = Number(target);
  } else {
    throw new Error('malformatted parameters');
  }

  return {
    dailyHours,
    target: parsedTarget,
  };
};

export const calculateExercises = (daily: number[], target: number): Result => {
  // Period length
  const periodLength: number = daily.length;

  //Training days and total time
  let trainingDays: number = 0;
  let totalTime: number = 0;
  for (let index: number = 0; index < daily.length; index++) {
    if (daily[index] > 0) {
      trainingDays++;
    }
    totalTime += daily[index];
  }
  //Average time
  const average = totalTime / periodLength;

  //Success
  const success: boolean = average >= target ? true : false;

  //Rating and Rating Description
  let rating = 0;
  let ratingDescription = '';
  if (average < target * 0.8) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average < target * 2) {
    rating = 2;
    ratingDescription = 'ok';
  } else {
    rating = 3;
    ratingDescription = 'good';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error) {
  let errorMessage = 'Something went wrong. ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage);
}
