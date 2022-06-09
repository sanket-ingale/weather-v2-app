import React, { useState } from "react";
import './App.css';

export default function App() {
  const [weather, setWeather] = useState({});   
  const [location, setLocation] = useState('');
  const urlData = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=50ac4dd4f6375cc8beb99bdb3e29da0a`;
  const [flag, setFlag] = useState(false);
  const [locationBuffer, setLocationBuffer]  = useState('');

  const enterPress = (event) => {
    if(event.key === "Enter"){
      setLocation(event.target.value)
      getWeather();
    }
  }

  const searchPress = () => {
      getWeather();
  }

  const getWeather = () => {
    setFlag(true);
    console.log(urlData);
    fetch(urlData).then(res => res.json()).then(data => {
      setWeather(data);
      setLocationBuffer(location);
      setLocation('');
    });
  }

  const backPress = () => { 
    setFlag(false);
  }

  return (
    <div className="app">
      {!flag ?(
        <div className="title">
            Welcome<br/>to the<br/>Weather App
        </div>
      ):(null)}
      <div className="search-bar">
        {!flag ? (null) : (
          <div className="back-btn" onClick={backPress}></div>
        )}
        <input 
          type="search" 
          id="search-bar" 
          placeholder="Search a location"
          onChange={event => setLocation(event.target.value)}
          value={location}
          onKeyPress={enterPress}
        />
        {location === '' ? (null) : 
        (
          <div className="search-btn" onClick={searchPress}></div>
        )}
      </div>
      {weather.cod === "404" && flag ? (
        <div className="error-msg">
          There is no such place named "{locationBuffer}" 
        </div>
      ) : (null)} 
      {typeof weather.main === "undefined" ? (null) : 
      (<>
        {!flag ? (
          <></>
        ) : (
          <div 
            className="container" 
            id="dynamic-image"
            style= {{
              backgroundImage: `url('https://source.unsplash.com/500x500/?${location}')`
            }}
          >
            <div className="block">
              <div className="left-block">
                <p>{weather.name}, {weather.sys.country}</p>
                <h1>{Math.round(weather.main.temp)}°C</h1>
                <p>Feels like {Math.round(weather.main.temp)} °C, {weather.weather[0].main}</p>
              </div>
              <div className="right-block">
                <div className="info">
                  <img className="sunrise" src={require("../src/icons/sunrise.png")} alt="sunrise-icon"/>
                  {/* <p>Sunrise</p> */}
                  <p>
                    {new Date(weather.sys.sunrise * 1000).getHours() > 9 ? (
                      new Date(weather.sys.sunrise * 1000).getHours()
                    ) : (
                      "0"+ new Date(weather.sys.sunrise * 1000).getHours()
                    )}:
                    {new Date(weather.sys.sunrise * 1000).getMinutes() > 9 ? (
                      new Date(weather.sys.sunrise * 1000).getMinutes()
                    ) : (
                      "0"+ new Date(weather.sys.sunrise * 1000).getMinutes()
                    )}
                  </p>
                </div>
                <div className="info">
                  <img className="sunset" src={require("../src/icons/sunset.png")} alt="sunset-icon"/>
                  {/* <p>Sunset</p> */}
                  <p>
                    {new Date(weather.sys.sunset * 1000).getHours() > 9 ? (
                      new Date(weather.sys.sunset * 1000).getHours()
                    ) : (
                      "0"+ new Date(weather.sys.sunset * 1000).getHours()
                    )}:
                    {new Date(weather.sys.sunset * 1000).getMinutes() > 9 ? (
                      new Date(weather.sys.sunset * 1000).getMinutes()
                    ) : (
                      "0"+ new Date(weather.sys.sunset * 1000).getMinutes()
                    )}
                  </p>
                </div>
                <div className="info">
                  <img className="humidity" src={require("../src/icons/humidity.png")} alt="humidity-icon"/>
                  {/* <p>Humidity</p> */}
                  <p>{weather.main.humidity}%</p>
                </div>
                <div className="info">
                  <img className="wind" src={require("../src/icons/wind.png")} alt="wind-icon"/>
                  {/* <p>Wind</p> */}
                  <p>{weather.wind.speed} KMPH</p>
                </div>
              </div>
            </div>
          </div>
        )}</>
      )}
    </div>
  );
}

