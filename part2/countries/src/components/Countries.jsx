const Countries = ({ countries, filter }) => {
  if (!countries) {
    return;
  }

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common
        .trim()
        .toLowerCase()
        .includes(filter.trim().toLowerCase()) ||
      country.name.official
        .trim()
        .toLowerCase()
        .includes(filter.trim().toLowerCase())
  );

  if (filteredCountries.length === 0) {
    return <p>No match</p>;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  console.log(filteredCountries);

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((c) => (
          <div key={c.name.common}>{c.name.common}</div>
        ))}
      </div>
    );
  }
};

export default Countries;
