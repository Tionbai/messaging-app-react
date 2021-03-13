import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 350,
  },
  searchfield: {
    height: 75,
    display: 'flex',
    alignItems: 'center',
  },
  common: {
    textTransform: 'none',
    height: 90,
    borderBottom: '1px solid lightgrey',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    color: 'dimgrey',
  },
  icon: {
    backgroundColor: 'white',
    border: '1px solid darkgrey',
  },
  subtitle: {
    fontWeight: 'bold',
  },
  selected: { backgroundColor: '#e8f4fd' },
  first: { borderTop: '1px solid lightgrey' },
}));

export default useStyles;
