import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [city, setCity] = useState("");

  const checkClick = async (e) => {
    if (e.key === "Enter") {
      try {
        // first call - "location" + "more"
        let response = await axios.get(`http://localhost:5000`, {
          params: {
            city: city,
          },
        });
        const data = response.data;
        setWeatherData(data);
      } catch (error) {
        setErrorMsg(
          "Oh uh, something went wrong.\n Try enter city name again."
        );
      }
    }
  };

  const handleChangeInput = (event) => {
    const result = event.target.value.replace(/[^a-z ]/gi, "");
    setCity(result);
  };

  return (
    <div className="background-container">
      <h1 className="title">Weather App</h1>
      <input
        type="text"
        className="search"
        placeholder="City (E.g. Mumbai)"
        value={city}
        onChange={handleChangeInput}
        onKeyDown={checkClick}
      />

      <div>
        <b className="error-message">{errorMsg}</b>
      </div>

      {weatherData !== null ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weatherData.location.name}</span>
            <sup>{weatherData.location.country}</sup>
            <h1 className="date-box">{weatherData.location.localtime}</h1>
          </h2>

          <div className="city-temp">
            {Math.round(weatherData.current.temp_c)}
            <span>&#176;</span>
          </div>
          <div className="box-more">
            <h1 className="info">{weatherData.current.condition.text}</h1>
            <img
              className="city-icon"
              src={`${weatherData.current.condition.icon}`}
            />
          </div>

          <div className="box-more">
            <div className="column-order">
              <h1 className="more-lighter-text">Ppt</h1>
              <h1 className="more-bolder-text">
                {weatherData.current.precip_mm} mm
              </h1>
            </div>
            <div className="column-order">
              <h1 className="more-lighter-text">Humidity</h1>
              <h1 className="more-bolder-text">
                {weatherData.current.humidity}%
              </h1>
            </div>
            <div className="column-order">
              <h1 className="more-lighter-text">Wind</h1>
              <h1 className="more-bolder-text">
                {weatherData.current.wind_kph} km/h
              </h1>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
