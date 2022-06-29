import React, { useEffect, useState } from "react";
import './App.css';

export default function App() {
  const [weather, setWeather] = useState({});   
  const [location, setLocation] = useState('');
  const [imgPath, setImgPath] = useState('');
  const [btnFlag, setBtnFlag] = useState(false);
  const urlData = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=50ac4dd4f6375cc8beb99bdb3e29da0a`;
  const [flag, setFlag] = useState(false);
  const [locationBuffer, setLocationBuffer]  = useState('');

  const enterCity = event => {
    setLocation(event.target.value);
    console.log(event.target.value);
  }

  const enterPress = (event) => {
    if(event.key === 'Enter'){
      getWeather();
    }
      setFlag(true);
  }
  const searchClick = () => {
    getWeather();
    setFlag(true);
  }

  const getWeather = () => {
    console.log('Press' + location);
    fetch(urlData).then(res => res.json()).then(data => {
      setWeather(data);
      setLocationBuffer(location);
      setImgPath(`https://source.unsplash.com/500x500/?${location}`)
    })
  }

  const backPress = () => { 
    setFlag(false);
    setLocation('');
    setWeather({});
  }

  useEffect(() => {
    setBtnFlag(false);
    if(location !== '')
    {
      setBtnFlag(true);
    }

  }, [location, setBtnFlag]);

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
          type="input" 
          id="search-bar" 
          placeholder="Search a location"
          name="location"
          onChange={enterCity}
          onKeyPress={enterPress}
          value={location}
        />
        {btnFlag && <div type="button" className="search-btn" onClick={searchClick}></div>}
        
       
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
            style={{
              backgroundImage: `url(${imgPath})`
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

