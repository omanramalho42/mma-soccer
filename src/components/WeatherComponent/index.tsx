import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({ city, apiKey }: any) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [city, apiKey]);

  return (
    <div className="p-4 bg-gray-200 rounded">
      {weatherData ? (
        <div>
          <h2 className="text-2xl font-bold mb-2">{weatherData?.name}, {weatherData?.sys.country}</h2>
          <div className="flex items-center">
            <img
              src={`http://openweathermap.org/img/w/${weatherData?.weather[0].icon}.png`}
              alt="Weather Icon"
              className="mr-2"
            />
            <span className="text-xl">{weatherData?.weather[0].description}</span>
          </div>
          <div className="text-3xl font-bold mt-2">
            {Math.round(weatherData?.main.temp)}°C
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default WeatherComponent;
