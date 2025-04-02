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
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        )
        .then((response) => {
          setWeather(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.message));
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
            <p>Temperature {weather.main.temp} Celsius</p>{' '}
            <img
              alt='icon'
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>Wind {weather.wind.speed} m/s</p>
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
