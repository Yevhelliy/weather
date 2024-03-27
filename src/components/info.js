import React from "react";
import {styled, Typography} from "@mui/material";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

const Info = props => (
    <Div>
        <Typography variant="h5" gutterBottom >Прогноз погоди</Typography>
        <Typography variant="body1" gutterBottom >Дізнатись погоду в вашому місті</Typography>
    </Div>
)
export default Info;