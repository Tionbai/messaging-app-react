import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, InputBase, Divider, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import Options from './Options';

// const useStyles = makeStyles(() => ({
//   root: {
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: '20px',
//     padding: '0px 10px',
//   },
// }));
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '5px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Searchfield({ valueString, value, setFilteredValue, values }) {
  const classes = useStyles();
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
    <Box component="form" className={classes.root}>
      {/* <IconButton className={classes.iconButton} aria-label="menu">
        <Menu />
      </IconButton> */}
      <InputBase
        className={classes.input}
        placeholder={`Search ${valueString}`}
        onChange={handleSearch}
        // inputProps={{ 'aria-label': `Search ${valueString}` }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <Search />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Options values={values} />
    </Box>
  );
}

Searchfield.propTypes = {
  valueString: PropTypes.string.isRequired,
  value: Object(PropTypes.array).isRequired,
  setFilteredValue: PropTypes.func.isRequired,
  values: Object(PropTypes.object).isRequired,
};
