import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import CityComponent from "./components/CityComponent";
import WeatherComponent from "./components/WeatherComponent";

const Container = styled.div`
display:flex;
flex-direction: column;
margin: auto;
align-items: center;
box-shadow: 0 3px 6px 0 #555;
padding: 20px 10px;
border-radius: 4px;
width: 350px;
background: white;
`;

const AppLabel = styled.span`
color: black;
font-size: 18px;
font-weight: bold;
`;

function App() {
  const [city, updateCity]  = useState();
  const [weather, updateWeather]  = useState();
  const [forecast, updateForecast] = useState();

  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=22c7fd0cbde9ddf54e507918dfa4b36e`,);
    updateWeather(response.data);
    const lat= response.data.coord.lat;
    const lon= response.data.coord.lon;
    const res = await Axios.get(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=22c7fd0cbde9ddf54e507918dfa4b36e`)
    updateForecast(res.data.hourly);
  };

  return (
    <Container>
          <AppLabel>Weather App</AppLabel>
          {weather ? (
            <WeatherComponent weather={weather} forecast={forecast} /> 
          ) : (
            <CityComponent updateCity={updateCity} fetchWeather={fetchWeather} />
          )}
    </Container>
  );
}

export default App;
