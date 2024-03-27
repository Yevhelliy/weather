import React, {Component} from "react";
import "./apiForecastCity.css";
import {styled, Typography} from "@mui/material";

const APIKEY = "33326bd6ade345b0805133207232709";
const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: '#e5eee9',
    padding: theme.spacing(1),
    fontWeight: 'bold'
}));
const getWeather = (city) => {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=7&aqi=no&alerts=no&lang=uk`
    return fetch(apiUrl)
        .then(response => response.ok ? response.json() : null)
        .catch(err => {
            console.error(err);
            return {options: []};
        });

}

class ApiForecastCity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: props.city,
            cityUa: props.cityUa,
        };

    }

    async componentDidMount() {
        await getWeather(this.props.city)
            .then(response => {
                // console.log(response)
                this.setState({
                    weatherCity: {
                        info_array: response.forecast.forecastday,
                        city: response.location.name,
                        error: null,
                    }
                })
            });
    }

    getDataValue(data, defaultValue) {
        if (typeof data === 'undefined') {
            return defaultValue;
        }
        return data.toString();
    }

    render() {
        const feelsLike = this.getDataValue(this.state.weatherCity?.info_array[0].hour[0].feelslike_c, 'Loading...');
        const avgtemp = this.getDataValue(this.state.weatherCity?.info_array[0].day.avgtemp_c, 'Loading...');

        const isFirstCharMinusFelsLike = feelsLike[0] === '-';
        const isFirstCharMinusCityTemp = avgtemp[0] === '-';
        return (
            // <Div className="forecast_wrapper_city">
            <Div className="container_block">
                <Div className="block_city">

                    <Typography variant="h6" sx={{fontFamily: 'Inter'}} gutterBottom>{this.props.cityUa} зараз</Typography>
                    {isFirstCharMinusCityTemp ? (<Typography variant="h4" gutterBottom className="city_temperature">
                        <span>+{this.state.weatherCity?.info_array[0].day.avgtemp_c}</span>
                        <img src={this.state.weatherCity?.info_array[0].day.condition.icon} alt="description"/></Typography>
                        ) : (
                        <Typography variant="h4" sx={{fontFamily: 'Inter'}}gutterBottom className="city_temperature">
                            <span>+{this.state.weatherCity?.info_array[0].day.avgtemp_c}</span>
                            <img src={this.state.weatherCity?.info_array[0].day.condition.icon} alt="description"/></Typography>
                    )}
                    {isFirstCharMinusFelsLike ? (
                        <Typography variant="body1" sx={{fontFamily: 'Inter'}} gutterBottom  className="description">Відчувається як
                            {this.state.weatherCity?.info_array[0].hour[0].feelslike_c}'С</Typography>
                    ) : (
                        <Typography variant="body1" sx={{fontFamily: 'Inter'}} gutterBottom  className="description">Відчувається як
                            +{this.state.weatherCity?.info_array[0].hour[0].feelslike_c}'С</Typography>
                    )}
                    <Typography variant="body1" gutterBottom className="description">{this.state.weatherCity?.info_array[0].day.condition.text}</Typography>
                </Div>
            </Div>
        );
    }
}

export default ApiForecastCity;