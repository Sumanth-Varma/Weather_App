import styled from "styled-components";  
import React from "react";


const WeatherLogo = styled.img`
width: 200px;
height: 200px;
margin: 40px auto;
`;

const ChooseLabel = styled.span`
color:black;
font-size: 18px;
font-weight: bold;
margin: 10px auto;
`;

const SearchBox = styled.form`
display: flex;
flex-direction: row;
border: black solid 1px;
border-radius: 2px;
color:black;
font-size: 18px;
font-weight: bold;
margin: 20px auto;
& input {
    padding:10px;
    font-size:14px;
    border:none;
    outline: none;
    font-weight:bold;
}

& button {
    padding:10px;
    font-size:14px;
    color:white;
    background-color:black;
    border:none;
    outline: none;
    font-weight:bold;
    cursor: pointer;
}
`;

const CityComponent = (props) => {
    const { updateCity, fetchWeather } = props;
    return (
        <>

                    <WeatherLogo src="../icons/weatherLogo.png"/>
                    <ChooseLabel>Want to Know your Weather</ChooseLabel>
                    <SearchBox onSubmit={fetchWeather}>
                        <input placeholder="Type City Name" onChange={(e) => updateCity(e.target.value)} />
                        <button type="submit" >Search</button>
                    </SearchBox>
        </>
    );
};

export default CityComponent