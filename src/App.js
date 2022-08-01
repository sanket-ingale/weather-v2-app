import React, { useState } from "react";
import './App.css';

export default function App() {
  const [weather, setWeather] = useState({});   
  const [location, setLocation] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [searchBtnFlag, setSearchBtnFlag] = useState(false);
  const [backBtnFlag, setBackBtnFlag] = useState(false);
  const [locationBuffer, setLocationBuffer]  = useState('');
  const urlData = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=50ac4dd4f6375cc8beb99bdb3e29da0a`;

  const enterCity = event => {
    setLocation(event.target.value);
    setSearchBtnFlag(true);
  }

  const enterPress = (event) => event.key === 'Enter' && getWeather();
  const searchClick = () => getWeather();

  const getWeather = () => {
    console.log('Press' + location);
    fetch(urlData).then(res => res.json()).then(data => setWeather(data))
    setLocation('');
    setSearchBtnFlag(false);
    setBackBtnFlag(true);
    setLocationBuffer(location);
    setImgPath(`https://source.unsplash.com/500x500/?${location}`)
  }

  const backPress = () => { 
    setSearchBtnFlag(false);
    setBackBtnFlag(false);
    setLocation('');
    setWeather({});
  }

  const convertTime = (time) => {
    const temp = new Date(time * 1000);
    return (
      `${temp.getHours() > 9 ? temp.getHours() : ("0" + temp.getHours())} : ${temp.getMinutes() > 9 ? temp.getMinutes() : ("0" + temp.getMinutes())}`
    );
  }

  return (
    <div className="container">
      {!backBtnFlag && (
        <div className="title">
            Welcome<br/>to the<br/>Weather App
        </div>
      )}

      <div className="search-bar">
        {backBtnFlag && <div className="back-btn" onClick={backPress}></div>}
        <input 
          type="search"  
          placeholder="Search a location"
          name="location"
          onChange={enterCity}
          onKeyPress={enterPress}
          value={location}
        />
        {searchBtnFlag && <div type="button" className="search-btn" onClick={searchClick}></div>}               
      </div>

      {weather.cod === "404" && backBtnFlag && (
        <div className="error-msg">
          There is no such place named "{locationBuffer}" 
        </div>
      )} 

      {typeof weather.main !== "undefined" && 
        backBtnFlag && (
          <div 
            className="data-container" 
            id="dynamic-image"
            style={{backgroundImage: `url(${imgPath})`}}
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
                    {convertTime(weather.sys.sunrise)}
                  </p>
                </div>
                <div className="info">
                  <img className="sunset" src={require("../src/icons/sunset.png")} alt="sunset-icon"/>
                  {/* <p>Sunset</p> */}
                  <p>
                    {convertTime(weather.sys.sunset)}
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
        )
      }
    </div>
  );
}

