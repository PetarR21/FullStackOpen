import axios from "axios";
import { useEffect, useState } from "react";

import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div>
      <div>
        find countries{" "}
        <input
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          value={search}
          type="text"
        />
      </div>
      <Countries countries={countries} filter={search} />
    </div>
  );
};

export default App;
