import React from "react";
import {Button, styled} from "@mui/material";

const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));

const Form = props => (
    <Div>
    <form onSubmit={props.wetherMethod}>
        <Button className="button" variant="contained" color="success" type="submit">Отримати погоду</Button>
    </form>
    </Div>
)
export default Form;