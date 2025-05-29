/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import { calculateBmi, parseHeightAndWeight } from './bmiCalculator';
import {
  calculateExercises,
  parseExercisesArguments,
} from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseHeightAndWeight(
      req.query.height,
      req.query.weight
    );
    const bmi = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi,
    });
  } catch (error) {
    let errorMessage = `Something bad happened.`;
    if (error instanceof Error) {
      errorMessage += `Error: ` + error.message;
    }
    res.status(400).json({ error: errorMessage });
  }

  res.end();
});

app.post('/exercises', (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  try {
    const { dailyHours, target } = parseExercisesArguments(
      req.body.daily_exercises,
      req.body.target
    );

    const exercises = calculateExercises(dailyHours, target);

    res.json(exercises);
  } catch (error) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
