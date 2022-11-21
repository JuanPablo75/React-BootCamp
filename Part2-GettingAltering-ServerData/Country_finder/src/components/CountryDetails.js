import axios from "axios";
import React, { useState } from "react";

import kelvinToCelsius from "../utils/kelvinToCelsius";

const CountryDetails = ({ country }) => {

    const [temperature, setTemperature] = useState(0);
    const [wind, setWind] = useState(0);
    const [icon, setIcon] = useState("");

    const response = axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0].toLowerCase()}&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
            console.log(response.data);
            setTemperature(kelvinToCelsius(response.data.main.temp));
            setWind(response.data.wind.speed);
            setIcon(response.data.weather[0].icon);
        })

    console.log(response.data)

    return (
        <div>
            <h2>{country.name}</h2>
            <div>Capital: {country.capital[0]}</div>
            <div>Area: {country.area}</div>
            <div>Population: {country.population}</div>
            <h2>Languages:</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <div>
                <img src={country.flags.png} alt={`${country.name}`}></img>
            </div>
            <h2>Wheather in {country.capital[0]}</h2>
            <div>Temperature: {temperature}ºC</div>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon"></img>
            <div>Wind {wind}m/s</div>
        </div>
    );


};

export default CountryDetails;
