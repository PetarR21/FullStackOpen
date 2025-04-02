import Country from './Country';

const Countries = ({ countries, filter }) => {
  if (!countries || !filter) {
    return;
  }

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
      country.name.official.trim().toLowerCase().includes(filter.trim().toLowerCase())
  );

  if (filteredCountries.length === 0) {
    return <p>No match</p>;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((c) => (
          <Country key={c.name.common} country={c} show={false} />
        ))}
      </div>
    );
  }

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country key={country.name.common} country={country} show={true} />;
  }
};

export default Countries;
