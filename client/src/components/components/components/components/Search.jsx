import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

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
    <TextField label={`Search ${valueString}`} variant="outlined" onChange={handleSearch} />
  );
}

Search.propTypes = {
  valueString: PropTypes.string.isRequired,
  value: Object(PropTypes.array).isRequired,
  setFilteredValue: PropTypes.func.isRequired,
};
