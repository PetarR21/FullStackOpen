import express from 'express';
import { calculateBmi, parseHeightAndWeight } from './bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
