import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import images from './utils';

const Search = ({books, addBookToReadingList, bookIsInReadingList}) =>{
    return(
        <Autocomplete
            id="country-select-demo"
            className="autoCompleteField"
            sx={{ width: "100%", maxWidth: "600px", mx: "auto" }} // Set a maxWidth and center it
            options={books}
            autoHighlight
            getOptionLabel={(option) => option.title + option.author}
            renderOption={(props, option) => (
            <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
            >
                <img loading="lazy" width="70" src={images[option.coverPhotoURL.split("/")[1].split(".")[0]]} alt="" />
                {option.title} ({option.author}){" "}
                <Button
                size="small"
                sx={{ml: 3, color: '#5ACCCC'}}
                onClick={() => addBookToReadingList(option)}
                disabled={bookIsInReadingList(option)}
                >
                Add +
                </Button>
            </Box>
            )}
            renderInput={(params) => (
            <TextField
                {...params}
                label="Add Books"
                sx={{ width: "100%" }}
                inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
                }}
            />
            )}
      />
    )
}

export default Search;