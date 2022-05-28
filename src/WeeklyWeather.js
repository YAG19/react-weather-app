import { React } from "react";
import "./weekly.css";

const WeeklyWeather = ({ value }) => {

  // const date = new Date();
  
  let img = "http://openweathermap.org/img/wn/" + value.weather[0].icon + "@2x.png";

  return (
    <div className="weeklyweather">
    <div>
      Date & Time : {value.dt_txt}
    </div>
      <div className="temp">{value.main.temp}°C</div>
    <img src={img} className="weather-icon" alt={value.weather[0].icon} />
    </div>
  );
};

export default WeeklyWeather;
