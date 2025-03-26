import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const sum = (good, neutral, bad) => {
    return good + neutral + bad;
  };

  const average = (good, neutral, bad) => {
    if (sum(good, neutral, bad) === 0) {
      return 0;
    }

    return sum(good, neutral * 0, bad * -1) / sum(good, neutral, bad);
  };

  const positive = (good, neutral, bad) => {
    if (sum(good, neutral, bad) === 0) {
      return 0;
    }

    return (good / sum(good, neutral, bad)) * 100;
  };

  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum(good, neutral, bad)}</p>
      <p>average {average(good, neutral, bad)}</p>
      <p>positive {positive(good, neutral, bad)} %</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
