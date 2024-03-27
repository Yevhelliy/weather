import React, {useState} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import {styled, Typography} from "@mui/material";

const Div = styled('div')(({theme}) => ({
    ...theme.typography.button,
    padding: theme.spacing(1),
}));
const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);
    const [error, setError] = useState(null);

    const loadOptions = (city) => {
        setError(null);
        if (!city) {
            return Promise.resolve({options: []});
        }

        return (
            fetch(`https://publicapi.meest.com/geo_localities?search_beginning=${city}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Server request error");
                    }
                    return response.json();
                })
                .then((json) => {
                    if (!Array.isArray(json.result)) {
                        const errorMessage = "Введіть будь ласка місто України";
                        setError(errorMessage);
                        // console.error("Невірно введені дані");
                        return {options: []};
                    }
                    return {
                        options: json.result.map((city) => ({
                            label: `${city.data.n_ua}`,
                        })),
                    };
                })
                .catch((err) => {
                    setError(err.message);
                    console.error(err);
                })
        );
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const customNoOptionsMessage = () => {
        if (error) {
            return (
                <Typography variant="h6" style={{ color: "red", fontWeight: 'bold', textAlign: 'center' }} gutterBottom>
                    {error}
                </Typography>
            );
        } else {
            return null;
        }
    };

    return (
        <Div>
            <AsyncPaginate
                placeholder="Пошук міста"
                debounceTimeout={600}
                value={search}
                isClearable={true}
                onChange={handleOnChange}
                loadOptions={loadOptions}
                components={{
                    NoOptionsMessage: customNoOptionsMessage,
                }}
            />
        </Div>
    );
};


export default Search;