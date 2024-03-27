import React from "react";
import Info from "./components/info";
import Weather from "./components/weather";
import ForecastCity from "./components/forecast-city";
import Search from "./components/search";
import {API_KEY, WEATHER_API_URL} from "./api";
import {styled} from "@mui/material";
import {setCORS} from "google-translate-api-browser";


const translate = setCORS("http://cors-anywhere.herokuapp.com/");

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            city: "Kyiv",
            cityUa: "Київ",
            participleOfCity: "Києві",
            error: undefined,
        };
    }


    handleOnSearchChange = (searchData) => {
        // console.log("Я туту")
        if (searchData) {
            this.setState((lastState) => lastState.city = searchData == null ? lastState.city : searchData.label);

            this.setState({
                cityUa: this.state.city
            });
            this.doTranslate(this.state.city)
                .then(async city => {
                    const apiUrl = `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no&lang=uk`;
                    if (city) {
                        await fetch(apiUrl)
                            .then(response => response.ok ? response.json() : null)
                            .then(response => {
                                this.setState({
                                    weather: {
                                        infoArray: response.forecast.forecastday,
                                        city: response.location.name,
                                        country: response.location.country,
                                        error: response.location.error,
                                    }
                                })
                            })
                            .catch(error => {
                                console.error(error);
                                return{option:[]};
                            });
                    }
                })
        } else{
        // console.log('App error')
}}
        // getWeather = async (event) => {
        //     event.preventDefault();
        //     this.setState({
        //         cityUa : this.state.city
        //     });
        //     this.doTranslate(this.state.city)
        //         .then(async city => {
        //             const apiUrl = `${WEATHER_API_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no&lang=uk`;
        //             if (city) {
        //                 await fetch(apiUrl)
        //                     .then(response => response.ok ? response.json() : null)
        //                     .then(response => {
        //                         this.setState({
        //                             weather: {
        //                                 infoArray: response.forecast.forecastday,
        //                                 city: response.location.name,
        //                                 country: response.location.country,
        //                                 error: response.location.error,
        //                             }
        //                         })
        //                     })
        //                     .catch(error => console.error(error));
        //             }
        //         })
        //
        //
        // }

        doTranslate = (text) => {
            return translate(text, {to: 'en'})
                .then(res => res.text)
                .catch(err => {
                    console.error(err);
                    return{option: [] };
    });
        }

        render()
        {

            return (
                <Div className="wrapper">
                    <Div className="container">
                        <Div className="row">
                            <Info/>
                            <Search onSearchChange={this.handleOnSearchChange}/>
                            {/*<Form wetherMethod={this.getWeather}/>*/}
                            <Weather weather={this.state.weather} city={this.state.cityUa} cityua={this.state.city}/>
                            <ForecastCity/>
                        </Div>
                    </Div>
                </Div>
            );
        }
    }

    export
    default
    App;