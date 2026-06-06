import React, { useState } from 'react';
import './App.css';
import WeatherCard from './WeatherCard';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY || 'YOUR_API_KEY'; // Replace with your API key from weatherapi.com

  const handleSearch = async () => {
    if (!cityInput.trim()) {
      alert('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(false);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData({
        city: data.location.name,
        country: data.location.country,
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        condition: data.current.condition.text,
        windSpeed: data.current.wind_kph
      });
      setCityInput('');
    } catch (err) {
      setError(true);
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <header>
        <h1>XWeatherApp</h1>
        <p className="subtitle">Real-time Weather Information</p>
      </header>

      <div className="search-section">
        <input
          type="text"
          id="cityInput"
          className="search-input"
          placeholder="Enter city name..."
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="City search input"
        />
        <button
          id="searchBtn"
          className="search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>

      {loading && <p className="loading-message">Loading data…</p>}

      <div id="weatherCards" className="weather-cards">
        {weatherData ? (
          <WeatherCard
            city={`${weatherData.city}, ${weatherData.country}`}
            temperature={weatherData.temperature}
            humidity={weatherData.humidity}
            condition={weatherData.condition}
            windSpeed={weatherData.windSpeed}
          />
        ) : (
          <div className="initial-message">
            <p>Search for a city to see the weather information</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
