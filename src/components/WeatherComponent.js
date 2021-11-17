import styled from "styled-components";

export const WeatherInfoIcons = {
    sunset: "/icons/temp.svg",
    sunrise: "/icons/temp.svg",
    humidity: "/icons/humidity.svg",
    wind: "/icons/wind.svg",
    pressure: "/icons/pressure.svg",
};

export const WeatherIcons = {
    "01d": "/icons/sunny.svg",
    "01n": "/icons/night.svg",
    "02d": "/icons/day.svg",
    "02n": "/icons/cloudy-night.svg",
    "03d": "/icons/cloudy.svg",
    "03n": "/icons/cloudy.svg",
    "04d": "/icons/perfect-day.svg",
    "04n": "/icons/cloudy-night.svg",
    "09d": "/icons/rain.svg",
    "09n": "/icons/rain-night.svg",
    "10d": "/icons/rain.svg",
    "10n": "/icons/rain-night.svg",
    "11d": "/icons/storm.svg",
    "11n": "/icons/storm.svg",
  };

const WeatherCondition = styled.div`
    display:flex;
    flex-direction: row;
    align-items:center;
    width: 100%;
    justify-content: space-between;
    margin: 20px auto;
`;

const Condition = styled.span`
    display:flex;
    flex-direction: column;
    margin: 20px auto;
    font-size: 14px;
    & span{
        font-size: 28px;
    }
`;

const WeatherLogo = styled.img` 
    width: 100px;
    height: 100px;
    margin: 5px auto;
`;

const Location = styled.span`
    font-size: 22px;
    font-weight: bold;
`;

const WeatherInfoLabel = styled.span`
    font-size: 14px;
    font-weight: bold;
    margin: 20px 25px 10px;
    text-align: start;
    width: 90%;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const ForecastTitle = styled.span`
    font-size: 14px;
    text-align: left;
    margin-top: 7px;
    margin-bottom: 7px;
    font-weight: bold;
`;

const ForecastInfoContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    font-size:12px;
    color: black;
`;


const WeatherInfoComponent = (props) => {
    const { name, value } = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherInfoIcons[name]} />
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    )
}

const ForecastInfoComponent = (props) => {
    console.log(props);
    const {forecast} = props;
    const ForecastItems = styled.div`
        display: flex;
        overflow-x: scroll;
        width:100%;
        align-items:center;
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
        & forecastItemContainer {
            padding: 20px;
            border-right: 1px solid #ccc;
            margin-bottom: 0px;
            &:last-of-type {
                border-right: 0px;
            }
            & p {
                margin: 0;
            }   
        }
    `;

    const forecastItems = forecast?.map((f, i) => {
        const key = `forecast-item_${i}`;
        const url= `http://openweathermap.org/img/wn/${f.weather[0].icon}.png`;
        let ampm = 'AM';
        let hour = new Date(f.dt * 1000).getHours(); 
        if (hour > 12) {
           hour = hour-12;
           ampm = 'PM';
        }
        return(
            <forecastItemContainer key={key} >
                <p className="forecast-item_hour" >{hour} {ampm} </p>
                <p className="forecast-item_temp">{f.temp}°C</p>
                <img src={url} alt={f.weather[0].description} />
                <p className="forecast-item_descrition">{f.weather[0].main}</p>
            </forecastItemContainer>    
        )
    })
    return (
        <ForecastItems> {forecastItems} </ForecastItems>
    )
}


const WeatherComponent = (props) => {
    const { weather,forecast } = props;
    const isDay = weather?.weather[0].icon?.includes("d");
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }

    return (
        <>
            <WeatherCondition>
                <Condition>            
                    <condition1>
                        <span>{`${(weather?.main?.temp)}°C`}</span>{`  |  ${weather?.weather[0].description}`}
                    </condition1>
                    <condition2>
                        feels like<span>{` ${(weather?.main?.feels_like)}°C`}</span>
                    </condition2>
                </Condition>
                <WeatherLogo src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} />
            </WeatherCondition>
            <Location>{`${weather?.name}, ${weather?.sys?.country}`}</Location>
            <WeatherInfoLabel>WeatherInfo</WeatherInfoLabel>
            <WeatherInfoContainer>
                <WeatherInfoComponent name={isDay ? "sunset" :"sunrise"} value={getTime(weather?.sys[isDay ? "sunset" : "sunrise"])} />
                <WeatherInfoComponent name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherInfoComponent name={"wind"} value={weather?.wind?.speed}/>
                <WeatherInfoComponent name={"pressure"} value={weather?.main?.pressure}/>
            </WeatherInfoContainer>
            <ForecastTitle>Hourly forecast</ForecastTitle>
            <ForecastInfoContainer>
                <ForecastInfoComponent forecast={forecast} />
            </ForecastInfoContainer>
        </>
    );
};

export default WeatherComponent;