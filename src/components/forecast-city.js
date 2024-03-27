import React from "react";
import ApiForecastCity from "./apiForecastCity";
import "./forecast-city.css";
import {Grid, styled} from "@mui/material";

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

class ForecastCity extends React.Component {

    cities = new Map([["Lviv", "Львів"], ["Odesa", "Одеса"], ["Kharkiv", "Харків"]]);

    render() {
        return (
            <Div>
                <Grid container spacing={2} color="#0f7d40">
                    {/*{this.map?.keys()?.((element) => <ApiForecastCity city={element}/>)}*/}
                    {Array.from(this.cities)?.map(([key, value], index) =>
                        <Grid item sm={12} xs={12} md={4} key={index}><ApiForecastCity city={key} cityUa={value}/></Grid>
                    )}
                </Grid>
            </Div>
        )
    }
}

export default ForecastCity;