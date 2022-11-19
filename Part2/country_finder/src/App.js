import { useEffect, useState } from "react";
import axios from "axios";

import CountryDetails from "./components/CountryDetails";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState("");
    const [showCountry, setShowCountry] = useState({});

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(
                response.data.map(
                    ({
                        name,
                        capital,
                        area,
                        languages,
                        population,
                        flags,
                    }) => ({
                        name: name.common,
                        capital,
                        languages,
                        area,
                        population,
                        flags,
                    })
                )
            );
        });
    }, []);
    //console.log(countries);

    const filteredCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleChange = (e) => {
        setFilter(e.target.value)
        setShowCountry({})
    };

    const handleClickShow = name => () =>
        setShowCountry(
            filteredCountries.filter((country) =>
                country.name.includes(name))[0]
        );

    return (
        <div>
            <h1>Country Finder</h1>
            <div>
                Find countries by name{" "}
                <input value={filter} onChange={handleChange} />
            </div>
            {filteredCountries.length > 10 && (
                <div>Too many matches, specify another filter</div>
            )}
            {filteredCountries.length <= 10 &&
                filteredCountries.length > 1 &&
                filteredCountries.map((country) => (
                    <div key={country.name}>
                        {country.name}
                        <button onClick={handleClickShow(country.name)}>Show</button>
                    </div>
                ))}
            {filteredCountries.length === 1 && (
                <CountryDetails country={filteredCountries[0]} />
            )}
            {showCountry.name && <CountryDetails country={showCountry} />}
        </div>
    );
};

export default App;
