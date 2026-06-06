import React from 'react';

const WeatherCard = ({ city, temperature, humidity, condition, windSpeed }) => {
  return (
    <div className="weather-card">
      <h3>{city}</h3>
      <p>
        <span className="label">Temperature:</span>
        <span className="value"> {temperature}°C</span>
      </p>
      <p>
        <span className="label">Humidity:</span>
        <span className="value"> {humidity}%</span>
      </p>
      <p>
        <span className="label">Condition:</span>
        <span className="value"> {condition}</span>
      </p>
      <p>
        <span className="label">Wind Speed:</span>
        <span className="value"> {windSpeed} km/h</span>
      </p>
    </div>
  );
};

export default WeatherCard;
