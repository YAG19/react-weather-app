import { React } from "react";
import "./city.css";

const City = ({ value }) => {
  // console.log(value , "City component")
  // console.log(value.wethertype)

  const date = new Date();

  let img = "http://openweathermap.org/img/wn/" + value.icon + "@2x.png";

  return (
    <div className="container animation">
      <div className="day">{date.toDateString()}</div>

      <div className="temp">{value.temperature}°C</div>

      <div className="citys">
        {value.city},{value.country}
      </div>
      <img src={img} className="weather-icon" alt={value.icon} />
      <div className="desc">{value.description}</div>
    </div>
  );
};

export default City;
