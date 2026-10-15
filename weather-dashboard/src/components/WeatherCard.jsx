function WeatherCard({ data }) {
  const { name, main, weather, wind, sys } = data;
  const condition = weather[0];

  return (
    <div className="weather-card">
      <div className="weather-top">
        <div>
          <h2>{name}, {sys.country}</h2>
          <p className="condition">{condition.description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
          alt={condition.description}
          className="weather-icon"
        />
      </div>

      <div className="temp">{Math.round(main.temp)}°C</div>
      <p className="feels-like">Feels like {Math.round(main.feels_like)}°C</p>

      <div className="weather-stats">
        <div className="stat">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{main.humidity}%</span>
        </div>
        <div className="stat">
          <span className="stat-label">Wind</span>
          <span className="stat-value">{Math.round(wind.speed * 3.6)} km/h</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pressure</span>
          <span className="stat-value">{main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;