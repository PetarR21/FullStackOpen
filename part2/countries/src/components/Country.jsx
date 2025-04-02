import axios from 'axios';
import { useEffect, useState } from 'react';

const Country = ({ country, show }) => {
  const [showCountry, setShowCounty] = useState(show);

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_KEY;

    if (country) {
      const capital = country.capital;
      console.log(capital);
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then((response) => {
          console.log(response.data.weather);
        });
    }
  }, []);

  if (showCountry) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        {show ? (
          ''
        ) : (
          <button onClick={() => setShowCounty(!showCountry)}>
            {showCountry ? 'hide' : 'show'}
          </button>
        )}
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img alt='flag' src={country.flags.png} />
        <h2>Weather in {country.capital}</h2>
        {weather ? (
          <div>
            {' '}
            <p>hello</p>{' '}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  } else {
    return (
      <p>
        {country.name.common}{' '}
        <button onClick={() => setShowCounty(!showCountry)}>{showCountry ? 'hide' : 'show'}</button>
      </p>
    );
  }
};

export default Country;
