import React from "react";
import './weather.css'
import {styled, Typography, Grid} from "@mui/material";

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

const Weather = (props) => {

    const weather = props.weather;
    const parseDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        const date = new Date(year, month - 1, day);
        const options = {day: '2-digit', month: 'long'};
        return date.toLocaleDateString(undefined, options)
    };

    const dateToDay = (inputDate) => {
        const dateString = inputDate.split('-');

        const date = new Date(dateString);

        const daysOfWeek = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

        const dayOfWeekNumber = date.getDay();

        const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

        return dayOfWeekName;
    };

    function getCityName(cityua) {
        if (cityua === 'Київ') {
            return 'Києві';
        } else if (cityua === 'Одеса') {
            return 'Одесі';
        } else if (cityua === 'Львів') {
            return 'Львові';
        } else if (cityua === 'Харків') {
            return 'Харкові';
        } else {
            return `місті ${cityua}`;
        }
    }

    return (
        <>
            {weather &&
                <Div className="forecast_main">
                    <Div className="forecast_header">
                        <Grid container alignItems="center">
                            <Grid item>
                                <img src="/img/icon_weather.png"
                                     alt="Іконка погоди"
                                     width="100"
                                     style={{maxWidth: '50px', maxHeight: '30px'}}
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6" style={{fontWeight: 'bold'}} gutterBottom>
                                    Погода у {getCityName(props.cityua)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" className="days-label" gutterBottom>
                                    7 днів
                                </Typography>
                            </Grid>
                        </Grid>
                    </Div>
                    <Div className="forecast_wrapper">
                        <Grid container>
                            {weather.infoArray?.map((element, index) => {
                                return (
                                    <Grid className="block" item xs={11} sm={6} md={1.7} key={index}>
                                        <Div style={{
                                            background: index === 0 ? 'white' : '#9ecbb4',
                                            borderBottomRightRadius: index === 6 ? '15px' : '0px',
                                            borderTopRightRadius: index === 6 ? '15px' : '0px'
                                        }}>
                                            <Typography variant="body2"
                                                        style={{color: index === 0 ? '#417034' : 'white'}}
                                                        gutterBottom>{dateToDay(element.date)}</Typography>
                                            <Typography variant="body2" gutterBottom className="forecast_date">
                                                {parseDate(element.date)}
                                            </Typography>
                                            <Typography variant="h6" style={{color: index === 0 ? '#417034' : 'white'}}
                                                        gutterBottom>
                                                {element.day.maxtemp_c > 0 ? `+${element.day.maxtemp_c}` : element.day.maxtemp_c}
                                            </Typography>
                                            <Typography variant="h6" style={{color: index === 0 ? '#417034' : 'white'}}
                                                        gutterBottom>
                                                {element.day.mintemp_c > 0 ? `+${element.day.mintemp_c}` : element.day.mintemp_c}
                                            </Typography>
                                            <p><img src={element.day.condition.icon} alt="description"/></p>
                                        </Div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Div>
                </Div>
            }
            )}
        </>
    );
}

export default Weather;

