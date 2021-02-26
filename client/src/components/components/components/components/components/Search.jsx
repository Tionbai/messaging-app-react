import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

export default function Search({ valueString, value, setFilteredValue }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (value && search) {
      setFilteredValue(
        value.filter((v) => v.name.toLowerCase().includes(search.toLowerCase())),
      );
    } else {
      setFilteredValue(value);
    }
  }, [search, value]);
  return (
    <TextField
      label={`Search ${valueString}`}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

Search.propTypes = {
  valueString: PropTypes.string.isRequired,
  value: Object(PropTypes.array).isRequired,
  setFilteredValue: PropTypes.func.isRequired,
};
