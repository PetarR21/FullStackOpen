import { useState } from 'react';

const Statistics = ({ good, neutral, bad }) => {
  const sum = (good, neutral, bad) => {
    return good + neutral + bad;
  };

  const average = (good, neutral, bad) => {
    return sum(good, neutral * 0, bad * -1) / sum(good, neutral, bad);
  };

  const positive = (good, neutral, bad) => {
    return (good / sum(good, neutral, bad)) * 100;
  };

  if (sum(good, neutral, bad) == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={sum(good, neutral, bad)} />
            <StatisticLine text='average' value={average(good, neutral, bad).toFixed(1)} />
            <StatisticLine text='positive' value={positive(good, neutral, bad).toFixed(1) + ' %'} />
          </tbody>
        </table>
      </div>
    );
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={() => setGood(good + 1)} />
      <Button text='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button text='bad' onClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
