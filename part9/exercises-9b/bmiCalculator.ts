import { isNotNumber } from './utils';

interface weightAndHeight {
  height: number;
  weight: number;
}

const parseArgumentsCLI = (args: string[]): weightAndHeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const parseHeightAndWeight = (height: unknown, weight: unknown) => {
  if (!isNotNumber(height) && !isNotNumber(weight)) {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height * height) / 10000);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal weight';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgumentsCLI(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = `Something bad happened.`;
    if (error instanceof Error) {
      errorMessage += `Error: ` + error.message;
    }
    console.log(errorMessage);
  }
}
