import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {  useState } from "react";
import City from "./City";


// require('dotenv').config('../.env');

function App() {

  const ApiKey = process.env.REACT_APP_API_KEY;

  const [city, setCity] = useState("");

  const [data, setCityWeather] = useState("");

  const [error, setError] = useState();
  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${ApiKey}`;

  function changeHandler(e) {
    e.preventDefault();
    setCity(e.currentTarget.value);
  }

  const fetchUrl = async () => {
    const response = await fetch(url);
    console.log(response.ok)
    if (response.ok) {
      const data = await response.json();
      const wetherinfo = {
        city: data.name,
        country: data.sys.country,
        wethertype: data.weather[0].main,
        description: data.weather[0].description,
        temperature: parseInt(data.main.temp - 273),
        temp_feelsLike: parseInt(data.main.feels_like - 273),
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        max_temp: parseInt(data.main.temp_max - 273),
        min_temp: parseInt(data.main.temp_min - 273),
        icon: data.weather[0].icon,
      };
      setCityWeather(wetherinfo);
      setError(false)
    } else {
      
      setError(true)
      setCityWeather("")
    }
  };

  function onClickHandler(e) {
    fetchUrl();
    
  }
  

  return (
    <div className="App">



      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Enter City"
          onChange={(e) => {
            changeHandler(e);
          }}
        />
        <button
          type="submit"
          className="searchButton"
          onClick={(e) => {
            onClickHandler(e);
          }}
        >
          <i>
            <FontAwesomeIcon icon={faSearch} />
          </i>
        </button>
      </div>

      { data && <City value = {data}  /> } 
       { error && <p className="error"> Not found!</p>}
    </div>
  );
}

export default App;
