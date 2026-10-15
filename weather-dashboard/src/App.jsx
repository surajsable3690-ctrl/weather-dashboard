import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// Maps OpenWeatherMap's "main" condition to a background class
function getBgClass(weatherMain) {
  switch (weatherMain) {
    case 'Clear':
      return 'bg-clear';
    case 'Clouds':
      return 'bg-clouds';
    case 'Rain':
    case 'Drizzle':
      return 'bg-rain';
    case 'Thunderstorm':
      return 'bg-thunder';
    case 'Snow':
      return 'bg-snow';
    default:
      return 'bg-default';
  }
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgClass, setBgClass] = useState('bg-default');

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        if (res.status === 404) throw new Error('City not found.');
        throw new Error('Something went wrong. Please try again.');
      }

      const data = await res.json();
      setWeatherData(data);
      setBgClass(getBgClass(data.weather[0].main));
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  // Load a default city on first render
  useEffect(() => {
    fetchWeather('Mumbai');
  }, []);

  return (
    <div className={`app ${bgClass}`}>
      {/* Decorative animated weather layer */}
      <div className="weather-fx" aria-hidden="true">
        {bgClass === 'bg-rain' &&
          Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="raindrop" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
          ))}
        {bgClass === 'bg-snow' &&
          Array.from({ length: 30 }).map((_, i) => (
            <span key={i} className="snowflake" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }}>❄</span>
          ))}
        {bgClass === 'bg-clear' && <div className="sun"></div>}
      </div>

      <div className="content">
        <h1>Weather Dashboard</h1>

        <SearchBar onSearch={fetchWeather} loading={loading} />

        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} />}
        {!loading && !error && weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default App;