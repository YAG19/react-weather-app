import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import City from "./City";
import WeeklyWeather from "./WeeklyWeather";

// require('dotenv').config('../.env');

function App() {
  const ApiKey = process.env.REACT_APP_API_KEY;

  const [city, setCity] = useState("Vapi");

  const [data, setCityWeather] = useState("");

  const [weeklyData, setCityWeeklyWeather] = useState("");

  const [weekData, setWeekData] = useState("");

  let [count, setCount] = useState(0);

  const [error, setError] = useState();

  let lat;
  let lon;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${ApiKey}`;

  function changeHandler(e) {
    e.preventDefault();
    setCity(e.currentTarget.value);
    setError(false);
  }

  const fetchUrl = async (paraurl) => {
    const response = await fetch(paraurl);
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
      setError(false);
    } else {
      setError(true);
      setCityWeather("");
    }
  };

  function onClickHandler(e) {
    if (city) {
      fetchUrl(url);
      const cityName = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${ApiKey}`;
      fetchWeeklyUrl(cityName);
    } else {
      setError(true);
      setCityWeather("");
      setCityWeeklyWeather("");
      setCityWeather("")
    }
  }

  function getCordinates() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  const fetchWeeklyUrl = async (weeklyurl) => {

    let data = await fetch(weeklyurl)
      .then((res) => res.json())
      .catch((err) => console.log(err));

      console.log(data)
    

    if(data.cod !== "404"){
      let d = data.list;
      console.log(d);
      setWeekData(d);
      setCityWeeklyWeather(d[0]);
    }else{
      setCityWeeklyWeather("");
    }
  };

  function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
    fetchUrl(locationUrl);
    const weeklyUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${ApiKey}`;
    fetchWeeklyUrl(weeklyUrl);

  }

  useEffect(() => {
    getCordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickNext(e) {
    if (count < weekData?.length - 1) {
      let x = count + 1;
      setCityWeeklyWeather(weekData[x]);
      setCount(x);
    }
    console.log(count);
  }

  function onClickPrev(e) {
    if (count > 0) {
      let x = count - 1;
      setCityWeeklyWeather(weekData[x]);
      setCount(x);
    }
    console.log(count);
  }
  return (
    <div>
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

        {data && <City value={data} />}
        {!city && error && <p className="error"> Enter A City Name!</p>}
        {city && error && <p className="error"> City not found!</p>}
      </div>
      { weeklyData  && <div className="container2">
      <label>
        Weekly Weather
      </label>
      <div className="weekly">
        <button
          id="prevbtn"
          disabled={count === 0}
          onClick={(e) => {
            onClickPrev(e);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <div>{ weeklyData && <WeeklyWeather value={weeklyData} />}</div>
        <button
          id="nextbtn"
          disabled={count === weekData?.length - 1}
          onClick={(e) => {
            onClickNext(e);
          }}
        >
          <FontAwesomeIcon icon={faArrowRightLong} />
        </button>
      </div>
      </div> }
    </div>
  );
}

export default App;
